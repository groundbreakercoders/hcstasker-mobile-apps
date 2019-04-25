import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";
/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  changeStatus: ["isOnline"],
  canSwitch: null,
  addTrip: ["tripDetails"],
  showCard: ["bool"],
  refreshTasker: null,
  updateVehicle: ["vehicle"],
  setUpdateVehicle: ["vehicle"],
  removeVehicle: null,
  setPrice: ["value"],
  updatePhoto: ["photo"],
  getTripHistoryList: null,
  getPaymentHistoryList: null,
  updateStatement: ["statement"],
  setCurrentLatLng: null,
  setTripHistoryList: ["tripHistory"],
  setPaymentHistoryList: ["paymentHistory"],
  taskerChangedOnlineStatus: ["isOnline"],
  updateCurrentLatLng: null,
  foundTaskerCurrentLocation: ["latlng"]
});

export const TaskerTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
  currentLatLng: null,
  canSwitch: false,
  cardVisible: false,
  isOnline: false,
  photo: null,
  tripDetails: [],
  statement: null,
  price: 0,
  rating: 0,
  tripHistory: [],
  paymentHistory: [],
  acceptedTripsCount: 0,
  cancelledTripsCount: 0,
  totalTripsCount: 0,
  fiveStarTripsCount: 0,
  completedTrips: [],
  totalPayoutAmount: 0.0,
  payoutStatements: [],
  vehicle: null
});

/* ------------- Reducers ------------- */
export const setCanSwitch = (state = INITIAL_STATE) => ({
  ...state,
  canSwitch: true
});
export const setTaskerOnlineStatus = (state = INITIAL_STATE, { isOnline }) => ({
  ...state,
  isOnline
});
export const setCard = (state = INITIAL_STATE, { bool }) => ({
  ...state,
  cardVisible: bool
});
export const setPriceDetails = (state = INITIAL_STATE, { value }) => ({
  ...state,
  price: value
});
export const setTripDetails = (state = INITIAL_STATE, { tripDetails }) => ({
  ...state,
  tripDetails
});
export const setTaskerCurrentLocation = (
  state = INITIAL_STATE,
  { latlng }
) => ({
  ...state,
  currentLatLng: latlng
});
export const setTripHistory = (state = INITIAL_STATE, { tripHistory }) => ({
  ...state,
  tripHistory
});
export const setPaymentHistory = (
  state = INITIAL_STATE,
  { paymentHistory }
) => ({
  ...state,
  paymentHistory
});
export const updatedVehicle = (state = INITIAL_STATE, { vehicle }) => ({
  ...state,
  vehicle
});
export const removedVehicle = (state = INITIAL_STATE) => ({
  ...state,
  vehicle: null
});
export const updatedStatement = (state = INITIAL_STATE, { statement }) => ({
  ...state,
  statement: statement && statement.length > 0 ? statement : null
});

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.CAN_SWITCH]: setCanSwitch,
  [Types.SHOW_CARD]: setCard,
  [Types.TASKER_CHANGED_ONLINE_STATUS]: setTaskerOnlineStatus,
  [Types.FOUND_TASKER_CURRENT_LOCATION]: setTaskerCurrentLocation,
  [Types.SET_TRIP_HISTORY_LIST]: setTripHistory,
  [Types.SET_PAYMENT_HISTORY_LIST]: setPaymentHistory,
  [Types.SET_UPDATE_VEHICLE]: updatedVehicle,
  [Types.REMOVE_VEHICLE]: removedVehicle,
  [Types.UPDATE_STATEMENT]: updatedStatement,
  [Types.ADD_TRIP]: setTripDetails,
  [Types.SET_PRICE]: setPriceDetails
});
