import { StyleSheet, Platform, Dimensions } from "react-native";
const { height, width } = Dimensions.get("window");
import CommonColor from "../../../../native-base-theme/variables/commonColor";
import commonColor from "../../../../native-base-theme/variables/commonColor";

const styles = StyleSheet.create({
    headerText :{
        fontSize: 28,
        fontWeight: "bold",
        color: "white",
        marginTop: 50 
    }
});

export default styles;