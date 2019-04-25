import commonColor from "../../../native-base-theme/variables/commonColor";
import { Dimensions, Platform } from "react-native";
import platform from "../../../native-base-theme/variables/platform";

const { width, height } = Dimensions.get("window");
export default {
  iosHeader: {
    backgroundColor: "#fff"
  },
  aHeader: {
    backgroundColor: "#fff",
    borderColor: "#aaa",
    elevation: 3
  },
  iosHeaderTitle: {
    fontSize: 18,
    fontWeight: "500",
    color: commonColor.brandPrimary
  },
  aHeaderTitle: {
    fontSize: 18,
    fontWeight: "500",
    lineHeight: 26,
    marginTop: -5,
    color: commonColor.brandPrimary
  },
  textDay: {
    textAlign: "center",
    fontWeight: "400",
    fontSize: Platform.OS === "ios" ? 16 : 14,
    color: "#8a8fab"
  },
  textEarnings: {
    fontWeight: "400",
    fontSize: Platform.OS === "ios" ? 20 : 15,
    paddingTop: 10,
    color: "#44466B"
  },
  textHeading: {
    fontWeight: "400",
    fontSize: 13,
    color: "#8a8fab"
  },
  textValue: {
    fontWeight: "600",
    fontSize: 13,
    color: "#44466B",
    marginTop: 5
  },
  Cardwrapper: {
    flexDirection: "column",
    alignItems: "flex-end",
    alignSelf: "center",
    marginTop: 10,
    padding: 40,
    flex: 1
  },
  cardEarnings: {
    height: null,
    width: width - 30,
    left: -2,
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 0
  },
  CardItemEarnings: {
    width: (width - 20) / 4 - 6,
    flexDirection: "column",
    alignItems: "center",
    paddingLeft: Platform.os === "ios" ? 15 : 10,
    paddingRight: Platform.os === "ios" ? 15 : 10,
    paddingTop: 20,
    paddingBottom: 20
  },
  historyCard: {
    width: null,
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    borderRadius: 4,
    borderWidth: 0.3,
    borderColor: "#ccc"
  },
  historyCardItem: {
    flexDirection: "column",
    alignItems: "center",
    paddingLeft: 5,
    paddingRight: 0,
    paddingTop: 20,
    paddingBottom: 20
  }
  
};
