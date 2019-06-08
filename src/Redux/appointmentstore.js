import _ from "lodash";
import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";
import { guide } from "../theme";
/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  getAppointments: ["userid", "usertype"],
  setAppointments: ["appointments"]
});

export const AppointmentTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
  appointments: []
});


export const setAppointments = (state = INITIAL_STATE, { appointments }) => ({
  ...state,
  appointments
});

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_APPOINTMENTS]: setAppointments
});
