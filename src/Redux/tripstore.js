import _ from "lodash";
import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";
import { guide } from "../theme";
/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  setCurrentAddress: null,
  updateCurrentLocation: null,
  openTripLocationSearch: ["key"],
  calculateTripDirections: { directions: null, distance: null },
  selectedTripPaymentMethod: ["paymentMethodId"],
  outOfReach: ["isOutOfReach"],
  selectedTripLocation: { key: null, data: null },
  updateTripDetails: ["key", "value"],
  requestTrip: ["value", "directions", "origin", "dest"],
  rating: ["rateDetails"],
  finalRating: ["value", "userDetails"],
  setRequestTrip: null,
  acceptTrip: ["userDetails"],
  cancelTrip: null,
  startTrip: ["userDetails"],
  startTask: null,
  setRating: ["rating", "review"],
  setRatingSuccess: ["rating"],
  completeTrip: ["userDetails"],
  setDefaultTaskStatus: null,
  setCompleteTrip: null,
  setCancelTrip: null,
  updateDirections: null,
  clearTripStore: null,
  setNotFound: ["bool"],
  setTaskerFound: ["bool"],
  requestTasker: ["tasker", "taskDate", "taskTime"],
  getTripHistory: ["status", "i"],
  setTripHistory: ["trips"],
  spinnerState: ["bool"],
  cancelBooking: null,
  taskerCancelBooking: null,
  rejectBooking: null,
  setStatuses: null,
  setUserTaskId: ["Id"],
  setTaskerTaskId: ["Id"],
  changeTabIndex: ["index"],
  bookFavourite: ["email"],
});

export const TripTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
  origin: null,
  region: null,
  destination: null,
  directions: null,
  paymentMethodId: null,
  status: "default",
  isOutOfReach: false,
  notFound: false,
  taskerFound: false,
  rateDetails: [],
  distance: null,
  price: null,
  details: {
    isRipple: false,
    vehicleType: "ecoCar",
    isCarSeat: false,
    isGirlPower: false,
    isPeacefulRide: false
  },
  userTaskId: null,
  taskerTaskId: null,
  trips: [],
  rating: null,
  loading: false,
  tabIndex: 0
});

const priceTable = {
  perKm: 2.0,
  vehicleType: {
    ecoCar: 1.0,
    multiPassenger: 1.3
  },
  isRipple: 0.7
};

function calculatePrice(state) {
  let price = (state.distance / 1000.0) * priceTable.perKm;
  if (state.details.isRipple) {
    price *= priceTable.isRipple;
  }
  price *= priceTable.vehicleType[state.details.vehicleType];
  return price.toFixed(2);
}

/* ------------- Reducers ------------- */
export const setSelectedTripLocation = (
  state = INITIAL_STATE,
  { key, data }
) => {
  const newState = Object.assign(
    {},
    {
      ...state,
      [key]: data,
      region: {
        ...({ latitude, longitude } = data),
        ...guide.components.map.latLngDelta
      }
    }
  );
  if (state.origin && state.destination) {
    newState.status = "selectedOriginAndDestination";
  }
  return newState;
};
export const calculateTripDir = (
  state = INITIAL_STATE,
  { directions, distance }
) => {
  let newState = Immutable.merge(state, {
    isOutOfReach: false,
    directions,
    distance
  });
  if (state.origin && state.destination) {
    newState = Immutable.merge(newState, {
      status: "selectedOriginAndDestination"
    });
  }
  return Immutable.merge(newState, { price: calculatePrice(newState) });
};
export const setSelectedTripPayMethod = (
  state = INITIAL_STATE,
  { paymentMethodId }
) => ({
  ...state,
  paymentMethodId
});
export const setTaskerNotFound = (state = INITIAL_STATE, { bool }) => ({
  ...state,
  notFound: bool
});
export const setTaskerAccepted = (state = INITIAL_STATE, { bool }) => ({
  ...state,
  taskerFound: bool
});
export const setRating = (state = INITIAL_STATE, { rating }) => ({
  ...state,
  rating
});

export const setSpinnerState = (state = INITIAL_STATE, { bool }) => ({
  ...state,
  loading: bool
});
export const setTripHistory = (state = INITIAL_STATE, { trips }) => ({
  ...state,
  trips
});
export const setOutOfReach = (state = INITIAL_STATE, { isOutOfReach }) =>
  Immutable.merge({
    ...state,
    isOutOfReach
  });
export const changeTabIndex = (state = INITIAL_STATE, { index }) =>
  Immutable.merge({
    ...state,
    tabIndex: index
  });
export const setUserTaskId = (state = INITIAL_STATE, { Id }) =>
  Immutable.merge({
    ...state,
    userTaskId: Id
  });
export const setTaskerTaskId = (state = INITIAL_STATE, { Id }) =>
  Immutable.merge({
    ...state,
    taskerTaskId: Id
  });

export const setTripDetails = (state = INITIAL_STATE, { key, value }) => {
  const newState = _.merge({}, state, {
    details: {
      [key]: value
    }
  });
  return Immutable.merge(newState, { price: calculatePrice(newState) });
};
export const setRequestedTrip = (state = INITIAL_STATE) => {
  if (state.status === "selectedOriginAndDestination") {
    return _.merge({}, state, {
      status: "requested"
    });
  }
  return { ...state };
};
export const setCompletedTrip = (state = INITIAL_STATE) => {
  switch (state.status) {
    case "requested":
      return _.merge({}, state, { status: "default" });
    case "default":
    default:
      return _.merge({}, state, { status: "default" });
  }
};
export const setCancelTripModal = (state = INITIAL_STATE) => {
  switch (state.status) {
    case "requested":
      return _.merge({}, state, {
        status: "selectedOriginAndDestination"
      });
    case "default":
      return INITIAL_STATE;
    case "selectedOriginAndDestination":
      return INITIAL_STATE;
    default:
      return INITIAL_STATE;
  }
};

export const setClearTripStore = () => Immutable.merge(INITIAL_STATE, {});

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.SELECTED_TRIP_LOCATION]: setSelectedTripLocation,
  [Types.CALCULATE_TRIP_DIRECTIONS]: calculateTripDir,
  [Types.SELECTED_TRIP_PAYMENT_METHOD]: setSelectedTripPayMethod,
  [Types.SET_REQUEST_TRIP]: setRequestedTrip,
  [Types.SET_COMPLETE_TRIP]: setCompletedTrip,
  [Types.OUT_OF_REACH]: setOutOfReach,
  [Types.UPDATE_TRIP_DETAILS]: setTripDetails,
  [Types.CANCEL_TRIP]: setCancelTripModal,
  [Types.SET_NOT_FOUND]: setTaskerNotFound,
  [Types.SET_TASKER_FOUND]: setTaskerAccepted,
  [Types.CLEAR_TRIP_STORE]: setClearTripStore,
  [Types.SET_RATING_SUCCESS]: setRating,
  [Types.SET_TRIP_HISTORY]: setTripHistory,
  [Types.SPINNER_STATE]: setSpinnerState,
  [Types.SET_USER_TASK_ID]: setUserTaskId,
  [Types.SET_TASKER_TASK_ID]: setTaskerTaskId,
  [Types.CHANGE_TAB_INDEX]: changeTabIndex
});
