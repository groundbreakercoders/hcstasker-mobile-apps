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
    paddingTop: 30,
    paddingBottom: 30,
    height: 125
  },
  cardCardItemView: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'stretch'
    }

};
