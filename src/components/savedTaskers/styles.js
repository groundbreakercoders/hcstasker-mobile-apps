import commonColor from "../../../native-base-theme/variables/commonColor";

const React = require("react-native");

const { Dimensions } = React;

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default {
  card: {
    flexDirection:"row",
    marginTop: 10,
    borderColor: "#fff",
    borderRadius: 0,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 3
  },
  notaskers: {
    alignSelf: "center"
  }
};
