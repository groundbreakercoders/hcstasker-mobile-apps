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
    flexDirection: "row",
    marginRight:10
  },
  radioText: {

  },
  textArea: {
    height: 150,
    borderColor: "#000000",
    borderWidth: 2,
    width: Dimensions.get("window").width - 75,
    backgroundColor: 'white',
    padding: 5,
    paddingRight: 0,
    //alignSelf: "center",
    fontSize: 18,
    textAlignVertical: "top",
    marginBottom:10,
  },
  TextInputStyle: {
    textAlign: 'center',
    height: 40,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#009688',
    marginBottom: 10
},inputIOS: {

},
inputAndroid: {

},
inputStyle: {
  height: 40,
  borderColor: 'gray',
  borderWidth: 1,
  flexDirection: "row",
  marginTop: 10,
  borderRadius: 10,
  fontSize:20,
},
container: {
  marginTop: 15,
  flex:1,
  justifyContent: 'flex-start',
  backgroundColor: 'white',
  paddingLeft: 10,
  paddingRight: 10
},
header:{
  fontSize: 24,
  color: '#fff',
  paddingBottom: 10,
  marginBottom: 40
},
textInput:{
  margin:15,
  height: 40,
  color:'#44466B',
  fontWeight: "bold",
  marginBottom:1,
  fontSize: 18,
},
input: {
      margin: 15,
      height: 40,
      marginTop:1,
      borderColor: '#000000',
      borderWidth: 2,
      fontSize: 18,
      fontWeight: "500",
      color: "#44466B",
      padding:5
      //borderBottomWidth: 1,
},
headerStyle: {
  fontSize: 10,
  backgroundColor: "#2196f3",
  justifyContent: 'center',
  alignItems: 'center',
  height: 50,
  shadowColor: '#000',
  shadowOffset: {width:0,height:2},
  shadowOpacity: 0.2
},
topHeader: {
  backgroundColor: "#3cb371",
  height: 100
},
headerContainer: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#e5e5e5"
},
headerStyleText: {
  fontSize: 20,
  textAlign: "center",
  margin: 10,
  fontWeight: "bold"
},
containerbtn: {
    flex: 1,
   flexDirection: 'row',
   alignItems: 'center',
   justifyContent: 'center',
   marginBottom:50
    },
buttonContainer: {
        flex: 1,
},
acceptButton: {
  alignSelf: "center",
  marginTop: 10,
  marginLeft:10,
  marginBottom: 20,
  paddingLeft: 25,
  paddingRight: 25,
  width: width - 250,
  height: 45,
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: commonColor.brandPrimary
},
declineButton: {
  alignSelf: "center",
  marginTop: 10,
  marginLeft:10,
  marginBottom: 20,
  paddingLeft: 25,
  paddingRight: 25,
  width: width - 250,
  height: 45,
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: '#000000'
},
useragreement:{
  margin:15,
  height: 40,
  color:'#44466B',
  fontWeight: "bold",
  marginBottom:1,
  fontSize: 25,
},
});

export default styles;
