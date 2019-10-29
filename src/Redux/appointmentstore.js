import _ from "lodash";
import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";
import { guide } from "../theme";
/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  getAppointments: ["userid", "usertype"],
  setAppointments: ["appointments"],
  saveAppointment: ["appointment"],
  getUserstype: ["usertype"],
  setUserstype: ["availUsers"],
  setAppointment: ["appointment"],
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

export const setAppointment = (state = INITIAL_STATE, { appointment }) => ({
  ...state,
  appointment
});

export const setUsers = (state = INITIAL_STATE, { users }) => ({
  ...state,
  users
});

export const setUserstype = (state = INITIAL_STATE, { availUsers }) => ({
  ...state,
  availUsers
});

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_APPOINTMENTS]: setAppointments,
  [Types.SET_APPOINTMENT]: setAppointment,
  [Types.SET_USERSTYPE]: setUserstype
});

