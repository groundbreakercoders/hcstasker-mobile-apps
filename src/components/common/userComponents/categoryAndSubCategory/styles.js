import commonColor from "../../../../../native-base-theme/variables/commonColor";
import platform from "../../../../../native-base-theme/variables/platform";

const React = require("react-native");

const { Dimensions, Platform } = React;

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default {
  contentContainer: {
    flexGrow: 1,
    width: undefined,
    paddingRight: 15,
    backgroundColor: "#f4f4f6",
    justifyContent: "space-between"
  },
  scrollviewButton: {
    paddingTop: 5,
    alignSelf: "center"
  },
  activeText: {
    color: commonColor.brandPrimary
  },
  catText: { color: "#8B8DAC" },
  contentContainer1: {
    flexGrow: 1,
    width: undefined,
    paddingRight: 15,
    justifyContent: "space-between"
  },
  iconView: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 40,
    marginTop: 5,
  },
  iconItem: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    width: 46,
    height: 46,
    borderRadius: 23,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: commonColor.brandPrimary
  },
  activeIconItem: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: commonColor.brandPrimary,
    width: 46,
    height: 46,
    borderRadius: 23,
    borderBottomWidth: 0
  },
  icon: {
    color: commonColor.brandPrimary,
    fontWeight: "bold",
    alignSelf: "center",
    paddingRight: 0
  },
  activeIcon: {
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    paddingRight: 0
  },
  categoryText: {
    color: "#8B8DAC",
    paddingTop: 5,
    fontSize: 14
  }
};
