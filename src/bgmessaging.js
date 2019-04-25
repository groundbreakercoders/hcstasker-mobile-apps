import firebase, { RemoteMessage } from "react-native-firebase";

export default async message => {
  let notification = new firebase.notifications.Notification();
  notification = notification
    .setNotificationId("notificationId")
    .setTitle(message.data.title)
    .setBody(message.data.body)
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
  return Promise.resolve();
};
