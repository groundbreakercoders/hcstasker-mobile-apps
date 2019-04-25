import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";
/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  addPaymentMethod: ["values"],
  getPaymentMethodsList: null,
  setPaymentIndex: ["index"],
  setPaymentMethodsList: ["paymentList"],
  updateDefaultCard: ["card"],
  chargeCustomer: ["values"],
  removePaymentMethod: ["id"],
  setPaymentMode: ["mode"],
  setPaymentMethod: ["mode"],
  setPaymentStatus: ["status"],
  resetPayStoreData: null,
  setLoading: ["bool"]
});

export const PaymentTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
  paymentList: [],
  paymentMode: null,
  index: "",
  cardValues: {},
  paymentStatus: null,
  loading: false
});

/* ------------- Reducers ------------- */
export const setPaymentList = (state = INITIAL_STATE, { paymentList }) => ({
  ...state,
  paymentList
});

export const setAddPaymentIndex = (state = INITIAL_STATE, { index }) => ({
  ...state,
  cardValues: index
});

export const setAddPaymentMethod = (state = INITIAL_STATE, { cardNumber }) => [
  ...state,
  {
    id: state.length > 0 ? state[state.length - 1].id + 1 : 0,
    cardNumber
  }
];

export const setRemovePaymentMethod = (state = INITIAL_STATE, { id }) => ({
  state: state.filter(pm => pm.id !== id)
});

export const setPaymentMode = (state = INITIAL_STATE, { mode }) => ({
  ...state,
  paymentMode: mode
});
export const setPaymentStatus = (state = INITIAL_STATE, { status }) => ({
  ...state,
  paymentStatus: status
});
export const loadingSet = (state = INITIAL_STATE, { bool }) => ({
  ...state,
  loading: bool
});
export const resetData = (state = INITIAL_STATE) => ({
  ...state,
  paymentList: [],
  paymentMode: null,
  index: "",
  cardValues: {},
  paymentStatus: null
});

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_PAYMENT_INDEX]: setAddPaymentIndex,
  [Types.SET_PAYMENT_METHODS_LIST]: setPaymentList,
  [Types.REMOVE_PAYMENT_METHOD]: setRemovePaymentMethod,
  [Types.SET_PAYMENT_MODE]: setPaymentMode,
  [Types.SET_PAYMENT_STATUS]: setPaymentStatus,
  [Types.RESET_PAY_STORE_DATA]: resetData,
  [Types.SET_LOADING]: loadingSet
});
