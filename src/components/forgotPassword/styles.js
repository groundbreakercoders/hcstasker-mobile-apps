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
  flatList: {
    flex: null,
    borderColor: "#ddd"
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
  }
};
