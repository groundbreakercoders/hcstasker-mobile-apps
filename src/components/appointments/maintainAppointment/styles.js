import { StyleSheet, Platform, Dimensions } from "react-native";
const { height, width } = Dimensions.get("window");
import CommonColor from "../../../../native-base-theme/variables/commonColor";
import commonColor from "../../../../native-base-theme/variables/commonColor";

const styles = StyleSheet.create({
  dropdown_2: {
    width: width - 30,
    marginTop: 10,
    right: 8,
    borderBottomWidth: 1,
    borderColor: "#8B8DAC",
    borderRadius: 3
  },
  addIcon: {
    borderBottomWidth: 0,
    backgroundColor: CommonColor.brandPrimary,
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  addIconStyle: {
    paddingRight: 0,
    color: "#fff",
    fontSize: 12
  },
  listText: {
    color: "#888",
    marginLeft: 15
  },
  dropdown_2_text: {
    marginVertical: 10,
    marginHorizontal: 6,
    fontSize: 18,
    color: "#8B8DAC"
  },
  dropdown_2_dropdown: {
    width: width - 30,
    height: 85
  },
  dropdownText: {
    fontSize: 18,
    color: "#8B8DAC"
  },
  updateButton: {
    alignSelf: "center",
    marginTop: 40,
    paddingLeft: 25,
    paddingRight: 25,
    width: width - 200,
    height: 45,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: commonColor.brandPrimary
  },
  buttonText: {
    color: "#fff",
    fontSize: 20
  },
  radioButton: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  radioText: {

  },
  textArea: {
    height: 150,
    borderColor: "#AEB1C5",
    borderWidth: 1,
    width: Dimensions.get("window").width - 55,
    backgroundColor: "#fff",
    padding: 10,
    paddingRight: 0,
    alignSelf: "center",
    fontSize: 17,
    textAlignVertical: "top",
    marginBottom:10
  },
  TextInputStyle: {
    textAlign: 'center',
    height: 40,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#009688',
    marginBottom: 10
}  
});

export default styles;
