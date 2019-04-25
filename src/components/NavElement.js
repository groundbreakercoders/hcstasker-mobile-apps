import React from "react";
import { Actions } from "react-native-router-flux";
import { Icon, Button } from "native-base";
import { Platform } from "react-native";
import MIcon from "./common/mIcon";

export default class NavElement {
  static BackButton = () => (
    <Button transparent onPress={Actions.pop}>
      <Icon
        style={{ color: "#000", fontSize: 24, fontWeight: "bold" }}
        name="arrow-back"
      />
    </Button>
  );

  static CloseButton = () => (
    <Button
      transparent
      onPress={Actions.pop}
      style={{ marginTop: Platform.OS === "ios" ? null : 5 }}
    >
      <MIcon
        family="Ionicons"
        name="close"
        style={{ fontSize: 20, fontWeight: "400", color: "#000" }}
      />
    </Button>
  );

  static SidebarIcon = () => <Icon name="menu" />;

  static AddIcon = () => (
    <Button
      transparent
      onPress={() => Actions.addCardModal()}
      style={{ marginTop: Platform.OS === "ios" ? null : 5 }}
    >
      <MIcon
        family="Ionicons"
        name="add"
        style={{ fontSize: 20, fontWeight: "400" }}
      />
    </Button>
  );

  static EditIcon = () => <Icon name="create" />;
}
