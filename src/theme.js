import { Dimensions, Platform } from "react-native";

export const guide = {
  colors: {
    primary: "#2c2c2c",
    secondary: "#fff",
    active: "#28ae7b",
    destructive: "#b20000",
    error: "#ff0033"
  },
  components: {
    map: {
      latLngDelta: {
        latitudeDelta: 0.00922,
        longitudeDelta: 0.00421
      }
    }
  },
  style: {
    map: {
      flex: 1,
      zIndex: -1
    }
  }
};

export const window = Platform.select({
  ios: () => Dimensions.get("window"),
  android: () => Dimensions.get("window")
})();
