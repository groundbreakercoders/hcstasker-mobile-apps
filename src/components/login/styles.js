import commonColor from "../../../native-base-theme/variables/commonColor";

const React = require("react-native");

const { Dimensions, Platform } = React;

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default {
  contentView: {
    flex: 1,
    flexDirection: "column",
    paddingHorizontal: 20
  },
  headerView: {
    flexDirection: "row",
    justifyContent: "space-between",
    //marginTop: 20
  },
  buttonsView: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around"
  },
  arrowIcon: {
    fontSize: 35,
    marginLeft: 0,
    color: "#43496a"
  },
  forgotText: {
    fontSize: 16,
    color: "#43496a",
    fontWeight: "bold",
    paddingRight: 0
  },
  formView: { flexDirection: "column", marginTop: 10 },
  signinText: { fontSize: 30, fontWeight: "bold", color: "#43496a"},
  orText: {
    fontSize: 16,
    color: "#43496a",
    fontWeight: "bold",
    marginTop: Platform.OS === "ios" ? 50 : 20,
    alignSelf: "center"
  },
  loginButton: {
    marginTop: 30,
    width: deviceWidth - 100,
    alignSelf: "center",
    height: 50,
    justifyContent: "center",
    backgroundColor: commonColor.brandPrimary
  },
  facebook: {
    backgroundColor: "#3B579D"
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
  google: {
    backgroundColor: "#EF2F23"
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff"
  },
  formItem: {
    marginTop:1,
    height: 56,
    padding: 10,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderColor: "#c2c6da",
    borderRadius: 28
  }
};
