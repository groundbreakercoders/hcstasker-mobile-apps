import commonColor from "../../../native-base-theme/variables/commonColor";

const React = require("react-native");

const { Dimensions } = React;

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default {
  flatList: {
    flex: null,
    borderColor: "#ddd"
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
    fontWeight: "400"
  },
  modalText: {
    fontSize: 22,
    color: "#43496a",
    marginTop: 10,
    fontWeight: "800"
  }
};
