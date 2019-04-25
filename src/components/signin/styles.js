import commonColor from "../../../native-base-theme/variables/commonColor";
import platform from "../../../native-base-theme/variables/platform";

const React = require("react-native");

const { Dimensions, Platform } = React;

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default {
  buttonsView: {
    flex: Platform.OS === "ios" ? 1.3 : 1.3,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around"
  },
  loginButton: {
    width: deviceWidth - 120,
    alignSelf: "center",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: commonColor.brandPrimary,
    elevation: 0
  },
  signupButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#8a8fab",
    alignSelf: "center"
  },
  flatList: {
    flex: null,
    borderColor: "#ddd"
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600"
  },
  signupText: {
    color: "#43496a"
  },
  listItem: {
    borderTopWidth: 1,
    borderColor: "#ddd",
    padding: 15,
    paddingLeft: 0
  },
  listText: {
    color: "#44466B",
    fontSize: 20,
    fontWeight: "500"
  },
  modalText: {
    fontSize: 23,
    color: "#43496a",
    marginTop: 10,
    fontWeight: "800"
  },
  forgotText: {
    fontSize: 16,
    color: "#43496a",
    fontWeight: "bold",
    paddingRight: 0,
    alignSelf: "center",
    alignItems: "center",
    marginTop: Platform.OS === "ios" ? null : -10
  }
};
