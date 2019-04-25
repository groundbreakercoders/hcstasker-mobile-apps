import commonColor from "../../../../native-base-theme/variables/commonColor";

const React = require("react-native");

const { Dimensions } = React;

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default {
  fullButton: {
    flex: 1,
    height: 55,
    alignItems: "center",
    justifyContent: "center"
  },
  bookLater: {
    backgroundColor: commonColor.brandPrimary
  },
  bookNow: {
    backgroundColor: commonColor.brandSecondary
  },
  cancelTaksBtn: {
    backgroundColor: "#6f85ff"
  },
  btnText: {
    color: "#fff",
    
  },
  cancelbtn: {
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#C2C5DB"
  },
  btnTextCancel: {
    color: "#C2C5DB",
    fontSize: 20
  }
};
