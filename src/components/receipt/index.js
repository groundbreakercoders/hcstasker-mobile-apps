import React, { Component } from "react";
import moment from "moment";
import { connect } from "react-redux";
import _ from "lodash";
import {
  View,
  TouchableOpacity,
  Platform,
  TextInput,
  Dimensions
} from "react-native";
import PropTypes from "prop-types";
import {
  Container,
  Text,
  Button,
  Icon,
  Title,
  Thumbnail,
  Left,
  Right,
  Body,
  Content,
  Spinner
} from "native-base";
import { Actions, ActionConst } from "react-native-router-flux";
import TripActions from "../../Redux/tripstore";
import Header from "../common/header";

const deviceWidth = Dimensions.get("window").width;
import styles from "./styles";
import commonColor from "../../../native-base-theme/variables/commonColor";

const profileImage = require("../../assets/image.png");

class Receipt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      review: "",
      rating: null,
      stars: [
        { active: false },
        { active: false },
        { active: false },
        { active: false },
        { active: false }
      ]
    };
  }
  computeRating() {
    let count = 0;
    this.state.stars.forEach(item => {
      if (item.active) {
        count += 1;
      }
    });
    return count;
  }

  rate(index) {
    const rating = index + 1;
    const stateCopy = { ...this.state };
    for (let i = 0; i < 5; i++) {
      if (i === index) {
        stateCopy.stars[i].active = true;
      } else stateCopy.stars[i].active = false;
    }
    this.setState(stateCopy);
    this.setState({ rating: rating });
  }

  submit() {
    this.props.setRating(this.state.rating, this.state.review);
  }

  render() {
    const { strings } = this.props;
    return (
      <Container style={{ backgroundColor: "#fff" }}>
        <Header title="Review & Rating" />
        <Content scrollEnabled style={{ padding: 25 }}>
          {_.get(this.props, "navigation.state.params.status") ===
          "succeeded" ? (
            <Text
              style={{
                alignSelf: "center",
                fontSize: 20,
                color: commonColor.brandPrimary
              }}
            >
              {strings.paymentsuccess}
            </Text>
          ) : null}
          {_.get(this.props, "navigation.state.params.status") === "error" &&
          this.props.paymentMode !== "Cash" ? (
            <Text style={{ alignSelf: "center", fontSize: 20, color: "red" }}>
              {strings.paymentFailed}
            </Text>
          ) : null}
          {this.props.paymentMode === "Cash" ? (
            <Text
              style={{
                alignSelf: "center",
                fontSize: 20,
                color: commonColor.brandPrimary
              }}
            >
              {strings.payCash}
            </Text>
          ) : null}
          <Text style={styles.reviewheadText}>{strings.rateReview}</Text>
          <Text note style={{ fontSize: 16 }}>
            {strings.experience}
          </Text>
          <View
            style={{
              flexDirection: "row",
              paddingVertical: 15,
              justifyContent: "space-between"
            }}
          >
            {this.state.stars.map((item, index) => (
              <Button
                style={
                  item.active ? styles.activeRateButton : styles.rateButton
                }
                bordered
                rounded
                key={index}
                onPress={() => this.rate(index)}
              >
                <Text style={{ paddingLeft: 0, paddingRight: 0 }}>
                  <Icon
                    name="ios-star"
                    style={{
                      margin: 0,
                      fontSize: 22,
                      color: item.active ? "#fff" : commonColor.brandPrimary
                    }}
                  />{" "}
                  <Text
                    style={{
                      color: item.active ? "#fff" : commonColor.brandPrimary
                    }}
                  >
                    {index + 1}
                  </Text>
                </Text>
              </Button>
            ))}
          </View>
          <View
            style={{
              alignItems: "center",
              paddingRight: 0,
              width: Dimensions.get("window").width - 45
            }}
          >
            <TextInput
              style={styles.textArea}
              onChangeText={review => this.setState({ review })}
              placeholder={strings.feedback}
              placeholderTextColor={commonColor.brandPrimary}
              editable={true}
              multiline={true}
              numberOfLines={4}
              selectionColor={commonColor.lightThemePlaceholder}
            />
          </View>
          <Button
            style={{
              alignSelf: "center",
              marginTop: 15,
              width: 150,
              justifyContent: "center",
              backgroundColor: commonColor.brandPrimary
            }}
            rounded
            onPress={() => this.submit()}
          >
            {this.props.loading ? (
              <Spinner color="#fff" />
            ) : (
              <Text style={{ textAlign: "center" }}>{strings.submit}</Text>
            )}
          </Button>
        </Content>
      </Container>
    );
  }
}

Receipt.propTypes = {
  setRating: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    paymentMode: state.paymentMethods.paymentMode,
    rating: state.trip.rating,
    paymentStatus: state.paymentMethods.paymentStatus,
    loading: state.paymentMethods.loading
  };
}

const bindActions = dispatch => ({
  setRating: (rating, review) => dispatch(TripActions.setRating(rating, review))
});

export default connect(
  mapStateToProps,
  bindActions
)(Receipt);
