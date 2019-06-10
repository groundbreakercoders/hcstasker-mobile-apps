import { call, put, fork, takeLatest, select } from 'redux-saga/effects';
import RNGooglePlaces from 'react-native-google-places';
import { Alert } from 'react-native';
import Permissions from 'react-native-permissions';
import firebase from 'react-native-firebase';
import { Actions, ActionConst } from 'react-native-router-flux';
import TripActions, { TripTypes } from '../Redux/tripstore';
import DriverActions from '../Redux/driverstore';
import UserActions from '../Redux/userstore';
import PaymentActions from '../Redux/paymentmethodsstore';
import { getDirections } from '../utils/userutils';

function* setCurrentAddress() {
	try {
		const response = Permissions.check('location');
		if (response === 'authorized') {
			yield put(TripActions.updateCurrentLocation());
		} else {
			Permissions.request('location');
			yield put(TripActions.updateCurrentLocation());
		}
	} catch (error) {
		console.log('ERR', error);
	}
}

function* updateCurrentLocation() {
	try {
		const getTripOrigin = state => state.trip.origin;
		const tripOrigin = yield select(getTripOrigin);
		// console.log(tripOrigin,"TripOrigin")
		const getid = state => state.user.id;
		const uniqueId = yield select(getid);
		// console.log(uniqueId,"UniqueId")

		const results = yield call(RNGooglePlaces.getCurrentPlace);
		const { latitude, longitude, address, placeID, name } = results[0];
		if (tripOrigin == null || tripOrigin.placeID !== placeID) {
			yield call(() =>
				firebase
					.firestore()
					.collection('users')
					.doc(uniqueId)
					.set(
						{
							currentLocation: {
								latitude,
								longitude,
								address,
								placeID,
								name,
							},
						},
						{ merge: true }
					)
			);
			yield put(
				TripActions.selectedTripLocation({
					key: 'origin',
					data: {
						latitude,
						longitude,
						address,
						placeID,
						name,
					},
				})
			);
		}
	} catch (error) {
		console.log('ERROR', error);
	}
}

function* openTripLocationSearch({ key }) {
	try {
		const getid = state => state.user.id;
		const uniqueId = yield select(getid);
		const getTrip = state => state.trip;
		const trip = yield select(getTrip);
		const { origin } = trip;

		const searchRadius = origin && {
			latitude: origin.latitude,
			longitude: origin.longitude,
			radius: 10,
		};

		const place = yield call(
			() =>
				new Promise(resolve => {
					const result = RNGooglePlaces.openAutocompleteModal(searchRadius);
					resolve(result);
				})
		);

		const { latitude, longitude, address, placeID, name } = place;
		yield put(
			TripActions.selectedTripLocation({
				key,
				data: {
					latitude,
					longitude,
					address,
					placeID,
					name,
				},
			})
		);

		yield call(() =>
			firebase
				.firestore()
				.collection('users')
				.doc(uniqueId)
				.set(
					{
						currentLocation: {
							latitude,
							longitude,
							address,
							placeID,
							name,
						},
					},
					{ merge: true }
				)
		);

		yield put(TripActions.updateDirections());
	} catch (error) {
		console.log('ERR', error);
	}
}

function getDocumentNearBy(latitude, longitude, distance, uniqueId) {
	return new Promise((resolve, reject) => {
		const selectedTasker = '';
		// ~1 mile of lat and lon in degrees
		const lat = 0.0144927536231884 * 25;
		const lon = 0.0181818181818182 * 25;

		const lowerLat = latitude - lat * distance;
		const lowerLon = longitude - lon * distance;

		const greaterLat = latitude + lat * distance;
		const greaterLon = longitude + lon * distance;

		const lesserGeopoint = new firebase.firestore.GeoPoint(lowerLat, lowerLon);
		const greaterGeopoint = new firebase.firestore.GeoPoint(greaterLat, greaterLon);
		const query = firebase
			.firestore()
			.collection('users')
			.where('userType', '==', 'tasker')
			.where('location', '>=', lesserGeopoint)
			.where('location', '<=', greaterGeopoint);

		query
			.get()
			.then(data => {
				data.forEach(item => {
					const tasker = item.data();
					if (tasker.uniqueId !== uniqueId) {
						if (!tasker.onTrip && tasker.online) {
							selectedtasker = tasker;
							resolve(selectedtasker);
						}
					}
				});
				resolve([]);
			})
			.catch(err => reject(err));
	});
}

function* cancelTrip() {
	try {
		yield put(TripActions.cancelTrip());
		const getTripOrigin = state => state.trip.origin;
		const tripOrigin = yield select(getTripOrigin);

		if (tripOrigin === null) yield put(TripActions.updateCurrentLocation());
	} catch (err) {
		console.log('ERR', err);
	}
}

function* updateDirections() {
	try {
		const getTrip = state => state.trip;
		const trip = yield select(getTrip);

		const { origin, destination } = trip;
		if (origin && destination) {
			const directions = yield call(
				() =>
					new Promise((resolve, reject) => {
						const result = getDirections(origin, destination);
						result.then(data => {
							if (data.error) {
								reject(new Error('out of reach'));
							} else {
								resolve(result);
							}
						});
					})
			);

			yield put(
				TripActions.calculateTripDirections({
					directions: directions.coordinates,
					distance: directions.distance,
				})
			);
		}
	} catch (error) {
		if (error.message === 'out of reach') {
			yield put(TripActions.outOfReach(true));
		}
		console.log('ERR msg', error.message);
	}
}

function* cancelBooking() {
	try {
		yield put(UserActions.setUserPageStatus('home'));
		const getTripOrigin = state => state.trip.origin;
		const tripOrigin = yield select(getTripOrigin);
		const getid = state => state.user.id;
		const uniqueId = yield select(getid);
		const taskerId = state => state.user.taskerDetails.taskerData.email;
		const tasker = yield select(taskerId);

		const userTaskerRef = firebase
			.firestore()
			.collection('users')
			.doc(uniqueId)
			.collection('taskerDetails')
			.doc('tasker');

		const useruserRef = firebase
			.firestore()
			.collection('users')
			.doc(tasker)
			.collection('userDetails')
			.doc('user');

		yield call(() =>
			useruserRef.set(
				{
					status: 'cancelled',
				},
				{ merge: true }
			)
		);

		yield call(() =>
			userTaskerRef.set(
				{
					status: 'cancelled',
				},
				{
					merge: true,
				}
			)
		);

		if (tripOrigin === null) yield put(TripActions.updateCurrentLocation());
	} catch (err) {
		console.log('ERR', err);
	}
}

function* taskerCancelBooking() {
	try {
		yield put(UserActions.tripStatusSet('cancelled'));
		const getTripOrigin = state => state.trip.origin;
		const tripOrigin = yield select(getTripOrigin);
		const getid = state => state.user.id;
		const uniqueId = yield select(getid);
		const userId = state => state.user.userDetails.userData.email;
		const user = yield select(userId);

		const userTaskerRef = firebase
			.firestore()
			.collection('users')
			.doc(uniqueId)
			.collection('userDetails')
			.doc('user');

		const useruserRef = firebase
			.firestore()
			.collection('users')
			.doc(user)
			.collection('taskerDetails')
			.doc('tasker');

		yield call(() =>
			useruserRef.set(
				{
					status: 'cancelled',
				},
				{ merge: true }
			)
		);

		yield call(() =>
			userTaskerRef.set(
				{
					status: 'cancelled',
				},
				{ merge: true }
			)
		);

		if (tripOrigin === null) yield put(TripActions.updateCurrentLocation());
	} catch (err) {
		console.log('ERR', err);
	}
}

function* rejectBooking() {
	try {
		yield put(UserActions.showAcceptModal(false));
		const getTripOrigin = state => state.trip.origin;
		const tripOrigin = yield select(getTripOrigin);
		const getid = state => state.user.id;
		const uniqueId = yield select(getid);
		const userId = state => state.user.userDetails.userData.email;
		const user = yield select(userId);

		const userTaskerRef = firebase
			.firestore()
			.collection('users')
			.doc(user)
			.collection('taskerDetails')
			.doc('tasker');

		const useruserRef = firebase
			.firestore()
			.collection('users')
			.doc(uniqueId)
			.collection('userDetails')
			.doc('user');

		yield call(() =>
			useruserRef.set(
				{
					status: 'rejected',
				},
				{
					merge: true,
				}
			)
		);

		yield call(() =>
			userTaskerRef.set(
				{
					status: 'rejected',
				},
				{
					merge: true,
				}
			)
		);

		yield put(UserActions.tripStatusSet('rejected'));
	} catch (err) {
		console.log('ERR', err);
	}
}

function* setStatuses() {
	try {
		yield put(UserActions.showAcceptModal(false));
		const getid = state => state.user.id;
		const uniqueId = yield select(getid);

		const useruserRef = firebase
			.firestore()
			.collection('users')
			.doc(uniqueId)
			.collection('userDetails')
			.doc('user');

		yield call(() =>
			useruserRef.set(
				{
					status: 'rejected',
				},
				{
					merge: true,
				}
			)
		);

		yield put(UserActions.tripStatusSet('rejected'));
	} catch (err) {
		console.log('ERR', err);
	}
}

function* getTripStatus() {
	try {
		const geStatus = state => state.user.tripStatus;
		const status = yield select(geStatus);
		return status;
	} catch (e) {
		console.log(e);
	}
}

function* requestTrip() {
	try {
		yield put(TripActions.spinnerState(true));
		const getid = state => state.user.id;
		const uniqueId = yield select(getid);
		const getuser = state => state.user;
		const userDetails = yield select(getuser);
		const taskers = state => state.user.allTasker;
		const allTaskers = yield select(taskers);
		const loc = state => state.trip.origin;
		const location = yield select(loc);
		const requestTasker = firebase.functions().httpsCallable('requestTasker');

		yield call(() =>
			requestTasker({
				allTaskers,
				location,
				user: {
					email: userDetails.email,
					name: userDetails.name,
					profileUrl: userDetails.profileurl,
					fcmToken: userDetails.fcmtoken,
					phone:userDetails.phone,
				},
			})
				.then(res => {
					if (res.data.success === false) {
						Alert.alert(res.data.message);
					}

				})
				.catch(err => {
					console.log(err, 'Error--->here');
				})
		);
		yield put(TripActions.spinnerState(false));
	} catch (error) {
		yield put(TripActions.spinnerState(false));
		console.log('ERR', error);
	}
}
function* requestTasker(tasker, taskDate, taskTime) {
	try {
		yield put(TripActions.spinnerState(true));
		const getid = state => state.user.id;
		const uniqueId = yield select(getid);
		const geName = state => state.user.name;
		const Name = yield select(geName);
		const getType = state => state.user.userType;
		const userType = yield select(getType);
		const getPayMode = state => state.paymentMethods.paymentMode;
		const payMode = yield select(getPayMode);
		const getCard = payMode === 'cash' ? state => state.paymentMethods.index : null;
		const card = getCard === null ? null : yield select(getCard);
		const getOrigin = state => state.trip.origin;
		const origin = yield select(getOrigin);

		yield call(() =>
			firebase
				.firestore()
				.collection('users')
				.doc(uniqueId)
				.collection('trips')
				.doc()
				.set(
					{
						taskerId: tasker.tasker.uniqueId,
						Name: tasker.tasker.name,
						taskerCertification: tasker.tasker.certification,
						paymentMode: payMode,
						cardDetails: card,
						bookingStatus: 'pending',
						taskPrice: tasker.tasker.fee,
						taskDate: tasker.taskDate,
						taskTime: tasker.taskTime,
						origin: { latitude: origin.latitude, longitude: origin.longitude },
						taskerLoc: tasker.tasker.location,
						userType,
					},
					{ merge: true }
				)
		);
		yield call(() =>
			firebase
				.firestore()
				.collection('users')
				.doc(tasker.tasker.uniqueId)
				.collection('trips')
				.doc()
				.set(
					{
						userIdId: uniqueId,
						paymentMode: payMode,
						Name,
						cardDetails: card,
						bookingStatus: 'pending',
						taskPrice: tasker.tasker.fee,
						taskDate: tasker.taskDate,
						taskTime: tasker.taskTime,
						origin: { latitude: origin.latitude, longitude: origin.longitude },
						taskerLoc: tasker.tasker.location,
						userType: 'tasker',
					},
					{ merge: true }
				)
		);
		Actions.popTo('homepage');
		yield put(TripActions.spinnerState(false));
		Actions.user({ type: ActionConst.RESET });
		yield put(UserActions.setUserPageStatus('home'));
	} catch (error) {
		yield put(TripActions.spinnerState(false));
		console.log('ERR', error);
	}
}

function* getTripHistory({ status, i }) {
	try {
		if (i !== null) {
			yield put(TripActions.changeTabIndex(i));
		}
		yield put(TripActions.spinnerState(true));
		const getid = state => state.user.id;
		const uniqueId = yield select(getid);
		const getType = state => state.user.userType;
		const type = yield select(getType);
		const trips = [];
		yield call(() =>
			firebase
				.firestore()
				.collection('users')
				.doc(uniqueId)
				.collection('tasks')
				.where('taskDetails.status', '==', status)
				.where('userType', '==', type)
				.get()
				.then(data => {
					data.docs.forEach(item => {
						trips.push(item.data());
					});
				})
				.catch(error => console.log('Catch', error))
		);

		yield put(TripActions.setTripHistory(trips));
		yield put(TripActions.spinnerState(false));
	} catch (error) {
		yield put(TripActions.spinnerState(false));
		console.log('ERR', error);
	}
}

function* acceptTrip() {
	try {
		yield put(UserActions.setUserPageStatus('startTask'));
		yield put(DriverActions.changeStatus(false));
		yield put(UserActions.showAcceptModal(false));
		const getid = state => state.user.id;
		const uniqueId = yield select(getid);
		const user = state => state.user.userDetails.userData.email;
		const userId = yield select(user);
		const getfcmtoken = state => state.user.userDetails.userData.fcmToken;
		const getStates = state => state;
		const userDetail = yield select(getStates);
		const token = yield select(getfcmtoken);
		let taskername;

		const useruserRef = firebase
			.firestore()
			.collection('users')
			.doc(userId)
			.collection('taskerDetails')
			.doc('tasker');

		const usertaskerRef = firebase
			.firestore()
			.collection('users')
			.doc(uniqueId)
			.collection('userDetails')
			.doc('user');


		yield call(() =>
			useruserRef.set(
				{
					status: 'accepted',
					taskDetails: { onTrip: false },
				},
				{ merge: true }
			)
		);

		yield call(() =>
			useruserRef.get().then(data => {
				taskername = data.data().name;
			})
		);

		yield call(() =>
			usertaskerRef.set(
				{
					status: 'accepted',
					taskDetails: {
						onTrip: false,
					},
				},
				{ merge: true }
			)
		);

		yield put(
			UserActions.sendNotification(
				token,
				'Booking Confirmed',
				'Your Tasker will be arriving soon'
			)
		);
	} catch (error) {
		yield put(UserActions.setUserPageStatus('home'));
		yield put(DriverActions.changeStatus(true));
		yield put(UserActions.showAcceptModal(false));
	}
}

function* startTrip() {
	try {
		yield put(UserActions.tripStatusSet('onTrip'));
		const getid = state => state.user.id;
		const uniqueId = yield select(getid);
		const details = state => state.user.userDetails.userData.email;
		const userId = yield select(details);

		const useruserRef = firebase
			.firestore()
			.collection('users')
			.doc(userId)
			.collection('taskerDetails')
			.doc('tasker');

		const usertaskerRef = firebase
			.firestore()
			.collection('users')
			.doc(uniqueId)
			.collection('userDetails')
			.doc('user');

		yield call(() =>
			useruserRef.set(
				{
					status: 'OnTrip',
					taskDetails: { onTrip: true },
				},
				{ merge: true }
			)
		);

		yield call(() =>
			usertaskerRef.set(
				{
					status: 'OnTrip',
					taskDetails: { onTrip: true },
				},
				{ merge: true }
			)
		);
	} catch (error) {
		console.log('ERR', error);
	}
}

function* startTask() {
	try {
		yield put(TripActions.spinnerState(true));
		const getid = state => state.user.id;
		const uniqueId = yield select(getid);
		const details = state => state.user.userDetails.userData.email;
		const userId = yield select(details);

		const useruserRef = firebase
			.firestore()
			.collection('users')
			.doc(userId)
			.collection('taskerDetails')
			.doc('tasker');

		const usertaskerRef = firebase
			.firestore()
			.collection('users')
			.doc(uniqueId)
			.collection('userDetails')
			.doc('user');

		yield call(() =>
			useruserRef.set(
				{
					status: 'inprogress',
					taskDetails: {
						taskStartTime: Date(Date.now()),
					},
				},
				{ merge: true }
			)
		);

		yield call(() =>
			usertaskerRef.set(
				{
					status: 'inprogress',
					taskDetails: {
						taskStartTime: Date(Date.now()),
					},
				},
				{ merge: true }
			)
		);

		yield put(TripActions.spinnerState(false));
	} catch (error) {
		yield put(TripActions.spinnerState(false));
		console.log('ERR', error);
	}
}

function* finalRating(value) {
	try {
		const getid = state => state.user.id;
		const uniqueId = yield select(getid);

		const usertaskerRef = firebase
			.firestore()
			.collection('users')
			.doc(uniqueId)
			.collection('taskerDetails')
			.doc('tasker');
		yield call(() =>
			usertaskerRef.set(
				{
					data: { rating: value, online: false },
				},
				{ merge: true }
			)
		);
	} catch (error) {
		console.log('ERR', error);
	}
}
function* completeTrip() {
	try {
		yield put(TripActions.spinnerState(true));
		const getid = state => state.user.id;
		const uniqueId = yield select(getid);
		const details = state => state.user.userDetails.userData.email;
		const userId = yield select(details);
		const getfcmtoken = state => state.user.fcmtoken;
		const token = yield select(getfcmtoken);

		const useruserRef = firebase
			.firestore()
			.collection('users')
			.doc(userId)
			.collection('taskerDetails')
			.doc('tasker');

		const usertaskerRef = firebase
			.firestore()
			.collection('users')
			.doc(uniqueId)
			.collection('userDetails')
			.doc('user');

		yield call(() =>
			useruserRef.set(
				{
					taskDetails: {
						onTrip: false,
						paymentMode: null,
						paymentStatus: null,
						taskEndTime: Date(Date.now()),
					},
					status: 'completed',
				},
				{ merge: true }
			)
		);

		yield put(UserActions.sendNotification(token, 'Task Complete', 'Your task is complete'));

		yield call(() =>
			usertaskerRef.set(
				{
					taskDetails: {
						onTrip: false,
						paymentMode: null,
						paymentStatus: null,
						taskEndTime: Date(Date.now()),
					},
					status: 'completed',
				},
				{ merge: true }
			)
		);
		yield put(TripActions.spinnerState(false));
		yield put(DriverActions.changeStatus(true));
		// yield put(DriverActions.setTaskerOnlineStatus(isOnline));
	} catch (error) {
		yield put(TripActions.spinnerState(false));
		console.log('ERR', error);
	}
}
function* setDefaultTask() {
	try {
		yield put(UserActions.setUserPageStatus('home'));
		const getid = state => state.user.id;
		const uniqueId = yield select(getid);
		const details = state => state.user.userDetails.userData.email;
		const userId = yield select(details);

		const useruserRef = firebase
			.firestore()
			.collection('users')
			.doc(userId)
			.collection('taskerDetails')
			.doc('tasker');

		const usertaskerRef = firebase
			.firestore()
			.collection('users')
			.doc(uniqueId)
			.collection('userDetails')
			.doc('user');

		yield call(() =>
			useruserRef.set({
				status: 'default',
			})
		);

		yield call(() =>
			usertaskerRef.set({
				status: 'default',
			})
		);
		yield put(UserActions.setUserDetails(null));
		yield put(UserActions.resetStoreData());
	} catch (error) {
		yield put(UserActions.setUserPageStatus('home'));
		yield put(UserActions.setUserDetails(null));
		yield put(UserActions.resetStoreData());
		console.log('ERR', error);
	}
}

function* setRating(value, review) {
	try {
		yield put(PaymentActions.setLoading(true));
		const getid = state => state.user.id;
		const uniqueId = yield select(getid);
		const user = state => state.user.taskerDetails.taskerData.email;
		const userId = yield select(user);
		const userr = state => state.trip.userTaskId;
		const userrId = yield select(userr);
		const tasker = state => state.trip.taskerTaskId;
		const taskerId = yield select(tasker);
		const pay = state => state.paymentMethods.paymentMode;
		const payMode = yield select(pay);
		let ratingArray = [];

		const userReviewRef = firebase
			.firestore()
			.collection('users')
			.doc(userId)
			.collection('tasks')
			.doc(taskerId);

		const taskerReviewRef = firebase
			.firestore()
			.collection('users')
			.doc(uniqueId)
			.collection('tasks')
			.doc(userrId);

		yield call(() =>
			userReviewRef
				.set(
					{
						userType: 'tasker',
						taskDetails: {
							rating: value.rating,
							review: value.review,
							taskDetails: {
								paymentMode: payMode,
							},
						},
					},
					{ merge: true }
				)
				.then(res => {
					console.log(res);
				})
		);

		yield call(() =>
			taskerReviewRef
				.set(
					{
						userType: 'user',
						taskDetails: {
							rating: value.rating,
							review: value.review,
							taskDetails: {
								paymentMode: payMode,
							},
						},
					},
					{ merge: true }
				)
				.then(res => {
					console.log(res);
				})
		);

		const useruserRef = firebase
			.firestore()
			.collection('users')
			.doc(userId);

		yield call(() =>
			useruserRef.get().then(item => {
				ratingArray = item.data().rating;
				ratingArray.push(value.rating);
				item.ref.update({ rating: ratingArray });
			})
		);

		yield put(UserActions.setUserTripStatus());
		yield put(
			TripActions.setRatingSuccess({
				ratingArray,
			})
		);
		yield put(PaymentActions.setLoading(false));
		Actions.user({ type: ActionConst.RESET });
		yield put(PaymentActions.setPaymentMode(null));

	} catch (error) {
		yield put(PaymentActions.setLoading(false));
		console.log('ERR', error);
	}
}

function* bookFavourite(email) {
	// console.log(email,"sagasssss")
	try {
		const getid = state => state.user.id;
		const uniqueId = yield select(getid);
		let user = {};
		let tasker = {};

		// const userRef = firebase
		//   .firestore()
		//   .collection("users")
		//   .doc(uniqueId)
		//   .collection("taskerDetails")
		//   .doc("tasker");

		// const taskerRef = firebase
		//   .firestore()
		//   .collection("users")
		//   .doc(email)
		//   .collection("userDetails")
		//   .doc("user");

		firebase
			.firestore()
			.collection('users')
			.doc(uniqueId)
			.get()
			.then(querySnapshot => {
				if (querySnapshot.exists) {
					user = querySnapshot.data();
					console.log(user,"user");
				}
			})
			.catch(err => {
				console.log(err);
			});

		firebase
			.firestore()
			.collection('users')
			.doc(email.email)
			.get()
			.then(querySnapshot => {
				if (querySnapshot.exists) {
					tasker = querySnapshot.data();
					console.log(tasker,"tasker")
				}
			})
			.catch(err => {
				console.log(err);
			});
	} catch (error) {
		console.log(error);
	}
}

function* setCurrentAddressListener() {
	yield takeLatest(TripTypes.SET_CURRENT_ADDRESS, setCurrentAddress);
}
function* updateCurrentLocationListener() {
	yield takeLatest(TripTypes.UPDATE_CURRENT_LOCATION, updateCurrentLocation);
}
function* openTripLocationSearchListener() {
	yield takeLatest(TripTypes.OPEN_TRIP_LOCATION_SEARCH, openTripLocationSearch);
}
function* cancelTripListener() {
	yield takeLatest(TripTypes.SET_CANCEL_TRIP, cancelTrip);
}
function* finalRatingListener() {
	yield takeLatest(TripTypes.FINAL_RATING, finalRating);
}
function* updateDirectionsListener() {
	yield takeLatest(TripTypes.UPDATE_DIRECTIONS, updateDirections);
}
function* requestTripListener() {
	yield takeLatest(TripTypes.REQUEST_TRIP, requestTrip);
}
function* acceptTripListener() {
	yield takeLatest(TripTypes.ACCEPT_TRIP, acceptTrip);
}
function* startTripListener() {
	yield takeLatest(TripTypes.START_TRIP, startTrip);
}
function* completeTripListener() {
	yield takeLatest(TripTypes.COMPLETE_TRIP, completeTrip);
}

function* requestTaskerListener() {
	yield takeLatest(TripTypes.REQUEST_TASKER, requestTasker);
}
function* getTripHistoryListener() {
	yield takeLatest(TripTypes.GET_TRIP_HISTORY, getTripHistory);
}
function* cancelBookingListener() {
	yield takeLatest(TripTypes.CANCEL_BOOKING, cancelBooking);
}

function* taskerCancelBookingListener() {
	yield takeLatest(TripTypes.TASKER_CANCEL_BOOKING, taskerCancelBooking);
}

function* rejectBookingListener() {
	yield takeLatest(TripTypes.REJECT_BOOKING, rejectBooking);
}

function* startTaskListener() {
	yield takeLatest(TripTypes.START_TASK, startTask);
}

function* setStatusesListener() {
	yield takeLatest(TripTypes.SET_STATUSES, setStatuses);
}

function* setRatingListener() {
	yield takeLatest(TripTypes.SET_RATING, setRating);
}
function* setDefaultTaskStatusListener() {
	yield takeLatest(TripTypes.SET_DEFAULT_TASK_STATUS, setDefaultTask);
}

function* bookFavouriteListener() {
	yield takeLatest(TripTypes.BOOK_FAVOURITE, bookFavourite);
}

export default function* userSagas() {
	yield fork(setCurrentAddressListener);
	yield fork(updateCurrentLocationListener);
	yield fork(openTripLocationSearchListener);
	yield fork(cancelTripListener);
	yield fork(completeTripListener);
	yield fork(finalRatingListener);
	yield fork(updateDirectionsListener);
	yield fork(requestTripListener);
	yield fork(acceptTripListener);
	yield fork(startTripListener);
	yield fork(requestTaskerListener);
	yield fork(getTripHistoryListener);
	yield fork(cancelBookingListener);
	yield fork(taskerCancelBookingListener);
	yield fork(rejectBookingListener);
	yield fork(startTaskListener);
	yield fork(setStatusesListener);
	yield fork(setRatingListener);
	yield fork(setDefaultTaskStatusListener);
	yield fork(bookFavouriteListener);
}
