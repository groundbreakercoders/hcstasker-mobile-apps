import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import firebase from "react-native-firebase";
import {
  Text,
  Button,
  View,
  Grid,
  Col,
  Left,
  Right,
  Body,
  Thumbnail,
  Icon
} from "native-base";
import {
  TouchableOpacity,
  Modal,
  ImageBackground,
  Dimensions,
  Platform,
  StyleSheet,
  Image
} from "react-native";
import TripActions from "../Redux/tripstore";
import UserActions from "../Redux/userstore";
import DriverActions from "../Redux/driverstore";
import commonColor from "../../native-base-theme/variables/commonColor";
import _ from "lodash";
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  fullButton: {
    flex: 1,
    height: 55,
    alignItems: "center",
    justifyContent: "center"
  },
  reject: {
    backgroundColor: "#fff"
  },
  accept: {
    backgroundColor: commonColor.brandPrimary
  }
});

class AcceptDrive extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sec: 10
    };
  }

  componentDidMount() {
    let interValID = setInterval(() => {
      this.setState({
        sec: this.state.sec - 1
      });
      if (this.state.sec < 0) {
        this.setState({
          sec: 0
        });
        this.props.setStatuses();
        clearInterval(interValID);
      }
    }, 1000);
    this.setState({
      interValID
    });
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

  componentWillUnmount() {
    this.setState({
      sec: 0
    });
    clearInterval(this.state.interValID);
  }

  render() {
    const { userDetails, strings } = this.props;
    return (
      <View>
        <Modal
          visible={this.props.modalVisible}
          animationType="fade"
          onRequestClose={() => this.props.showAcceptModal(false)}
          transparent
        >
          <View
            style={{
              position: "absolute",
              left: 25,
              right: 25,
              bottom: 80,
              height: "40%",
              flex: 1,
              flexDirection: "column",
              width: deviceWidth - 50,
              backgroundColor: "#fff"
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                borderBottomWidth: 1,
                borderColor: "#F2F2F2"
              }}
            >
              <Text
                style={{
                  color: commonColor.brandPrimary,
                  fontSize: 30,
                  fontWeight: "bold",
                  marginLeft: 10
                }}
              >
                00:{this.state.sec} <Text note>{strings.seconds}</Text>
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                padding: 15,
                flex: 1.5,
                borderBottomWidth: 1,
                borderBottomColor: "#ddd"
              }}
            >
              <Left
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-around"
                }}
              >
                {_.get(userDetails, "userData.profileUrl") ? (
                  <Image
                    source={{ uri: _.get(userDetails, "userData.profileUrl") }}
                    style={{ width: 80, height: 80, borderRadius: 40 }}
                  />
                ) : (
                  <Icon
                    name="md-contact"
                    style={{ fontSize: 70, color: commonColor.brandPrimary }}
                  />
                )}
                <View style={{ marginTop: 15 }}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                      color: "#44466B"
                    }}
                  >
                    {_.get(userDetails, "userData.name", "User")}
                  </Text>
                  <Text note style={{ marginTop: 5, color: "#8B8DAC" }}>
                    <Icon
                      name="ios-pin"
                      style={{ fontSize: 18, color: "#8B8DAC" }}
                    />{" "}
                    {this.getDistanceFromLatLonInKm(
                      _.get(userDetails, "taskDetails.taskerLoc._latitude"),
                      _.get(userDetails, "taskDetails.taskerLoc._longitude"),
                      _.get(userDetails, "taskDetails.userLoc.latitude"),
                      _.get(userDetails, "taskDetails.userLoc.longitude")
                    )}{" "}
                    {"km away"}
                  </Text>
                </View>
              </Left>
              <Right style={{ flex: 0.5 }}>
                <Text style={{ color: commonColor.brandPrimary }}>
                  {_.get(userDetails, "taskDetails.category", "Category")}
                </Text>
              </Right>
            </View>
            <View
              style={{
                flexDirection: "row",
                backgroundColor: "#fff",
                height: 55,
                zIndex: 1000
              }}
            >
              <TouchableOpacity
                style={[styles.fullButton, styles.reject]}
                onPress={() => {
                  this.props.rejectBooking();
                }}
              >
                <Text style={{ color: commonColor.brandPrimary }}>
                  {strings.reject}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.fullButton, styles.accept]}
                onPress={() => {
                  this.props.acceptTrip();
                }}
              >
                <Text style={{ color: "#fff" }}>{strings.accept}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

AcceptDrive.propTypes = {};

AcceptDrive.defaultProps = {};

const mapStateToProps = state => ({
  status: state.trip.status,
  price: state.trip.price,
  user: state.user,
  isOutOfReach: state.trip.isOutOfReach,
  notFound: state.trip.notFound,
  taskerFound: state.trip.taskerFound,
  modalVisible: state.user.modalVisible,
  userDetails: state.user.userDetails,
  details: state.trip.details
});

const bindActions = dispatch => ({
  acceptTrip: () => dispatch(TripActions.acceptTrip()),
  rejectBooking: () => dispatch(TripActions.rejectBooking()),
  showAcceptModal: bool => dispatch(UserActions.showAcceptModal(bool)),
  tripStatusSet: status => dispatch(UserActions.tripStatusSet(status)),
  setStatuses: () => dispatch(TripActions.setStatuses())
});

export default connect(
  mapStateToProps,
  bindActions
)(AcceptDrive);
