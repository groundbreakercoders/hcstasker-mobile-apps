import React from "react";
import { LoginButton, AccessToken, LoginManager } from "react-native-fbsdk";
import PropTypes from "prop-types";
import { Alert } from "react-native";
import { connect } from "react-redux";
import UserActions from "../Redux/userstore";

const FacebookButton = props => (
  <LoginButton
    readPermissions={["public_profile"]}
    onLoginFinished={(error, result) => {
      if (error) {
        LoginManager.logOut();
        Alert.alert(`login has error: ${result.error}`);
      } else if (result.isCancelled) {
        Alert.alert("login is cancelled.");
      } else {
        AccessToken.getCurrentAccessToken().then(data => {
          props.onLoginFinished(error, data.accessToken.toString());
        });
      }
    }}
    onLogoutFinished={() => props.logOut()}
  />
);

FacebookButton.propTypes = {
  logOut: PropTypes.func.isRequired,
  onLoginFinished: PropTypes.func.isRequired
};

function bindActions(dispatch) {
  return {
    onLoginFinished: (error, result) =>
      dispatch(UserActions.onLoginFinished(error, result)),
    logOut: () => dispatch(UserActions.logOut())
  };
}

export default connect(
  null,
  bindActions
)(FacebookButton);
