import commonColor from "../../../native-base-theme/variables/commonColor";

const React = require("react-native");

const { Dimensions } = React;

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default {
  card: {
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#ddd'
  },
  cardCardItem: {
    paddingTop: 5,
    paddingBottom: 5,
    height: 125
  },
  cardCardItemView: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'stretch'
    },
    fullButton: {
      height: 55
    },
    pricebtn: {
      backgroundColor: "#fff",
      borderRightWidth: 1,
      borderRightColor: "#ddd"
    }
};
