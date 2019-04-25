import { call, put, fork, takeLatest, select } from "redux-saga/effects";
import { startSubmit, stopSubmit } from "redux-form";
import firebase from "react-native-firebase";
import { Actions as NavigationActions } from "react-native-router-flux";
import PaymentActions, { PaymentTypes } from "../Redux/paymentmethodsstore";
import TripActions from "../Redux/tripstore";

function* addPaymentMethod({ values }) {
  try {
    const { number, cvc, exp_year, exp_month, name, type } = values;
    yield put(startSubmit("addPayment"));
    const getid = state => state.user.id;
    const uniqueId = yield select(getid);

    const paymentData = yield call(() =>
      firebase
        .firestore()
        .collection("users")
        .doc(uniqueId)
        .collection("payment")
        .add({
          object: "card",
          number,
          cvc,
          exp_year,
          exp_month,
          name
        })
        .then(ref => {
          const data = ref.id;
        })
        .catch(error => console.log("Catch", error))
    );

    yield put(PaymentActions.getPaymentMethodsList());
    NavigationActions.pop();
    yield put(stopSubmit("addPayment"));
  } catch (error) {
    yield put(stopSubmit("addPayment"));
  }
}

function* getPaymentMethodsList() {
  try {
    yield put(startSubmit("payment"));
    const getid = state => state.user.id;
    const uniqueId = yield select(getid);

    const list = [];
    yield call(() =>
      firebase
        .firestore()
        .collection("users")
        .doc(uniqueId)
        .collection("payment")
        .get()
        .then(data => data.forEach(doc => list.push(doc.data())))
        .catch(error => console.log("Catch", error))
    );

    yield put(PaymentActions.setPaymentMethodsList(list));
    yield put(stopSubmit("payment"));
  } catch (error) {
    yield put(stopSubmit("payment"));
    console.log("ERR", error);
  }
}

function* updateDefaultCard({ card }) {
  try {
    yield put(startSubmit("payment"));
    const getid = state => state.user.id;
    const uniqueId = yield select(getid);

    const updateDefaultCard = firebase
      .functions()
      .httpsCallable("updateDefaultCard");
    updateDefaultCard({
      data: card,
      email: uniqueId
    })
      .then(res => {})
      .catch(err => {});

    yield put(stopSubmit("payment"));
  } catch (error) {
    yield put(stopSubmit("payment"));
    console.log("ERR", error);
  }
}

function* chargeCustomer({ values }) {
  try {
    yield put(PaymentActions.setLoading(true));
    const getid = state => state.user.id;
    const uniqueId = yield select(getid);
    const pay = state => state.paymentMethods.paymentMode;
    const payMode = yield select(pay);
    const task = state => state.user.taskerDetails;
    const user = yield select(task);
    const taskDetails = user;
    var userTaskId = null;
    var tasketTaskId = null;
    var status = null;

    const useruserRef = firebase
      .firestore()
      .collection("users")
      .doc(user.taskerData.email)
      .collection("tasks");

    const usertaskerRef = firebase
      .firestore()
      .collection("users")
      .doc(uniqueId)
      .collection("tasks");

    yield call(() =>
      useruserRef
        .add({
          taskDetails
        })
        .then(ref => {
          taskerTaskId = ref.id;
        })
    );

    yield call(() =>
      usertaskerRef
        .add({
          taskDetails
        })
        .then(ref => {
          userTaskId = ref.id;
        })
    );

    yield put(TripActions.setUserTaskId(userTaskId));
    yield put(TripActions.setTaskerTaskId(taskerTaskId));

    if (payMode === "Card") {
      const chargeCustomer = firebase
        .functions()
        .httpsCallable("chargeCustomer");
      chargeCustomer({
        values,
        email: uniqueId,
        taskerId: user.taskerData.email
      })
        .then(res => {
          status = res.data;
          NavigationActions.receipt({ status: status });
        })
        .catch(err => {
          status = err;
          NavigationActions.receipt({ status: "error" });
        });
    } else {
      yield put(PaymentActions.setLoading(false));
      NavigationActions.receipt();
    }
    yield put(PaymentActions.setLoading(false));
  } catch (error) {
    yield put(PaymentActions.setLoading(false));
    console.log("ERR", error);
  }
}

function* setPaymentMethod({ mode }) {
  try {
    yield put(startSubmit("payment"));
    yield put(PaymentActions.setPaymentMode(mode));
    const getid = state => state.user.id;
    const uniqueId = yield select(getid);
    const task = state => state.user.taskerDetails.taskerData.email;
    const TaserId = yield select(task);

    const useruserRef = firebase
      .firestore()
      .collection("users")
      .doc(TaserId)
      .collection("userDetails")
      .doc("user");

    const usertaskerRef = firebase
      .firestore()
      .collection("users")
      .doc(uniqueId)
      .collection("taskerDetails")
      .doc("tasker");

    yield call(() =>
      useruserRef.set(
        {
          status: "payMethodSelected",
          taskDetails: {
            paymentMode: mode
          }
        },
        {
          merge: true
        }
      )
    );

    yield call(() =>
      usertaskerRef.set(
        {
          status: "payMethodSelected",
          taskDetails: {
            paymentMode: mode
          }
        },
        {
          merge: true
        }
      )
    );
    yield put(stopSubmit("payment"));
  } catch (error) {
    yield put(stopSubmit("payment"));
    console.log("ERR", error);
  }
}

function* addPaymentMethodListener() {
  yield takeLatest(PaymentTypes.ADD_PAYMENT_METHOD, addPaymentMethod);
}

function* getPaymentMethodsListListener() {
  yield takeLatest(
    PaymentTypes.GET_PAYMENT_METHODS_LIST,
    getPaymentMethodsList
  );
}
function* updateDefaultCardListener() {
  yield takeLatest(PaymentTypes.UPDATE_DEFAULT_CARD, updateDefaultCard);
}
function* chargeCustomerListener() {
  yield takeLatest(PaymentTypes.CHARGE_CUSTOMER, chargeCustomer);
}

function* setPaymentMethodListener() {
  yield takeLatest(PaymentTypes.SET_PAYMENT_METHOD, setPaymentMethod);
}

export default function* paymentSagas() {
  yield fork(addPaymentMethodListener);
  yield fork(getPaymentMethodsListListener);
  yield fork(updateDefaultCardListener);
  yield fork(chargeCustomerListener);
  yield fork(setPaymentMethodListener);
}
