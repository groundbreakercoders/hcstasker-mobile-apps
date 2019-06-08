import { all } from "redux-saga/effects";
import usersaga from "./usersaga";
import tripsaga from "./tripsaga";
import driversaga from "./driversaga";
import paymentsaga from "./paymentsaga";
import appointmentsaga from "./appointmentsaga";
export default function* root() {
  yield all([usersaga(), tripsaga(), driversaga(), paymentsaga(), appointmentsaga()]);
}
