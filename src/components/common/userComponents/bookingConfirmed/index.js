import React, { Component } from "react";
import moment from "moment";
import { connect } from "react-redux";
import _ from "lodash";
import {
  View,
  TouchableOpacity,
  Platform,
  TextInput,
  Dimensions,
  Image
} from "react-native";
import PropTypes from "prop-types";
import {
  Container,
  Text,
  Button,
  Icon,
  Title,
  CheckBox,
  Thumbnail,
  Left,
  Right,
  Body,
  Content,
  Spinner
} from "native-base";
import { Actions, ActionConst } from "react-native-router-flux";

import styles from "./styles";
import commonColor from "../../../../../native-base-theme/variables/commonColor";

class BookingConfirmed extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  deg2rad(deg) {
    return deg * (Math.PI / 180);
  }
  getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the earth in km
    const dLat = this.deg2rad(lat2 - lat1); // deg2rad below
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) *
        Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return Math.ceil(d);
  }

  render() {
    console.log(this.props.taskerDetails,"TakerDetails BookingConfirm")
    const { taskerDetails } = this.props;
    return (
      <View style={{ flex: 3, flexDirection: "column" }}>
        <View
          style={
            {
              flex: 0.8,
              backgroundColor: "#fff",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              borderBottomWidth: 0.5,
              borderBottomColor: "#44466B"
            } 
          }
        >
          {this.props.tripStatus === "onTrip" ? (
            <Text style={{ color: "#44466B", fontSize: 20 }}>
              Tasker will reach in few min.
            </Text>
          ) : (
            <View style={{ flexDirection: "row" }}>
              <Text style={{ color: "#44466B" }}>Booking Confirmed</Text>
              <CheckBox checked color="#00B852" />
            </View>
          )}
        </View>
        <View
          style={{
            flex: Platform.OS === "ios" ? 2 : 2.3,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-around",
              paddingHorizontal: 20,
              paddingVertical: Platform.OS === "ios" ? 10 : null
            }}
          >
            <View style={{ flex: 1, flexDirection: "row" }}>
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
                  style={{
                    fontSize: 70,
                    color: commonColor.brandPrimary
                  }}
                />
              )}
              <View
                style={{
                  flexDirection: "column",
                  paddingVertical: 10,
                  paddingLeft: 15
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    color: "#44466B",
                    fontWeight: "500",
                    paddingVertical: 5
                  }}
                >
                  {_.get(this.props, "taskerDetails.taskerData.name", "Nmae")}
                </Text>
                <Text note style={{ color: "#8B8DAC", fontSize: 15 }}>
                  {this.getDistanceFromLatLonInKm(
                    _.get(taskerDetails, "taskDetails.taskerLoc._latitude"),
                    _.get(taskerDetails, "taskDetails.taskerLoc._longitude"),
                    _.get(taskerDetails, "taskDetails.userLoc.latitude"),
                    _.get(taskerDetails, "taskDetails.userLoc.longitude")
                  )}{" "}
                  {"km away"}
                </Text>
              </View>
            </View>
            <Right
              style={
                {
                  flex: 0.4,
                  justifyContent: "center",
                  alignItems: "center"
                }
              }
            >
              <Text
                style={{
                  color: commonColor.brandPrimary,
                  fontSize: 20,
                  fontWeight: "bold",
                  marginTop: -5
                }}
              >
                {" "}
                $ {_.get(taskerDetails, "taskDetails.fee", "fee")} /h
              </Text>
            </Right>
          </View>
        </View>
      </View>
    );
  }
}

BookingConfirmed.propTypes = {};

function mapStateToProps(state) {
  return {
    tripStatus: state.user.tripStatus,
    taskerDetails: state.user.taskerDetails
  };
}

const bindActions = dispatch => ({});

export default connect(
  mapStateToProps,
  bindActions
)(BookingConfirmed);
