import FBSDK, { GraphRequest, GraphRequestManager } from "react-native-fbsdk";
import { Actions } from "react-native-router-flux";
import { Answers } from "react-native-fabric";
import firebase from "react-native-firebase";
import { Alert } from "react-native";


export function signUp(user) {
  return (dispatch, getState) => {
    const ufid = getState().user.fid;
    dispatch({
      type: "SIGN_UP",
      ...({ name, userType, email, referalPromo } = user)
    });

    if (ufid != null) {
      dispatch({
        type: "CHECK_USER",
        name: user.name,
        fid: ufid
      });
    }

    dispatch({
      type: "LOGIN",
      username: user.username,
      password: user.password
    });

    Answers.logSignUp("Demo", true, { referral: user.referalPromo });

    const firstName = user.name.split(" ")[0];
    firebase
      .database()
      .ref("users")
      .once("value", snap => {
        const lastCount = snap.numChildren() + 1;
        const refererCode = `${firstName}${lastCount}`.toUpperCase();
        const data = firebase
          .database()
          .ref("users")
          .push();
        data.set({
          ...({
            name,
            userType,
            age,
            email,
            city,
            phone,
            referalPromo,
            username,
            password
          } = user),
          fshare: false,
          tshare: false,
          mshare: false,
          refererCode,
          fid: ufid
        });
        dispatch({
          type: "USER_ID",
          id: data.getKey()
        });
        dispatch({
          type: "GENERATED_REFERER_CODE",
          refererCode
        });
      });
    Actions.reset(userType);
  };
}

export function switchType() {
  return (dispatch, getState) => {
    const userType = getState().user.userType == "tasker" ? "user" : "tasker";
    dispatch({
      type: "SWITCH_TYPE",
      userType
    });
    Actions.reset(userType);
  };
}

export function logOut() {
  return dispatch => {
    dispatch({
      type: "LOG_OUT"
    });
    Actions.reset("auth");
  };
}

export function showedSharePrompt() {
  return dispatch => {
    dispatch({
      type: "SHOWED_SHARE_PROMPT"
    });
  };
}

export function updateRefererCode(refererCode) {
  return (dispatch, getState) => {
    dispatch({
      type: "GENERATED_REFERER_CODE",
      refererCode
    });
    firebase
      .database()
      .ref(`users/${getState().user.id}`)
      .update({
        refererCode
      });
  };
}

export function sharePromo(promo) {
  return (dispatch, getState) => {
    dispatch({
      type: "SHARE_PROMO",
      ...({ fshare, tshare, mshare } = promo)
    });
    firebase
      .database()
      .ref(`users/${getState().user.id}`)
      .update({
        ...({ fshare, tshare, mshare } = promo)
      });
  };
}

export function onLoginFinished(error: ?Object, result: ?Object) {
  let isExist = false;
  return (dispatch, getState) => {
    const profile = getFacebookProfile();
    profile.then(result => {
      firebase
        .database()
        .ref("users")
        .once("value", snap => {
          snap.forEach(child => {
            if (result.id == child.val().fid) {
              isExist = true;

              Answers.logSignUp("Demo", true, {
                referral: child.val().referalPromo
              });
              dispatch({
                type: "SIGN_UP",
                ...({ userType, email, referalPromo } = child.val())
              });
              dispatch({
                type: "USER_ID",
                id: child.key
              });
              dispatch({
                type: "CHECK_USER",
                name: child.val().name,
                fid: child.val().fid
              });
              dispatch({
                type: "GENERATED_REFERER_CODE",
                refererCode: child.val().refererCode
              });
              dispatch({
                type: "SHARE_PROMO",
                fshare: child.val().fshare,
                tshare: child.val().tshare,
                mshare: child.val().mshare
              });
              Actions.reset(userType);
            }
          });
          if (!isExist) {
            dispatch({
              type: "CHECK_USER",
              name: result.name,
              fid: result.id
            });
            Actions.signup();
          }
        });
    });
  };
}

exports.onLogoutFinished = logOut;

export function login(username, password) {
  let isExist = false;
  return (dispatch, getState) => {
    firebase
      .database()
      .ref("users")
      .once("value", snap => {
        snap
          .forEach(child => {
            if (
              username == child.val().username &&
              password == child.val().password
            ) {
              isExist = true;

              Answers.logSignUp("Demo", true, {
                referral: child.val().referalPromo
              });
              dispatch({
                type: "SIGN_UP",
                ...({ userType, email, referalPromo, name } = child.val())
              });
              dispatch({
                type: "USER_ID",
                id: child.key
              });
              dispatch({
                type: "LOGIN",
                username: child.val().username,
                password: child.val().password
              });
              dispatch({
                type: "GENERATED_REFERER_CODE",
                refererCode: child.val().refererCode
              });
              dispatch({
                type: "SHARE_PROMO",
                fshare: child.val().fshare,
                tshare: child.val().tshare,
                mshare: child.val().mshare
              });
              Actions.reset(userType);
            }
          })
          .catch({});
        if (!isExist) {
          dispatch({
            type: "LOGIN",
            username,
            password
          });
          Alert.alert("Sign in failed", "Username or Password is incorrect");
        }
      });
  };
}

function getFacebookProfile(): Promise {
  return new Promise((resolve, reject) => {
    const profileRequest = new GraphRequest(
      "/me",
      {
        parameters: {
          fields: {
            string: "name"
          }
        }
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
    new GraphRequestManager().addRequest(profileRequest).start();
  });
}
