const React = require("react-native");

const { Dimensions } = React;

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default {
  itemstyle: {
    height: 80,
    borderColor: "#c2c6da"
  },
  pickerStyle: {
    width: deviceWidth,
    color: "#c2c6da"
  },
  customStyles: {
    dateInput: {
      borderWidth: 0,
      height: null,
      alignItems: "flex-start"
    },
    dateText: {
      fontSize: 24,
      color: "#44466B"
    }
  }
};
