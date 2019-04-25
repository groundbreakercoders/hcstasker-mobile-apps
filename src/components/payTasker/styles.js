import commonColor from "../../../native-base-theme/variables/commonColor";

const React = require("react-native");

const { Dimensions, Platform } = React;

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default {
  contentView: {
    flex: 1,
    flexDirection: "column",
    paddingHorizontal: 20,
    paddingBottom: 50
  },
  headerView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10
  },
  arrowIcon: {
    fontSize: 35,
    marginLeft: 0,
    color: "#43496a"
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
    marginTop: 20,
    backgroundColor: commonColor.brandPrimary,
    borderWidth: 1,
    borderColor: "#8a8fab",
    alignSelf: "center"
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
    alignSelf: "center"
  },
  signupText: {
    color: "#fff",
    alignSelf: "center"
  },
  listView: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    padding: 15
  },
  listText: {
    color: "#44466B"
  }
};
