import commonColor from "../../../native-base-theme/variables/commonColor";

const React = require("react-native");

const { Dimensions } = React;

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default {
  cardSelect: {
    padding: 10,
    marginTop: 0,
    paddingLeft: 0
  },
  payCard: {
    flexDirection: "row",
    paddingLeft: 20,
    marginTop: 0,
    paddingVertical: 10,
    backgroundColor: commonColor.brandPrimary
  }
};
