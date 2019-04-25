import React, { Component } from "react";
import {
  Button,
  Text,
  Icon,
  Container,
  Content,
  Spinner,
  Thumbnail,
  Item
} from "native-base";
import { Dimensions, View, Image } from "react-native";
import { AccessToken, LoginManager } from "react-native-fbsdk";
import { connect } from "react-redux";
import _ from "lodash";
import moment from "moment";
import { Actions } from "react-native-router-flux";
import UserActions from "../../Redux/userstore";
import PaymentActions from "../../Redux/paymentmethodsstore";
import commonColor from "../../../native-base-theme/variables/commonColor";
import styles from "./styles";

const { height } = Dimensions.get("window");

class PayTasker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
      taskAmount: null,
      disableLoginButton: false
    };
  }
  calculateFare(task) {
    var amount = 0;
    const hours1 = new Date(task.taskStartTime);
    const hours2 = new Date(task.taskEndTime);
    const minutes = Math.abs(hours2.getMinutes() - hours1.getMinutes());
    const Thours = Math.abs(hours2.getHours() - hours1.getHours());
    if (Thours === 0) {
      amount = task.fee;
      return amount;
    } else {
      amount = task.fee * Thours;
      minAmount = (minutes * task.fee) / 60;
      const amt = Math.ceil(amount + minAmount);
      return amt;
    }
  }
  charge(Details) {
    if (this.props.paymentMode === null) {
      alert("Please select payment method");
    } else {
      this.props.chargeCustomer({ amount: this.calculateFare(Details) });
    }
  }

  render() {
    const { taskerDetails, strings } = this.props;
    return (
      <Container>
        <Content scrollEnabled style={{ backgroundColor: "#fff" }}>
          <View style={styles.contentView}>
            <View style={{ flexDirection: "column", marginTop: 20 }}>
              <Text
                style={{ fontSize: 30, fontWeight: "bold", color: "#43496a" }}
              >
                Payment
              </Text>
              <View style={{ flexDirection: "row", marginTop: 15 }}>
                {_.get(taskerDetails, "taskerData.profileUrl") ? (
                  <Image
                    source={{
                      uri: _.get(taskerDetails, "taskerData.profileUrl")
                    }}
                    style={{ width: 80, height: 80, borderRadius: 40 }}
                  />
                ) : (
                  <Icon
                    name="md-contact"
                    style={{ fontSize: 70, color: commonColor.brandPrimary }}
                  />
                )}
                <Text
                  style={{
                    fontSize: 30,
                    fontWeight: "bold",
                    color: "#43496a",
                    alignSelf: "center",
                    marginLeft: 30
                  }}
                >
                  {_.get(taskerDetails, "taskerData.name", "Tasker")}
                </Text>
              </View>
              <View style={styles.listView}>
                <Text style={styles.listText}>{strings.date}</Text>
                <Text style={styles.listText}>
                  {moment(_.get(taskerDetails, "taskDetails.taskDate")).format(
                    "MMM Do YY"
                  )}
                </Text>
              </View>
              <View style={styles.listView}>
                <Text style={styles.listText}>{strings.time}</Text>
                <Text style={styles.listText}>
                  {moment(
                    _.get(taskerDetails, "taskDetails.taskStartTime")
                  ).format("LT")}{" "}
                  -{" "}
                  {moment(
                    _.get(taskerDetails, "taskDetails.taskEndTime")
                  ).format("LT")}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  padding: 15
                }}
              >
                <Text style={styles.listText}>{strings.services}</Text>
                <Text style={styles.listText}>{strings.price}</Text>
              </View>
              <View style={styles.listView}>
                <Text style={{ color: "#8B8DAC" }}>
                  {_.get(taskerDetails, "taskDetails.category", "--")}
                </Text>
                <Text style={{ color: "#8B8DAC" }}>
                  ${_.get(taskerDetails, "taskDetails.fee", "--")}
                  /h
                </Text>
              </View>
              <View style={styles.listView}>
                <Text style={styles.listText}>{strings.total}</Text>
                <Text style={styles.listText}>
                  {this.calculateFare(taskerDetails.taskDetails)}
                </Text>
              </View>
              <Item
                onPress={() => Actions.PaymentPage()}
                style={styles.listView}
              >
                <Text style={styles.listText}>{strings.paymentmethod}</Text>
                <Text style={styles.listText}>
                  {this.props.paymentMode || "Select >"}
                </Text>
              </Item>
            </View>
            <Button
              rounded
              style={[styles.loginButton, styles.signupButton]}
              onPress={() => this.charge(taskerDetails.taskDetails)}
            >
              {this.props.loading ? (
                <Spinner color="#fff" />
              ) : (
                <Text style={[styles.buttonText, styles.signupText]}>
                  {strings.pay}
                </Text>
              )}
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  taskerDetails: state.user.taskerDetails,
  paymentMode: state.paymentMethods.paymentMode,
  loading: state.paymentMethods.loading
});

const bindActions = dispatch => ({
  chargeCustomer: values => dispatch(PaymentActions.chargeCustomer(values))
});

export default connect(
  mapStateToProps,
  bindActions
)(PayTasker);
