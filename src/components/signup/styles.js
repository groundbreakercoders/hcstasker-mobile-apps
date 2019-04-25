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
  loginButton: {
    marginTop: 30,
    width: deviceWidth - 100,
    alignSelf: "center",
    height: 50,
    backgroundColor: commonColor.brandPrimary
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff"
  },
  inputView: {
    marginTop: 10
  }
};
