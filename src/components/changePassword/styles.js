import commonColor from "../../../native-base-theme/variables/commonColor";

const React = require("react-native");

const { Dimensions } = React;

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default {
  buttonsView: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around"
  },
  bookButton: {
    marginVertical: 30,
    borderColor: commonColor.brandSecondary,
    width: deviceWidth - 130,
    height: 45,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center"
  },
  buttonText: {
    color: commonColor.brandSecondary,
    fontWeight: "bold",
    fontSize: 16
  }
};
