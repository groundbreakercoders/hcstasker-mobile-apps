import { call, put, fork, takeLatest, select } from 'redux-saga/effects';
import RNGooglePlaces from 'react-native-google-places';
import { Alert } from 'react-native';
import Permissions from 'react-native-permissions';
import firebase from 'react-native-firebase';
import { Actions, ActionConst } from 'react-native-router-flux';
import AppointmentActions, { AppointmentTypes }  from '../Redux/appointmentstore';

import { getDirections } from '../utils/userutils';

function* getAppointments({ userid, usertype }) {
  try {
    const appointments = [];
    yield call(() =>
      firebase
        .firestore()
        .collection("appointments")
        .where("userId", "==", userid)
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


function* getAppointmentsListener() {
	yield takeLatest(AppointmentTypes.GET_APPOINTMENTS, getAppointments);
}

export default function* userSagas() {
  yield fork(getAppointmentsListener);
}
