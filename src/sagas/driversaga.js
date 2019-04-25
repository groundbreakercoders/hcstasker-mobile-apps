import { call, put, select, fork, takeLatest } from "redux-saga/effects";
import Permissions from "react-native-permissions";
import RNGooglePlaces from "react-native-google-places";
import { startSubmit, stopSubmit } from "redux-form";
import RNFetchBlob from "react-native-fetch-blob";
import firebase from "react-native-firebase";
import DriverActions, { TaskerTypes } from "../Redux/driverstore";
import UserActions from "../Redux/userstore";

const firebaseStorageRef = firebase.storage().ref();

const { Blob } = RNFetchBlob.polyfill;
const request = window.XMLHttpRequest;

function* changeStatus({ isOnline }) {
  try {
    yield put(DriverActions.taskerChangedOnlineStatus(isOnline));
    const getid = state => state.user.id;
    const uniqueId = yield select(getid);
    yield call(() =>
      firebase
        .firestore()
        .collection("users")
        .doc(uniqueId)
        .set(
          {
            online: isOnline
          },
          {
            merge: true
          }
        )
    );
    if (isOnline) yield put(DriverActions.setCurrentLatLng());
  } catch (error) {
    console.log("ERR", error);
  }
}

function* setCurrentLatLng() {
  try {
    const response = yield call(Permissions.check, "location");
    if (response === "authorized") {
      yield put(DriverActions.updateCurrentLatLng());
    } else {
      yield call(Permissions.request, "location");
      yield put(DriverActions.updateCurrentLatLng());
    }
  } catch (error) {
    console.log("ERR", error);
  }
}

function* updateCurrentLatLng() {
  try {
    const results = yield call(RNGooglePlaces.getCurrentPlace);
    const { latitude, longitude } = results[0];

    yield put(
      DriverActions.foundTaskerCurrentLocation({
        latitude,
        longitude
      })
    );
  } catch (error) {
    console.log("ERR", error);
  }
}

function* getTripHistoryList() {
  try {
    yield put(startSubmit("list"));
    const getid = state => state.user.id;
    const uniqueId = yield select(getid);

    const list = [];
    yield call(() =>
      firebase
        .firestore()
        .collection("users")
        .doc(uniqueId)
        .collection("trips")
        .get()
        .then(data => data.forEach(doc => list.push(doc.data())))
        .catch(error => console.log("Catch", error))
    );

    yield put(DriverActions.setTripHistoryList(list));
    yield put(stopSubmit("list"));
  } catch (error) {
    yield put(stopSubmit("list"));
    console.log("ERR", error);
  }
}

function* getPaymentHistoryList() {
  try {
    yield put(startSubmit("list"));
    const getid = state => state.user.id;
    const uniqueId = yield select(getid);

    const list = [];
    yield call(() =>
      firebase
        .firestore()
        .collection("users")
        .doc(uniqueId)
        .collection("paymentHistory")
        .get()
        .then(data => data.forEach(doc => list.push(doc.data())))
        .catch(error => console.log("Catch", error))
    );

    yield put(DriverActions.setPaymentHistoryList(list));
    yield put(stopSubmit("list"));
  } catch (error) {
    yield put(stopSubmit("list"));
    console.log("ERR", error);
  }
}

function fetchBlob(filePath) {
  return Blob.build(filePath, { type: "image/png;" });
}

function* updateVehicle(action) {
  try {
    yield put(startSubmit("updateVehicle"));
    const getid = state => state.user.id;
    const uniqueId = yield select(getid);
    window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
    const filePath = yield call(() => RNFetchBlob.wrap(action.vehicle.photo));
    const blobfile = yield call(() => fetchBlob(filePath));
    const userImageRef = firebaseStorageRef.child(
      `images/${uniqueId}-vehicle.jpg`
    );
    const snapshot = yield call(() => userImageRef.put(blobfile));
    window.XMLHttpRequest = request;

    const vehicle = { ...action.vehicle, photo: snapshot.downloadURL };
    yield call(() =>
      firebase
        .firestore()
        .collection("users")
        .doc(uniqueId)
        .set(
          {
            vehicle
          },
          { merge: true }
        )
        .catch(error => console.log("Catch", error))
    );
    yield put(DriverActions.setUpdateVehicle(vehicle));
    yield put(stopSubmit("updateVehicle"));
  } catch (error) {
    yield put(stopSubmit("updateVehicle"));
    console.log("ERR", error);
  }
}

function* updatePhoto(action) {
  try {
    window.Blob = Blob;
    yield put(startSubmit("taskerDetails"));
    const getid = state => state.user.id;
    const uniqueId = yield select(getid);
    window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
    const filePath = yield call(() => RNFetchBlob.wrap(action.photo));
    const blobfile = yield call(() => fetchBlob(filePath));
    const userImageRef = firebaseStorageRef.child(`images/${uniqueId}.jpg`);
    const snapshot = yield call(() => userImageRef.put(blobfile));
    window.XMLHttpRequest = request;

    yield call(() =>
      firebase
        .firestore()
        .collection("users")
        .doc(uniqueId)
        .set(
          {
            profilePhoto: snapshot.downloadURL
          },
          { merge: true }
        )
        .catch(error => console.log("Catch", error))
    );

    yield put(UserActions.setUpdatedPhoto(snapshot.downloadURL));
    yield put(stopSubmit("taskerDetails"));
  } catch (error) {
    yield put(stopSubmit("taskerDetails"));
    console.log("ERR", error);
  }
}

function* changeStatusListener() {
  yield takeLatest(TaskerTypes.CHANGE_STATUS, changeStatus);
}
function* setCurrentLatLngListener() {
  yield takeLatest(TaskerTypes.SET_CURRENT_LAT_LNG, setCurrentLatLng);
}
function* updateCurrentLatLngListener() {
  yield takeLatest(TaskerTypes.UPDATE_CURRENT_LAT_LNG, updateCurrentLatLng);
}

function* getTripHistoryListListener() {
  yield takeLatest(TaskerTypes.GET_TRIP_HISTORY_LIST, getTripHistoryList);
}

function* getPaymentHistoryListListener() {
  yield takeLatest(TaskerTypes.GET_PAYMENT_HISTORY_LIST, getPaymentHistoryList);
}

function* updateVehicleListListener() {
  yield takeLatest(TaskerTypes.UPDATE_VEHICLE, updateVehicle);
}

function* updatePhotoListener() {
  yield takeLatest(TaskerTypes.UPDATE_PHOTO, updatePhoto);
}

export default function* userSagas() {
  yield fork(changeStatusListener);
  yield fork(setCurrentLatLngListener);
  yield fork(updateCurrentLatLngListener);
  yield fork(getTripHistoryListListener);
  yield fork(getPaymentHistoryListListener);
  yield fork(updateVehicleListListener);
  yield fork(updatePhotoListener);
}
