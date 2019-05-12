import { call, put, fork, takeLatest, select } from "redux-saga/effects";
import { Alert } from "react-native";
import { startSubmit, stopSubmit } from "redux-form";
import { LoginManager } from "react-native-fbsdk";
import _ from "lodash";
import { Toast } from "native-base";
import firebase from "react-native-firebase";
import {
  Actions as NavigationActions,
  ActionConst
} from "react-native-router-flux";
import CryptoJS from "crypto-js";
import UserActions, { UserTypes } from "../Redux/userstore";
import DriverActions from "../Redux/driverstore";
import getFacebookProfile from "../utils/userutils";
import paymentActions from "../Redux/paymentmethodsstore";
import { doPost } from "../utils/service";
import TripActions from "../Redux/tripstore"

function* signUpUser({ name, email, password, phone }) {
  try {
    yield put(startSubmit("signUp"));
    yield put(UserActions.setSpinner(true));
    const getFid = state => state.user.fid;
    const ufid = yield select(getFid);

    let uniqueId = "";
    let success = null;
    userType = "user";
    uniqueId = email;
    username = name;
    let cipherPassword = CryptoJS.AES.encrypt(password, "secret key");

    cipherPassword = cipherPassword.toString();


    yield call(() =>
      firebase
        .auth()
        .createUserAndRetrieveDataWithEmailAndPassword(uniqueId, password)
        .then(() => {
          success = true;

        })
        .catch(error => {
          success = "error";
          Alert.alert(
            "SignUp Failed",
            "Email address or phone no is already in use"
          );
          console.log("Error creating User", error);
        })
    );

    yield put(
      UserActions.signUpSuccess({
        name,
        userType,
        email,
        phone
      })
    );

    if (ufid != null) {
      yield put(
        UserActions.checkUser({
          name,
          fid: ufid
        })
      );
    }

    yield call(() =>
      firebase
        .firestore()
        .collection("users")
        .doc(uniqueId)
        .set(
          {
            uniqueId,
            email,
            name,
            username,
            userType: "user",
            fid: null,
            phone,
            cipherPassword,
            address: null,
            category: null,
            currentLocation: null,
            location: null,
            onTrip: false,
            fee: null,
            isTasker: false,
            rating: [],
            fcmToken: null,
            online: false,
            profileUrl: null,
            status: null,
            stripeId: null,
            subCategory: null
          },
          {
            merge: true
          }
        )
        .catch(error => console.log("Catch", error))
    );

    yield call(() =>
      firebase
        .firestore()
        .collection("users")
        .doc(uniqueId)
        .collection("userDetails")
        .doc("user")
        .set(
          {},
          {
            merge: true
          }
        )
        .catch(error => console.log("Catch", error))
    );

    yield call(() =>
      firebase
        .firestore()
        .collection("users")
        .doc(uniqueId)
        .collection("taskerDetails")
        .doc("tasker")
        .set(
          {},
          {
            merge: true
          }
        )
        .catch(error => console.log("Catch", error))
    );

    yield call(() =>
      firebase
        .firestore()
        .collection("users")
        .doc(uniqueId)
        .collection("trips")
        .doc()
        .set(
          {},
          {
            merge: true
          }
        )
        .catch(error => console.log("Catch", error))
    );
    yield call(() =>
      firebase
        .firestore()
        .collection("users")
        .doc(uniqueId)
        .collection("paymentHistory")
        .doc()
        .set(
          {},
          {
            merge: true
          }
        )
        .catch(error => console.log("Catch", error))
    );

    yield put(UserActions.userId(uniqueId));
    yield put(TripActions.setCurrentAddress());
    if (success === true || success === "error") {
      yield put(UserActions.setSpinner(false));
    }
    if (success === true) {
      NavigationActions.user();
    }

    yield put(stopSubmit("signUp"));
  } catch (error) {
    yield put(UserActions.setSpinner(false));
    yield put(stopSubmit("signUp"));
    console.log("ERROR", error);
  }
}

function* changePassword({ newpassword, oldpassword, repassword }) {
  try {
    yield put(startSubmit("changePassword"));
    const getUser = state => state.user.email;
    const email = yield select(getUser);
    let currentpassword;
    yield call(() =>
      firebase
        .firestore()
        .collection("users")
        .doc(email)
        .get()
        .then(querySnapshot => {
          if (querySnapshot.exists) {
            currentpassword = querySnapshot.data().cipherPassword;
          } else {
            console.log("No such document!");
          }
        })
    );

    const bytes = CryptoJS.AES.decrypt(currentpassword, "secret key");
    const plaintext = bytes.toString(CryptoJS.enc.Utf8);

    if (plaintext === oldpassword) {
      if (newpassword === repassword) {
        if (oldpassword !== newpassword) {
          let cipherPassword = CryptoJS.AES.encrypt(newpassword, "secret key");

          cipherPassword = cipherPassword.toString();

          const user = firebase.auth().currentUser;

          user
            .updatePassword(newpassword)
            .then(() => Alert.alert("Password Updated Successfully"))
            .catch(error => Alert.alert(error));

          yield call(() =>
            firebase
              .firestore()
              .collection("users")
              .doc(email)
              .set(
                {
                  cipherPassword
                },
                {
                  merge: true
                }
              )
          );
          yield put(stopSubmit("changePassword"));
          Alert.alert("Password Updated Successfully");
          NavigationActions.pop();
        } else {
          Alert.alert("New Password must be different from your Old Password");
        }
      } else {
        Alert.alert("Passwords don't match");
      }
    } else {
      Alert.alert("Incorrect Old Password");
    }
  } catch (error) {
    yield put(stopSubmit("changePassword"));
    console.log("ERROR", error);
  }
}

function* editProfile({ name, phone }) {
  try {
    yield put(startSubmit("editProfile"));
    const getFid = state => state.user.fid;
    const getemail = state => state.user.email;
    const ufid = yield select(getFid);
    const email = yield select(getemail);

    let uniqueId = "";
    if (ufid != null) {
      uniqueId = `${ufid}@facebook.com`;
    } else {
      uniqueId = email;
    }
    yield call(() =>
      firebase
        .firestore()
        .collection("users")
        .doc(uniqueId)
        .set(
          {
            name,
            phone
          },
          {
            merge: true
          }
        )
        .catch(error => console.log("Catch", error))
    );
    yield put(
      UserActions.editProfileSuccess({
        name,
        phone
      })
    );
    yield put(stopSubmit("editProfile"));
    NavigationActions.pop();
  } catch (error) {
    yield put(stopSubmit("editProfile"));
    Alert.alert("Error updating Profile");
    NavigationActions.pop();
    console.log("ERROR", error);
  }
}

function* switchUserType() {
  try {
    yield put(UserActions.typeChanging(true));
    const getUser = state => state.user.userType;
    let userType = yield select(getUser);
    console.log(userType,"USERTYPE$$$$$$$$$$$$$$$")
    const getId = state => state.user.id;
    const userId = yield select(getId);
    const getState = state => state;
    const getSta = yield select(getState);
    console.log(getSta,"State")
    console.log(userId,"userID****************")
    userType = userType === "tasker" ? "user" : "tasker";

    yield call(() =>
      firebase
        .firestore()
        .collection("users")
        .doc(userId)
        .set(
          {
            userType: userType
          },
          {
            merge: true
          }
        )
    );

    yield put(UserActions.setSwitchType(userType));
    NavigationActions.reset(userType);
    yield put(UserActions.typeChanging(false));
  } catch (error) {
    yield put(UserActions.typeChanging(false));
    console.log("ERR", error);
  }
}

function* logoutUser() {
  try {
    yield call(() => LoginManager.logOut());
    yield call(() =>
      firebase
        .auth()
        .signOut()
        .then(() => {
          console.log("Sign Out Successfully");
        })
        .catch(() => {
          console.log("Error");
        })
    );
    NavigationActions.auth({ type: ActionConst.RESET });
    yield put(UserActions.logoutSuccess());
  } catch (error) {
    console.log("ERR", error);
  }
}

function* updateRefererCode({ refererCode }) {
  try {
    const getUser = state => state.user.email;
    const userEmail = yield select(getUser);
    yield put(UserActions.generatedRefererCode(refererCode));
    yield call(() =>
      firebase
        .firestore()
        .collection("users")
        .doc(userEmail)
        .set(
          {
            refererCode
          },
          {
            merge: true
          }
        )
    );
    Alert.alert("Updated", "Successfully submit changes");
  } catch (error) {
    console.log("ERR", error);
  }
}

function* loginSuccessYieldCall(child) {
  try {
    const { name, userType, email, username, isTasker } = child;
    yield put(
      UserActions.signUpSuccess({
        name,
        userType,
        email,
        phone: null
      })
    );
    yield put(
      UserActions.loginSuccess({
        username,
        istasker: isTasker
      })
    );
    yield put(UserActions.userId(child.uniqueId));
    yield put(
      UserActions.checkUser({
        name: child.name,
        fid: child.fid
      })
    );
    yield put(stopSubmit("login"));
  } catch (error) {
    console.log(error);
  }
}

function* onLoginFinished({ result }) {
  try {
    yield put(startSubmit("login"));
    let isExist = false;
    const resultData = yield call(() => getFacebookProfile(result));
    let userTypeVal;
    let errorCode = "";
    let matchedChild;
    const email = `${resultData.id}@facebook.com`;
    yield call(() =>
      firebase
        .auth()
        .signInAndRetrieveDataWithEmailAndPassword(email, resultData.id)
        .then(data => {
          NavigationActions.homepage();
        })
        .catch(error => {
          errorCode = error.code;
          if (error.code !== "auth/user-not-found") {
            Alert.alert("Sign in failed", "Username or Password is incorrect");
            throw new Error("Authentcation Failed");
          }
        })
    );
    if (errorCode === "auth/user-not-found") {
      yield call(() =>
        firebase
          .auth()
          .createUserAndRetrieveDataWithEmailAndPassword(email, resultData.id)
          .then(data => console.log("User created", data))
          .catch(createerror => {
            console.log("Error creating User", createerror);
          })
      );
    }
    if (errorCode === "auth/user-not-found") {
      let cipherPassword = CryptoJS.AES.encrypt(resultData.id, "secret key");

      cipherPassword = cipherPassword.toString();

      yield call(() =>
        firebase
          .firestore()
          .collection("users")
          .doc(email)
          .set(
            {
              uniqueId: email,
              email,
              name: resultData.first_name,
              username: resultData.first_name,
              userType: "user",
              fid: resultData.id,
              phone: null,
              cipherPassword,
              address: null,
              category: null,
              currentLocation: null,
              location: null,
              onTrip: false,
              fee: null,
              isTasker: false,
              rating: [],
              fcmToken: null,
              online: false,
              profileUrl: null,
              status: null,
              stripeId: null,
              subCategory: null
            },
            {
              merge: true
            }
          )
          .catch(error => console.log("Catch", error))
      );
    }
    yield call(() =>
      firebase
        .firestore()
        .collection("users")
        .doc(email)
        .get()
        .then(querySnapshot => {
          if (querySnapshot.exists) {
            const data = querySnapshot.data();
            matchedChild = data;
            isExist = true;
            userTypeVal = _.get(data, "userType", "");
            NavigationActions.reset(userTypeVal);
          } else {
            console.log("No such document!");
          }
        })
    );

    yield call(loginSuccessYieldCall, matchedChild);

    if (!isExist) {
      yield put(
        UserActions.checkUser({
          name: resultData.name,
          fid: resultData.id
        })
      );
      NavigationActions.homepage();
    }
  } catch (err) {
    yield put(stopSubmit("login"));
    console.log("ERR", err);
  }
}

function* loginYieldCall(child) {
  try {
    const { name, userType, email, phone, isTasker } = child;
    yield put(
      UserActions.signUpSuccess({
        name,
        userType,
        email,
        phone
      })
    );
    yield put(UserActions.userId(child.uniqueId));
    yield put(
      UserActions.loginSuccess({
        username: child.username,
        istasker: isTasker
      })
    );
    yield put(stopSubmit("login"));
  } catch (error) {
    console.log(error);
  }
}

function getDocumentNearBy(cat, subCat) {
  return new Promise((resolve, reject) => {
    const selectedTasker = [];
    const query = firebase
      .firestore()
      .collection("users")
      .where("userType", "==", "tasker")
      .where("category", "==", cat)
      .where("online", "==", true);

    query
      .get()
      .then(data => {
        data.forEach(item => {
          const tasker = item.data();
          const match = _.find(tasker.subCategory, function(o) {
            return o.name === subCat;
          });
          if (match) {
            selectedTasker.push(tasker);
          }
          resolve(selectedTasker);
        });
        resolve([]);
      })
      .catch(err => reject(err));
  });
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1); // deg2rad below
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
}

function nearByTasker(nearByUser,location) {
  return new Promise((resolve, reject) => {
   nearByUser.map((index) => {
   const distance = getDistanceFromLatLonInKm(index.location.latitude,
    index.location.longitude,
    location.latitude,
    location.longitude
    )
    // console.log(index,  distance,"DIStancessssssss")
    index.distance = distance;
    // console.log(index,'Distance User')
  });

  const sortData = _.sortBy(nearByUser, [function(o) { return o.distance; }]);
  // console.log(sortData,"Sorting")

  resolve(sortData);
})
}

function* getTaskers({ loc, cat, subCat }) {
  try {
    yield put(UserActions.setFetchTaskers(true));
    const getid = state => state.user.id;
    const uniqueId = yield select(getid);
    const getTripOrigin = state => state.trip.origin;
    const tripOrigin = yield select(getTripOrigin);
    const nearbyUsers = [];
    var markers = [];
    let location = "";
    let locationErr = false;
    yield call(() =>
      firebase
        .firestore()
        .collection("users")
        .doc(uniqueId) // use uniqueId here
        .get()
        .then(data => {
          const loc = data.data().currentLocation;
          location = {
            latitude: loc.latitude,
            longitude: loc.longitude
          };
        })
        .catch(error => {
          console.log("Catch", error);
          locationErr = true;
        })
    );
    if (locationErr) {
      yield put(UserActions.setFetchTaskers(false));
      Toast.show({
        text: "Update Current Location",
        duration: 2000,
        type: "warning"
      });
    }

    const selectedTasker = yield call(() => getDocumentNearBy(cat, subCat));
    if (selectedTasker.length) {
      selectedTasker.forEach(tasker => {
        if (tasker.uniqueId !== uniqueId) {
          const dist = getDistanceFromLatLonInKm(
            location.latitude,
            location.longitude,
            tasker.location.latitude,
            tasker.location.longitude
          );
          console.log(dist,"Distance in Saga")
          if (dist < 8) {
            nearbyUsers.push(tasker);
            const newLocation = {
              uniqueId: tasker.uniqueId,
              latlng: {
                latitude: tasker.location.latitude,
                longitude: tasker.location.longitude
              },
              title: tasker.username
            };
            markers.push(newLocation);
          } else {
            Toast.show({
              text: "No taskers Available",
              duration: 2000,
              type: "warning"
            });
          }
        }
      });
      if (markers.length) {
        const location1 = {
          uniqueId: uniqueId,
          latlng: {
            latitude: tripOrigin.latitude,
            longitude: tripOrigin.longitude
          },
          title: uniqueId
        };
        markers.push(location1);
      }

      if (markers.length) {
        const mogifieTaskers = yield call(() => nearByTasker(nearbyUsers, location));
        console.log(mogifieTaskers, '@@@@@@@@@@@@@@@@@@@@@@@');
        yield put(UserActions.setMarkers(markers, mogifieTaskers));
        // yield put(UserActions.setMarkers(markers, nearbyUsers));
      } else {
        yield put(UserActions.setSubCategorySelected(false, null));
      }
      yield put(UserActions.setFetchTaskers(false));
      // if (markers.length) {
      //   const mogifieTaskers = yield call(() => nearByTasker(nearbyUsers, location));
      //   console.log(mogifieTaskers, '@@@@@@@@@@@@@@@@@@@@@@@');
      //   yield put(UserActions.setMarkers(markers, mogifieTaskers));
      // }
    } else {
      yield put(UserActions.setFetchTaskers(false));
      yield put(UserActions.setMarkers(null, null));
      yield put(UserActions.setSubCategorySelected(false, null));
      if (!locationErr) {
        Toast.show({
          text: "No taskers Available",
          duration: 2000,
          type: "warning"
        });
      }
    }
  } catch (error) {
    yield put(UserActions.setFetchTaskers(false));
    console.log("ERR", error);
  }
}


function* loginUser({ email, password, launchUserType}) {
  try {
    console.log("loginUser Call!!!!!!!!!!!!!!!"+launchUserType)
    yield put(startSubmit("login"));
    yield put(UserActions.setSpinner(true));
    let matchedChild;
    let isExist = false;
    let success = null;
    let tempUserType;
    yield call(() =>
      firebase
        .auth()
        .signInAndRetrieveDataWithEmailAndPassword(email, password)
        .then(() => {
          success = true;
        })
        .catch(err => {
          const code = err.code;
          success = "error";
          if (code === "auth/user-not-found") {
            Alert.alert("Sign in failed", "User doesn't Exists");
          } else if (code === "auth/wrong-password") {
            Alert.alert("Sign in failed", "Pasword is  Incorrect");
          }
          throw new Error("Authentcation Failed");
        })
    );

    yield call(() =>
      firebase
        .firestore()
        .collection("users")
        .where("email", "==", email)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            const data = doc.data();
            console.log(data,"inside login")
            isExist = true;
            const { userType } = data;
            matchedChild = data;
            tempUserType = userType;
            if(userType != launchUserType) {
              success = "error";
              if(launchUserType == "user") {
                  Alert.alert("Please login as CareTaker");
              } else {
                Alert.alert("Please login as User");
              }
              throw new Error("Authorization Failed");
            } else {
                NavigationActions.reset(userType);
            }

          });
        }).catch(error => {
            console.log("Catch", error);
            if(tempUserType != launchUserType) {
              throw new Error("Authentcation Failed");
            }
          })
    );
    yield call(loginYieldCall, matchedChild);

    if (!isExist) {
      yield put(
        UserActions.loginSuccess({
          email,
          istasker: false
        })
      );

      Alert.alert("Sign in failed", "Email or Password is incorrect");
    }
    yield put(TripActions.setCurrentAddress())
    if (success === true) {
      if(tempUserType != launchUserType) {
        success = "error";
        if(launchUserType == "user") {
            Alert.alert("Please login as CareTaker");
        } else {
          Alert.alert("Please login as User");
        }
          throw new Error("Authorization Failed");
      } else {
        NavigationActions.reset(userType);
      }
    }
    if (success === true || success === "error") {
      yield put(UserActions.setSpinner(false));
    }
  } catch (error) {
    yield put(UserActions.setSpinner(false));
    yield put(stopSubmit("login"));
    console.log("ERR", error);
  }
}

function* setProfileUrl({ profileurl }) {
  try {
    const getemail = state => state.user.email;
    const email = yield select(getemail);

    yield call(() =>
      firebase
        .firestore()
        .collection("users")
        .doc(email)
        .set(
          {
            profileurl
          },
          {
            merge: true
          }
        )
    );
    yield put(UserActions.setPhotoUrl(profileurl));
    yield put(UserActions.setSpinner(false));
  } catch (error) {
    console.log("ERR", error);
  }
}

function* setServiceAndCategory({ cat, subcat, cost, add }) {
  try {
    // console.log(cost,"inside userSaga!!!!!!!!!!!!!!!!!!!!!!!")
    // console.log(typeof subcat,"inside usersage")
    yield put(startSubmit("taskerService"));
    const getemail = state => state.user.email;
    const email = yield select(getemail);
    // console.log(email,"email inside userSaga")

    // console.log(cat, subcat, cost, add, email, "tesingginggngingin")

    // const value = eval(cost);
    // console.log(typeof cost,"@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
    yield call(() =>
      firebase
        .firestore()
        .collection("users")
        .doc(email)
        .set(
          {
            category: cat,
            subCategory: subcat,
            fee: cost,
            location: new firebase.firestore.GeoPoint(add.lat, add.lng),
            address: add.add,
            isTasker: true
          },
          {
            merge: true
          })

    );
    console.log(cost,"inside afterrrr!!!!!!!!!!!!!!!!!!!!!!!")
    yield put(UserActions.isTaskerOrNot(true));
    yield put(stopSubmit("taskerService"));
    NavigationActions.pop();
  } catch (error) {
    yield put(stopSubmit("taskerService"));
    console.log("ERR====================", error);
  }
}

function* setTripStatus({ bool }) {
  try {
    yield put(UserActions.TripStartStatus(bool));
    const getid = state => state.user.id;
    const uniqueId = yield select(getid);

    const useruserRef = firebase
      .firestore()
      .collection("users")
      .doc(uniqueId)
      .collection("userDetails")
      .doc("user");

    yield call(() =>
      firebase
        .firestore()
        .collection("users")
        .doc(uniqueId)
        .set(
          {
            onTrip: bool
          },
          {
            merge: true
          }
        )
    );

    yield call(() =>
      useruserRef.set(
        {
          data: {
            onTrip: bool
          }
        },
        {
          merge: true
        }
      )
    );
  } catch (error) {
    console.log("ERR", error);
  }
}

function* storeToken({ token }) {
  const getemail = state => state.user.email;
  const email = yield select(getemail);
  console.log(email,"EmailUser")
  try {
    yield call(() =>
      firebase
        .firestore()
        .collection("users")
        .doc(email)
        .set(
          {
            fcmToken: token
          },
          {
            merge: true
          }
        )
    );
    yield put(UserActions.storeTokenInState(token));

  } catch (error) {
    console.log(error);
  }
}

function* sharePromoType({ promo }) {
  try {
    const getUser = state => state.user.id;
    const userId = yield select(getUser);

    const { fshare, tshare, mshare } = promo;
    yield put(
      UserActions.setSharePromo({
        fshare,
        tshare,
        mshare
      })
    );

    yield call(() =>
      firebase
        .firestore()
        .collection("users")
        .doc(userId)
        .set(
          {
            fshare,
            tshare,
            mshare
          },
          {
            merge: true
          }
        )
        .catch(error => console.log("Catch", error))
    );
  } catch (error) {
    console.log("ERR", error);
  }
}

function* storeFCMToken({ token }) {
  const getemail = state => state.user.email;
  const email = yield select(getemail);
  try {
    yield call(() =>
      firebase
        .firestore()
        .collection("users")
        .doc(email)
        .set(
          {
            fcmToken: token
          },
          {
            merge: true
          }
        )
    );
    yield put(UserActions.storeFCMTokenSuccess(token));
  } catch (error) {
    console.log(error);
  }
}

function* resetStoreData() {
  try {
    yield put(paymentActions.resetPayStoreData());
  } catch (error) {
    console.log(error);
  }
}

function* sendNotification({ destToken, title, body }) {
  try {
    const response = yield call(doPost, {
      url: "send",
      headers: {
        Authorization: `key=AAAAYIHH7Hk:APA91bFcSfK3VoIvlr3P6DNVG9jOkAo9WEEiuVbpwHgGVzzJqs9qXp4OrIPYRw1qaE7FY1HHPFPKFYqUCsIj2MbepGXy0ea-OIZh5y_zcqk9y8aRxrlbZGRHyCC4siLzLtYKNWssvraLaPIXzSo90MV6IXDPeEw2Hg`
      },
      params: {
        to: destToken,
        collapse_key: "type_a",
        data: {
          body: body,
          title: title
        }
      }
    });
    console.log("response", response);
  } catch (error) {
    console.log(error);
  }
}

function* setFavourite({ favourite }) {
  const list = [];
  try {
    yield put(UserActions.setSpinner(true));
    const getemail = state => state.user.email;
    const email = yield select(getemail);
    const favouriteId = favourite.email;
    console.log(favourite.favourite);
    if (favourite.favourite === undefined) {
      favourite.favourite = false;
    }
    console.log(favourite.favourite);
    if (!favourite.favourite) {
      yield call(() =>
        firebase
          .firestore()
          .collection("users")
          .doc(email)
          .collection("favourites")
          .doc(favourite.email)
          .set(
            {
              name: favourite.name,
              email: favourite.email
            },
            {
              merge: true
            }
          )
      );
    } else {
      yield call(() =>
        firebase
          .firestore()
          .collection("users")
          .doc(email)
          .collection("favourites")
          .doc(favouriteId)
          .delete()
      );
    }

    if (favourite.favourite) {
      Toast.show({
        text: "Removed from favourites",
        duration: 2000,
        type: "success"
      });
    } else {
      Toast.show({
        text: "Added to favourites",
        duration: 2000,
        type: "success"
      });
    }

    yield call(() =>
      firebase
        .firestore()
        .collection("users")
        .doc(email)
        .collection("tasks")
        .where("taskDetails.taskerData.email", "==", favouriteId)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(data => {
            console.log("data", data.favourite);
            data.ref.update({
              favourite: !favourite.favourite
            });
          });
        })
        .catch(error => console.log("Catch", error))
    );

    yield call(() =>
      firebase
        .firestore()
        .collection("users")
        .doc(email)
        .collection("favourites")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(data => list.push(data.data()));
        })
        .catch(error => console.log("Catch", error))
    );
    yield put(UserActions.setSpinner(false));
    yield put(UserActions.setFavouriteSuccess(list));
  } catch (error) {
    yield put(UserActions.setSpinner(false));
    console.log(error);
  }
}

function* getFavouritetaskers() {
  const list = [];
  try {
    const getemail = state => state.user.email;
    const email = yield select(getemail);

    yield call(() =>
      firebase
        .firestore()
        .collection("users")
        .doc(email)
        .collection("favourites")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(data => {
            firebase
              .firestore()
              .collection("users")
              .doc(data.email)
              .get()
              .then(data => {
                list.push(data);
              });
          });
        })
        .catch(error => console.log("Catch", error))
    );
    yield put(UserActions.setFavouriteSuccess(list));
  } catch (error) {
    console.log(error);
  }
}

function* signUpUserListener() {
  yield takeLatest(UserTypes.SIGN_UP, signUpUser);
}

function* switchUserTypeListener() {
  yield takeLatest(UserTypes.SWITCH_TYPE, switchUserType);
}

function* updateRefererCodeListener() {
  yield takeLatest(UserTypes.UPDATE_REFERER_CODE, updateRefererCode);
}

function* sharePromoTypeListener() {
  yield takeLatest(UserTypes.SHARE_PROMO, sharePromoType);
}

function* onLoginFinishedListener() {
  yield takeLatest(UserTypes.ON_LOGIN_FINISHED, onLoginFinished);
}

function* setTripStatusListener() {
  yield takeLatest(UserTypes.SET_TRIP_STATUS, setTripStatus);
}

function* loginUserListener() {
  console.log(UserTypes.LOGIN,"@@@@@@@@@@@@@@@@@@@@@@@@")
  yield takeLatest(UserTypes.LOGIN, loginUser);
}

function* logoutUserListener() {
  console.log(UserTypes.LOG_OUT,"!!!!!!!!!!!!!!!!!!!!")
  yield takeLatest(UserTypes.LOG_OUT, logoutUser);
}

function* getTaskersListener() {
  yield takeLatest(UserTypes.GET_TASKERS, getTaskers);
}

function* editProfileListener() {
  yield takeLatest(UserTypes.EDIT_PROFILE, editProfile);
}

function* setProfileUrlListener() {
  yield takeLatest(UserTypes.SET_PROFILE_URL, setProfileUrl);
}

function* setServiceAndCategoryListener() {
  yield takeLatest(UserTypes.SET_SERVICE_AND_CATEGORY, setServiceAndCategory);
}

function* setFavouriteListener() {
  yield takeLatest(UserTypes.SET_FAVOURITE, setFavourite);
}

function* storeTokenListener() {
  yield takeLatest(UserTypes.STORE_TOKEN, storeToken);
}

function* changePasswordListener() {
  yield takeLatest(UserTypes.CHANGE_PASSWORD, changePassword);
}
function* sendNotificationListener() {
  yield takeLatest(UserTypes.SEND_NOTIFICATION, sendNotification);
}
function* resetStoreDataListener() {
  yield takeLatest(UserTypes.RESET_STORE_DATA, resetStoreData);
}
function* getFavouritetaskersListener() {
  yield takeLatest(UserTypes.GET_FAVOURITETASKERS, getFavouritetaskers);
}

export default function* userSagas() {
  yield fork(signUpUserListener);
  yield fork(switchUserTypeListener);
  yield fork(updateRefererCodeListener);
  yield fork(onLoginFinishedListener);
  yield fork(loginUserListener);
  yield fork(sharePromoTypeListener);
  yield fork(setTripStatusListener);
  yield fork(logoutUserListener);
  yield fork(getTaskersListener);
  yield fork(editProfileListener);
  yield fork(setProfileUrlListener);
  yield fork(setServiceAndCategoryListener);
  yield fork(setFavouriteListener);
  yield fork(sendNotificationListener);
  yield fork(storeTokenListener);
  yield fork(changePasswordListener);
  yield fork(resetStoreDataListener);
  yield fork(getFavouritetaskersListener);
}
