import { call, put, fork, takeLatest, select } from 'redux-saga/effects';
import RNGooglePlaces from 'react-native-google-places';
import { Alert } from 'react-native';
import Permissions from 'react-native-permissions';
import firebase from 'react-native-firebase';
import { Actions, ActionConst } from 'react-native-router-flux';
import AppointmentActions, { AppointmentTypes }  from '../Redux/appointmentstore';
import moment from "moment";

import { getDirections } from '../utils/userutils';

function* getAppointments({ userid, usertype }) {
  try {
    const appointments = [];
    var query =   firebase
                  .firestore()
                  .collection("appointments");
    if(usertype === 'user') {
      query=query.where("status", "!=", 'Completed')
                 .where("userId", "==", userid);
     } else if(usertype === 'supervisor') {
       query=query.where("status", "==", 'Evaluation In Progress')
                  .where("supervisorId", "==", userid);
     }
    yield call(() =>
        query
        .get()
        .then(data => {
          data.docs.forEach(item => {
            appointments.push(item.data());
            });
        })
        .catch(error => console.log('Catch', error))
    );

    yield put(AppointmentActions.setAppointments(appointments));
  } catch (error) {
    console.log('ERR', error);
  }
}

function* saveAppointment({appointment}) {
  try {
    let uniqueId;
    let dateCreated;
    if(appointment.uniqueId)  {
      uniqueId = appointment.uniqueId;
      dateCreated = appointment.dateCreated;
    } else {
      var newAppointmentRef = firebase
                     .firestore()
                     .collection("appointments").doc();
      uniqueId=newAppointmentRef.id;
      dateCreated = moment(new Date()).format("MMM DD YYYY");
    }
  // newAppointmentRef.set({uniqueId:newAppointmentRef.id,patientName:"testAutoIDPN",serviceCategory:"testAutoIDSC",sponsorName:"testAutoIDSN",status:"testAutoIDS",userId:"testAutoIDUD@gmail.com"});


    yield call(() =>
      firebase
        .firestore()
        .collection("appointments")
        .doc(uniqueId)
        .set(
          {
            uniqueId:uniqueId,
            patientName:appointment.patientName,
            sponsorName:appointment.sponsorName,
            status:appointment.status,
            userid:appointment.userId,
            dateCreated: dateCreated
          },
          {
            merge: true
          }
        )
        .catch(error => console.log("Catch", error))
    );



    Alert.alert("Appointment Updated Successfully");
    NavigationActions.user();

  } catch (error) {
        console.log("ERROR", error);
  }
}


function* saveAppointmentListener() {
	yield takeLatest(AppointmentTypes.SAVE_APPOINTMENT, saveAppointment);
}

function* getAppointmentsListener() {
	yield takeLatest(AppointmentTypes.GET_APPOINTMENTS, getAppointments);
}

export default function* userSagas() {
  yield fork(getAppointmentsListener);
  yield fork(saveAppointmentListener);
}
