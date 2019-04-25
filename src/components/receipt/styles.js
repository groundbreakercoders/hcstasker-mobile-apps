import { Platform, Dimensions } from "react-native";
import commonColor from "../../../native-base-theme/variables/commonColor";

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
  reviewheadText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#43496a",
    paddingBottom: 10
  },
  aHeaderTitle: {
    fontSize: 18,
    fontWeight: "500",
    lineHeight: 26,
    marginTop: -5,
    color: commonColor.brandPrimary
  },
  dateContainer: {
    paddingVertical: Platform.OS === "android" ? 5 : 20,
    alignSelf: "center",
    flexDirection: "row"
  },
  rateButton: {
    width: 60,
    height: 40,
    alignItems: "center",
    justifyContent: "center"
  },
  activeRateButton: {
    width: 60,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: commonColor.brandPrimary
  },
  sideLines: {
    borderBottomWidth: 1,
    width: 50,
    alignSelf: "center",
    borderBottomColor: "#797979"
  },
  summaryText: {
    textAlign: "center",
    padding: 5,
    paddingTop: 0
  },
  amount: {
    textAlign: "center",
    fontSize: 50,
    lineHeight: 50,
    padding: 20,
    paddingVertical: 0
  },
  feedBackBtn: {
    flexDirection: "row",
    alignSelf: "center",
    paddingVertical: 10
  },
  btnText: {
    fontSize: 20,
    alignSelf: "center",
    fontWeight: "bold"
  },
  btnContainer: {
    borderBottomColor: "#eee",
    alignSelf: "center"
  },
  textArea: {
    height: 150,
    color: commonColor.brandPrimary,
    borderColor: "#AEB1C5",
    borderWidth: 1,
    width: Dimensions.get("window").width - 55,
    backgroundColor: "#fff",
    padding: 10,
    paddingRight: 0,
    alignSelf: "center",
    fontSize: 17,
    textAlignVertical: "top"
  }
};
