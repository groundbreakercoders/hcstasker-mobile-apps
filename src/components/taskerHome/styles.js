import commonColor from "../../../native-base-theme/variables/commonColor";

const React = require("react-native");

const { Dimensions } = React;

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
  locate: {
    backgroundColor: "#fff",
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 100,
    right: 20,
    shadowColor: "#444",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5
  }
};
