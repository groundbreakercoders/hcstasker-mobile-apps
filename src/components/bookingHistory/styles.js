import commonColor from "../../../native-base-theme/variables/commonColor";

const React = require("react-native");

const { Dimensions } = React;

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default {
  card: {
    flex: 0,
    borderColor: "#fff",
    height: 120,
    paddingLeft: 10,
    width: deviceWidth,
    borderRadius: 0,
    shadowColor: "#000",
    shadowOffset: { width: 3, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 3
  },
  heart: {
    color: commonColor.brandPrimary
  }
};
