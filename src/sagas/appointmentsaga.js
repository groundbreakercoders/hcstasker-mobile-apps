import { call, put, fork, takeLatest, select } from 'redux-saga/effects';
import { Alert } from 'react-native';
import Permissions from 'react-native-permissions';
import firebase from 'react-native-firebase';
import { Actions, ActionConst } from 'react-native-router-flux';
import AppointmentActions, { AppointmentTypes }  from '../Redux/appointmentstore';
import moment from "moment";

import { getDirections } from '../utils/userutils';

function* getAppointments(filter) {
  try {
    const appointments = [];
    var query =   firebase
                  .firestore()
                  .collection("appointments");
    if(filter.usertype === 'user') {
      query=query.where("userId", "==", filter.userid);
    } else if(filter.usertype === 'tasker') {
       query=query.where("supervisorId", "==", filter.userid);
       query= query.where("status","==","Under Review");
     }

    yield call(() =>
          query
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              const data = doc.data();
              appointments.push(data);
            });
          }).catch(error => {
              console.log("Catch", error);

            })
    );

    yield put(AppointmentActions.setAppointments(appointments));
  } catch (error) {
    console.log('ERR', error);
  }
}

function* getUserstype(filter) {
  try {
    const availUsers = [];
    var query =   firebase
                  .firestore()
                  .collection("users");
    
      query=query.where("userType", "==", filter.usertype).where("status","==","Available");
    
    yield call(() =>
          query
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              const data = doc.data();
              availUsers.push(data);
            });
          }).catch(error => {
              console.log("Catch", error);

            })
    );

    yield put(AppointmentActions.setUserstype(availUsers));
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
      if (userType == 'tasker'){
        appointment.supervisorId = userId;
      } else {
        appointment.userId = userId;
      }
      uniqueId = appointment.uniqueId;
      dateCreated = appointment.dateCreated;
      if (userType == 'tasker' && appointment.supervisorComments != undefined){
        status = 'Review Completed'
      } else{
        status = appointment.status;
      }
    } else {
      appointment.userId = userId;
      var newAppointmentRef = firebase
                     .firestore()
                     .collection("appointments").doc();
      uniqueId=newAppointmentRef.id;
      status = 'Service Requested';
      dateCreated = moment(new Date()).format("MMM DD YYYY");
    }

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
            caretakerAssigned : appointment.caretakerAssigned,
            status:status,
            gender: appointment.gender,
            userId: appointment.userId,
            userLocation:appointment.userLocation,
            phoneno:appointment.phoneno,
            relationship:appointment.relationship,
            serviceType:appointment.serviceType,
            serviceHours:appointment.serviceHours,
            medicalCondition:appointment.medicalCondition,
            otherInstructions:appointment.otherInstructions,
            dob:appointment.dob,
            dateCreated: dateCreated,
            supervisorId: appointment.supervisorId,
            supervisorComments:appointment.supervisorComments
          },
          {
            merge: true
          }
        )
        .catch(error => console.log("Catch", error))
    );
   

    if(status == 'Contract Signed' && appointment.caretakerAssigned ==  null) {
      yield put(AppointmentActions.setAppointment(appointment));
      Actions.nurseList();
    } else {
      yield put(AppointmentActions.getAppointments(userId,userType));
      Actions.homepage();
    }
    

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

function* getUserstypeListener() {
	yield takeLatest(AppointmentTypes.GET_USERSTYPE, getUserstype);
}

function* setUserstypeListener() {
	yield takeLatest(AppointmentTypes.SET_USERSTYPE, setUserstype);
}

export default function* userSagas() {
  yield fork(getAppointmentsListener);
  yield fork(saveAppointmentListener);
  yield fork(getUserstypeListener);

}
