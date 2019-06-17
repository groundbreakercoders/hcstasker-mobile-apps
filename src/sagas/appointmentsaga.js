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
    const getUser = state => state.user.userType;
    let userType = yield select(getUser);
    const getId = state => state.user.id;
    const userId = yield select(getId);
    let dateCreated;
    let status;
    if(appointment.uniqueId)  {
      uniqueId = appointment.uniqueId;
      dateCreated = appointment.dateCreated;
      status = appointment.status;
    } else {
      var newAppointmentRef = firebase
                     .firestore()
                     .collection("appointments").doc();
      uniqueId=newAppointmentRef.id;
      status = 'Registered';
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
            status:status,
            gender: appointment.gender,
            userId: userId,
            userLocation:appointment.userLocation,
            phoneno:appointment.phoneno,
            relationship:appointment.relationship,
            medicalCondition:appointment.medicalCondition,
            otherInstructions:appointment.otherInstructions,
            dateCreated: dateCreated
          },
          {
            merge: true
          }
        )
        .catch(error => console.log("Catch", error))
    );

    AppointmentActions.getAppointments(userId,userType);

      //
      // const appointments = [];
      // var query =   firebase
      //               .firestore()
      //               .collection("appointments");
      // if(userType === 'user') {
      //   query=query.where("status", "!=", 'Completed')
      //              .where("userId", "==", userId);
      //  } else if(userType === 'supervisor') {
      //    query=query.where("status", "==", 'Evaluation In Progress')
      //               .where("supervisorId", "==", userId);
      //  }
      // yield call(() =>
      //     query
      //     .get()
      //     .then(data => {
      //       data.docs.forEach(item => {
      //         appointments.push(item.data());
      //         });
      //     })
      //     .catch(error => console.log('Catch', error))
      // );
      //
      // yield put(AppointmentActions.setAppointments(appointments));
    Alert.alert("Appointment Updated Successfully");
    Actions.homepage();

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
