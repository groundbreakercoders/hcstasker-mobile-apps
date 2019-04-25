import { AppRegistry } from "react-native";
import Setup from "./src/boot/setup";
import bgMessaging from "./src/bgmessaging";

AppRegistry.registerComponent("TaskMan", () => Setup);

AppRegistry.registerHeadlessTask(
  "RNFirebaseBackgroundMessage",
  () => bgMessaging
);
