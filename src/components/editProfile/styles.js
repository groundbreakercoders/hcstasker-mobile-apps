import commonColor from "../../../native-base-theme/variables/commonColor";

const React = require("react-native");

const { Dimensions } = React;

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default {
  imageItem: {
    position: "absolute",
    top: 20,
    left: 20,
    height: 40,
    width: 40,
    borderRadius: 20,
    borderBottomWidth: 0,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center"
  },
  eidtpic: {
    position: "absolute",
    bottom: 20,
    right: 20,
    height: 30,
    width: 30,
    borderRadius: 15,
    borderBottomWidth: 0,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
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
