import commonColor from "../../../native-base-theme/variables/commonColor";
import platform from "../../../native-base-theme/variables/platform";

const React = require("react-native");

const { Dimensions, Platform } = React;

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default {
  map: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#fff"
  },
  icon: {
    color: commonColor.brandPrimary,
    fontWeight: "bold",
    alignSelf: "center",
    paddingRight: 0
  },
  activeIcon: {
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    paddingRight: 0
  },
  fullButton: {
    height: 55
  },
  fullButton1: {
    height: Platform.OS === "ios" ? 55 : 45
  },
  bookLater: {
    backgroundColor: commonColor.brandPrimary
  },
  bookNow: {
    backgroundColor: commonColor.brandSecondary
  },
  halfbtn: {
    backgroundColor: "#fff"
  },
  paybtn: {
    backgroundColor: "#fff"
  },
  pricebtn: {
    backgroundColor: "#fff",
    borderRightWidth: 1,
    borderRightColor: "#ddd"
  },
  locate: {
    backgroundColor: "#fff",
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 30,
    right: 20,
    shadowColor: "#444",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5
  },
  card: {
    marginTop: 15,
    borderColor: "#fff",
    height: null,
    width: deviceWidth,
    borderRadius: 0,
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0
  }
};
