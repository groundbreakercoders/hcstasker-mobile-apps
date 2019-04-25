import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";
import { Toast } from "native-base";

const { Types, Creators } = createActions({
  connectionState: ["status"]
});

export const NetworkTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
  isConnected: false
});

export const connectionState = (state = INITIAL_STATE, { status }) => {
  if (!status.status) {
    Toast.show({
      text: "Check Network Connection",
      position: "top",
      type: "danger",
      buttonText: "Dismiss",
      duration: 10000
    });
  }
  return {
    ...state,
    isConnected: status.status
  };
};

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CONNECTION_STATE]: connectionState
});
