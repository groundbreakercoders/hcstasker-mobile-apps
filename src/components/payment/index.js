import React, { Component } from "react";
import {
  Button,
  Text,
  Icon,
  Container,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Left,
  Right,
  Body,
  CheckBox
} from "native-base";
import { Dimensions, View, TouchableOpacity, Platform } from "react-native";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import PaymentActions from "../../Redux/paymentmethodsstore";
import styles from "./styles";

const { height } = Dimensions.get("window");

class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  setPaymentMode(mode) {
    this.props.setPaymentMethod(mode);
  }
  render() {
    const { strings } = this.props;
    return (
      <Container>
        <Content style={{ backgroundColor: "#fff" }}>
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              paddingHorizontal: 20
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 20
              }}
            >
              <Button
                style={{ paddingLeft: 0 }}
                transparent
                onPress={() => Actions.pop()}
              >
                <Icon
                  name="ios-arrow-back"
                  style={{
                    fontSize: 35,
                    marginLeft: 0,
                    color: "#43496a"
                  }}
                />
              </Button>
            </View>
            <View
              style={{
                flexDirection: "column",
                marginTop: Platform.OS === "ios" ? 25 : 15
              }}
            >
              <Text
                style={{ fontSize: 28, fontWeight: "400", color: "#43496a" }}
              >
                {strings.payment}
              </Text>
            </View>

            <View>
              <View style={styles.cardSelect}>
                <Text
                  style={{ fontSize: 16, fontWeight: "400", color: "#43496a" }}
                >
                  {strings.howtopay}
                </Text>
              </View>
              <View style={{ paddingHorizontal: 0 }}>
                <TouchableOpacity
                  style={{
                    ...styles.payCard,
                    borderTopLeftRadius: 4,
                    borderTopRightRadius: 4,
                    borderBottomWidth: 0.5,
                    borderBottomColor: "#eee"
                  }}
                  onPress={() => {
                    this.setPaymentMode("Card");
                    Actions.paymentsModal({
                      selectOnly: true,
                      onPaymentMethodSelect: () => {
                        Actions.pop();
                        Actions.pop();
                      }
                    });
                  }}
                >
                  <Icon
                    name="ios-card"
                    style={{ fontSize: 40, color: "#eee" }}
                  />
                  <Text
                    style={{
                      marginLeft: 20,
                      marginTop: 8,
                      color: "#eee",
                      fontWeight: "bold"
                    }}
                  >
                    {strings.card}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    ...styles.payCard,
                    borderBottomLeftRadius: 4,
                    borderBottomRightRadius: 4
                  }}
                  onPress={() => {
                    this.setPaymentMode("Cash");
                    Actions.pop();
                  }}
                >
                  <Icon
                    name="ios-cash"
                    style={{ fontSize: 40, color: "#eee" }}
                  />
                  <Text
                    style={{
                      marginLeft: 20,
                      marginTop: 8,
                      color: "#eee",
                      fontWeight: "bold"
                    }}
                  >
                    {strings.cash}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}

const bindActions = dispatch => ({
  setPaymentMethod: mode => dispatch(PaymentActions.setPaymentMethod(mode))
});
export default connect(
  null,
  bindActions
)(Payment);
