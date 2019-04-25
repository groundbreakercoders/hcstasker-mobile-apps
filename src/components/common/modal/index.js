import React from "react";
import { View, Spinner, Text } from "native-base";
import { Dimensions } from "react-native";
import Modal from "react-native-modal";
const { height, width } = Dimensions.get("window");

const CustomModal = props => {
  const { fetchTaskers, strings, Visible } = props;
  return (
    <Modal
      animationType="fade"
      backdropColor="#000"
      backdropOpacity={0.5}
      isVisible={fetchTaskers || Visible}
    >
      {fetchTaskers ? (
        <View
          style={{
            height: height,
            backgroundColor: "transparent",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <View
            style={{
              width: width - 50,
              padding: 10,
              backgroundColor: "#fff",
              opacity: 0.7,
              borderRadius: 25,
              alignItems: "center"
            }}
          >
            <Text style={{ color: "#6f85ff", fontSize: 18 }}>
              {strings.fetchTaskers}
            </Text>
            <Spinner />
          </View>
        </View>
      ) : (
        <View>
          <Spinner />
        </View>
      )}
    </Modal>
  );
};

export default CustomModal;
