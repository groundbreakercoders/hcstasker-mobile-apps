import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";
import { Actions } from "react-native-router-flux";

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  signUp: {
    name: null,
    email: null,
    password: null,
    phone: null
  },
  signUpSuccess: {
    name: null,
    userType: null,
    email: null,
    phone: null
  },
  storeToken: ["token"],
  storeTokenInState: ["token"],
  setUserDetails: ["userDetails"],
  setUserInfoAndStatus: ["status"],
  showAcceptModal: ["bool"],
  changePassword: {
    newpassword: null,
    oldpassword: null,
    repassword: null
  },
  checkUser: {
    name: null,
    fid: null
  },
  editProfile: {
    name: null,
    phone: null
  },
  editProfileSuccess: {
    name: null,
    phone: null
  },
  setUpdatedPhoto: ["photo"],
  switchType: null,
  setSwitchType: ["userType"],
  setFavourite: ["favourite"],
  setFavouriteSuccess: ["favourites"],
  logOut: null,
  sendNotification: ["destToken", "title", "body"],
  showedSharePrompt: null,
  updateRefererCode: ["refererCode"],
  sharePromo: ["promo"],
  setSharePromo: {
    fshare: null,
    tshare: null,
    mshare: null
  },
  onLoginFinished: ["error", "result"],
  userId: ["id"],
  generatedRefererCode: ["refererCode"],
  login: ["email", "password", "launchUserType"],
  loginSuccess: {
    username: null,
    istasker: null
  },
  logoutSuccess: null,
  setTripStatus: ["bool"],
  TripStartStatus: ["bool"],
  setSubCategorySelected: ["bool", "cat"],
  setProfileUrl: ["profileurl"],
  setPhotoUrl: ["profileurl"],
  setTaskerSelected: ["bool", "tasker"],
  setUserPageStatus: ["pageStatus"],
  getTaskers: ["loc", "cat", "subCat"],
  setMarkers: ["markers", "nearbyUsers"],
  setSpinner: ["loading"],
  setServiceAndCategory: ["cat", "subcat", "cost", "add"],
  isTaskerOrNot: ["bool"],
  tripStatusSet: ["status"],
  updateLanguage: ["lang"],
  resetStoreData: null,
  setUserTripStatus: null,
  setTaskerDetails: ["taskerDetails"],
  getFavouritetaskers: null,
  typeChanging: ["bool"],
  setUserLocation: ["Coordinates"],
  setFetchTaskers: ["bool"],
  setTaskers : [ "taskerList", "selectedCategory" ],
  setTaskerList : ["category"],
  setCategory: [ "selectedCategory"]
});
export const UserTypes = Types;
export default Creators;
export type UserType = "user" | "tasker";
/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
  id: null,
  fid: null,
  isLoggedIn: false,
  isTasker: false,
  name: null,
  email: null,
  username: null,
  phone: null,
  city: null,
  photo: null,
  profileurl: null,
  password: null,
  launchUserType: null,
  onTrip: false,
  tripStatus: "default",
  modalVisible: false,
  userType: null,
  referalPromo: null,
  favourites: null,
  refererCode: null,
  promptToShare: false,
  fshare: false,
  tshare: false,
  mshare: false,
  SubCategorySelected: false,
  taskerSelected: false,
  tasker: null,
  category: null,
  token: null,
  userPageStatus: "home",
  gpsLoc: null,
  nearTaskers: null,
  allTasker: null,
  loading: false,
  fcmtoken: null,
  userDetails: null,
  taskerDetails: null,
  lang: "en",
  typeChanging: false,
  fetchTaskers: false,
  taskerList: null,
  selectedCategory: null
});

/* ------------- Reducers ------------- */
export const switchUserType = (state = INITIAL_STATE, { userType }) => ({
  ...state,
  userType
});
export const setUserId = (state = INITIAL_STATE, { id }) => ({
  ...state,
  id
});
export const checkUserStatus = (state = INITIAL_STATE, { name, fid }) => ({
  ...state,
  name,
  fid
});
export const loginUser = (state = INITIAL_STATE, { username, istasker }) =>
({
  ...state,
  username,
  isTasker: istasker,
  isLoggedIn: true
});
export const signUpUser = (
  state = INITIAL_STATE,
  { name, userType, email, phone }
) => ({
  ...state,
  isLoggedIn: true,
  name,
  userType,
  email,
  phone
});
export const editProfile = (state = INITIAL_STATE, { name, phone }) => ({
  ...state,
  name,
  phone
});
export const generateRefCode = (state = INITIAL_STATE, { refererCode }) => ({
  ...state,
  refererCode,
  promptToShare: true
});
export const showSharedPrompt = (state = INITIAL_STATE) => ({
  ...state,
  promptToShare: false
});
export const setTripStartStatus = (state = INITIAL_STATE, { bool }) => ({
  ...state,
  onTrip: bool
});
export const sharePromoType = (
  state = INITIAL_STATE,
  { fshare, tshare, mshare }
) => ({
  ...state,
  fshare,
  tshare,
  mshare
});

export const setUserDataDetails = (state = INITIAL_STATE, { userDetails }) => ({
  ...state,
  userDetails
});

export const logOutUser = () => {
  return Immutable.merge(INITIAL_STATE, {});
};

export const setUpdatePhoto = (state = INITIAL_STATE, { photo }) => ({
  ...state,
  photo
});

export const setTaskerSelected = (state = INITIAL_STATE, { bool, tasker }) => ({
  ...state,
  taskerSelected: bool,
  tasker
});
export const setPageStatus = (state = INITIAL_STATE, { pageStatus }) => ({
  ...state,
  userPageStatus: pageStatus
});
export const setSpinner = (state = INITIAL_STATE, { loading }) => ({
  ...state,
  loading
});
export const setFavourite = (state = INITIAL_STATE, { favourites }) => ({
  ...state,
  favourites
});
export const setPhotoUrl = (state = INITIAL_STATE, { profileurl }) => ({
  ...state,
  profileurl
});
export const storeTokenInState = (state = INITIAL_STATE, { token }) => ({
  ...state,
  fcmtoken: token
});
export const tripSetStatus = (state = INITIAL_STATE, { status }) => ({
  ...state,
  tripStatus: status
});
export const updateLanguage = (state = INITIAL_STATE, { lang }) => ({
  ...state,
  lang
});
export const setNearMarkers = (
  state = INITIAL_STATE,
  { markers, nearbyUsers }
) => {
  return {
    ...state,
    nearTaskers: markers,
    allTasker: nearbyUsers
  };
};
export const setUserInfoStatus = (state = INITIAL_STATE, { status }) => {
  return {
    ...state,
    tripStatus: status.status,
    modalVisible: status.visible,
    userDetails: status.data
  };
};
export const setAcceptModal = (state = INITIAL_STATE, { bool }) => ({
  ...state,
  modalVisible: bool
});

export const getSpinnerState = state => state.user.loading;
export const setUserTripStatus = (state = INITIAL_STATE) => ({
  ...state,
  userPageStatus: "home",
  SubCategorySelected: false,
  tripStatus: "default"
});

export const setTaskerDataDetails = (
  state = INITIAL_STATE,
  { taskerDetails }
) => ({
  ...state,
  taskerDetails
});
export const isTasker = (state = INITIAL_STATE, { bool }) => ({
  ...state,
  isTasker: bool
});
export const typeChanging = (state = INITIAL_STATE, { bool }) => ({
  ...state,
  typeChanging: bool
});

export const setUserLocation = (state = INITIAL_STATE, { Coordinates }) => ({
  ...state,
  gpsLoc: Coordinates
});
export const setFetchTaskers = (state = INITIAL_STATE, { bool }) => ({
  ...state,
  fetchTaskers: bool
});
export const setCategorySelected = (state = INITIAL_STATE, { bool, cat }) => ({
  ...state,
  SubCategorySelected: bool,
  category: cat
});

export const setTaskers = (state = INITIAL_STATE, { taskerList, selectedCategory }) => ({
  ...state,
  taskerList: taskerList,
  selectedCategory: selectedCategory
});

export const setCategory = (state = INITIAL_STATE, { selectedCategory }) => ({
  ...state,
  selectedCategory: selectedCategory
});

//
// export const setCategory = (state = INITIAL_STATE, { selectedCategory }) => ({
//   ...state,
//   selectedCategory:selectedCategory
// });

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.SIGN_UP_SUCCESS]: signUpUser,
  [Types.SET_SWITCH_TYPE]: switchUserType,
  [Types.USER_ID]: setUserId,
  [Types.CHECK_USER]: checkUserStatus,
  [Types.LOGIN_SUCCESS]: loginUser,
  [Types.GENERATED_REFERER_CODE]: generateRefCode,
  [Types.SHOWED_SHARE_PROMPT]: showSharedPrompt,
  [Types.SET_SHARE_PROMO]: sharePromoType,
  [Types.LOGOUT_SUCCESS]: logOutUser,
  [Types.SET_UPDATED_PHOTO]: setUpdatePhoto,
  [Types.TRIP_START_STATUS]: setTripStartStatus,
  [Types.SET_SUB_CATEGORY_SELECTED]: setCategorySelected,
  [Types.SET_TASKER_SELECTED]: setTaskerSelected,
  [Types.SET_USER_PAGE_STATUS]: setPageStatus,
  [Types.SET_MARKERS]: setNearMarkers,
  [Types.EDIT_PROFILE_SUCCESS]: editProfile,
  [Types.SET_TASKERS]: setTaskers,
  [Types.SET_CATEGORY]: setCategory,
  [Types.SET_SPINNER]: setSpinner,
  [Types.STORE_TOKEN_IN_STATE]: storeTokenInState,
  [Types.SET_PHOTO_URL]: setPhotoUrl,
  [Types.SET_FAVOURITE_SUCCESS]: setFavourite,
  [Types.TRIP_STATUS_SET]: tripSetStatus,
  [Types.SHOW_ACCEPT_MODAL]: setAcceptModal,
  [Types.SET_USER_DETAILS]: setUserDataDetails,
  [Types.SET_USER_INFO_AND_STATUS]: setUserInfoStatus,
  [Types.UPDATE_LANGUAGE]: updateLanguage,
  [Types.SET_TASKER_DETAILS]: setTaskerDataDetails,
  [Types.SET_USER_TRIP_STATUS]: setUserTripStatus,
  [Types.IS_TASKER_OR_NOT]: isTasker,
  [Types.TYPE_CHANGING]: typeChanging,
  [Types.SET_USER_LOCATION]: setUserLocation,
  [Types.SET_FETCH_TASKERS]: setFetchTaskers
});
