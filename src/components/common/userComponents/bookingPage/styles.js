import commonColor from "../../../../../native-base-theme/variables/commonColor";
import platform from "../../../../../native-base-theme/variables/platform";

const React = require("react-native");

const { Dimensions, Platform } = React;

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default {
  fullButton: {
    height: 55
  },
  pricebtn: {
    backgroundColor: "#fff",
    borderRightWidth: 1,
    borderRightColor: "#ddd"
  },
  fullButton1: {
    height: Platform.OS === "ios" ? 55 : 45
  },
  paybtn: {
    backgroundColor: "#fff"
  }
};
