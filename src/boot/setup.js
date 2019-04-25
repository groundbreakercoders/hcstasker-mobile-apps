import React, { Component } from "react";
import { Provider } from "react-redux";
import Permissions from "react-native-permissions";
import { ActivityIndicator, Platform } from "react-native";
import { Root } from "native-base";
import { PersistGate } from "redux-persist/es/integration/react";
import { StyleProvider } from "native-base";
import firebase from "react-native-firebase";
import getTheme from "../../native-base-theme/components";
import { connect } from "react-redux";
import variables from "../../native-base-theme/variables/platform";
import App from "./App";
import ReduxStore from "../Redux";
import SplashScreen from "react-native-splash-screen";
import platform from "../../native-base-theme/variables/platform";
import UserActions from "../Redux/userstore";

function oncomplete() {}

console.disableYellowBox = true;

const { persistor, store } = ReduxStore(oncomplete(store));

class Setup extends Component {
  constructor() {
    super();
    this.state = {};
  }
  componentWillMount() {
    firebase
      .messaging()
      .hasPermission()
      .then(enabled => {
        if (enabled) {
          // console.log("user has permissions");
        } else {
          console.log("No permissions");
        }

        firebase
          .messaging()
          .requestPermission()
          .then(() => {
            // console.log("User has authorised");
          })
          .catch(error => {
            console.log("User has rejected permissions");
          });
      });
    this.notificationListener = firebase
      .notifications()
      .onNotification(notification => {
        //     console.log('notification', notification);
      });

    this.notificationDisplayedListener = firebase
      .notifications()
      .onNotificationDisplayed(notification => {
        //      console.log("Notification has been displayed");
      });

    this.notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened(notificationOpen => {
        const action = notificationOpen.action;
        const notification = notificationOpen.notification;
      });

    this.messageListener = firebase.messaging().onMessage(message => {
      // console.log("message, data", message._data);

      let notification = new firebase.notifications.Notification();
      notification = notification
        .setNotificationId("notificationId")
        .setTitle(message._data.title)
        .setBody(message._data.body)
        .setSound("bell.mp3")
        .setData({
          key1: "value1",
          key2: "value2"
        });
      notification.android.setPriority(
        firebase.notifications.Android.Priority.High
      );
      notification.android.setChannelId("test-channel");
      notification.android.setVibrate([300]);
      firebase.notifications().displayNotification(notification);

      firebase
        .notifications()
        .getInitialNotification()
        .then(notificationOpen => {
          if (notificationOpen) {
            // App was opened by a notification
            // Get the action triggered by the notification being opened
            const action = notificationOpen.action;
            // Get information about the notification that was opened
            const notification = notificationOpen.notification;

            console.log("App closed", action, notification);
          }
        });
    });

    this.messageListener = firebase.messaging().onMessage(message => {
      // console.log(message._data);
    });
  }

  componentDidMount() {
    Permissions.checkMultiple(["location"]).then(response => {
      if (
        response.camera === "undetermined" ||
        response.photo === "undetermined"
      ) {
      } else if (
        response.location === "undetermined" ||
        response.location === "restricted"
      ) {
        Permissions.request("location", {
          type: "always"
        }).then(response => {});
      }
    });
    SplashScreen.hide();
  }

  componentWillUnmount() {
    this.messageListener();
    this.notificationListener();
    this.notificationDisplayedListener();
    this.notificationOpenedListener();
  }

  render() {
    return (
      <StyleProvider style={getTheme(variables)}>
        <Provider store={store}>
          <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
            <Root>
              <App />
            </Root>
          </PersistGate>
        </Provider>
      </StyleProvider>
    );
  }
}

export default Setup;
