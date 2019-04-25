import commonColor from "../../../native-base-theme/variables/commonColor";

const React = require("react-native");

const { Dimensions } = React;

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default {
  imageItem: {
    position: "absolute",
    top: 20,
    left: 20,
    height: 40,
    width: 40,
    borderRadius: 20,
    borderBottomWidth: 0,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  mapItem: {
    position: "absolute",
    right: 20,
    bottom: -10,
    backgroundColor: commonColor.brandPrimary,
    height: 60,
    width: 60,
    borderRadius: 30,
    borderBottomWidth: 0,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 1,
    marginLeft: 5,
    marginLight: 5,
    marginTop: 10
  },
  reviewCont: {
    padding: 15,
    marginTop: 10
  },
  readButton: {
    alignSelf: "center",
    borderColor: commonColor.brandPrimary,
    marginVertical: 35,
    width: deviceWidth - 160,
    alignItems: "center",
    justifyContent: "center"
  },
  readText: { color: commonColor.brandPrimary }
};
