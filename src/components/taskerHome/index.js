import React, { Component } from "react";
import {
  Button,
  Text,
  Container,
  Content,
  Item,
  Input,
  Icon,
  CheckBox,
  Card,
  CardItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Spinner
} from "native-base";
import {
  Dimensions,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
  Platform
} from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import _ from "lodash";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import firebase from "react-native-firebase";
import Communications from "react-native-communications";
import { Actions } from "react-native-router-flux";
import UserActions from "../../Redux/userstore";
import PaymentActions from "../../Redux/paymentmethodsstore";
import TripActions from "../../Redux/tripstore";
import DriverActions from "../../Redux/driverstore";
import MIcon from "../common/mIcon";
import { guide, window } from "../../theme";
import SearchLocation from "../common/searchLocatioon";
import data from "../../utils/data";
import AcceptTask from "../acceptdrive";
import { getDirection } from "../../utils/userutils";
import navigate from "../../utils/navigate";
import styles from "./styles";
import platform from "../../../native-base-theme/variables/platform";
import commonColor from "../../../native-base-theme/variables/commonColor";
const image = require("../../assets/image.png");

const reqStatus = null;

const { height, width } = Dimensions.get("window");

class TaskerHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapReady: false,
      markers: null,
      name: this.props.category,
      taskerName: this.props.tasker,
      taskerSelected: this.props.taskerSelected,
      catSelected: this.props.SubCategorySelected,
      directions: [],
      gps: this.props.gps,
      navigateData: {
        source: {
          latitude: _.get(this.props, "origin.latitude", ""),
          longitude: _.get(this.props, "origin.longitude", "")
        },
        destination: {
          latitude: _.get(
            this.props,
            "userDetails.currentLocation.latitude",
            ""
          ),
          longitude: _.get(
            this.props,
            "userDetails.currentLocation.longitude",
            ""
          )
        },
        params: [
          {
            key: "dirflg"
          }
        ]
      }
    };
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

  componentDidMount() {
    if (this.props.fcmtoken === null) {
      firebase
        .messaging()
        .getToken()
        .then(fcm => {
          if (fcm) {
            console.log(fcm,"FCM Tasker Home")
            this.props.storeToken(fcm);
          } else {
            console.log("User does not have token");
          }
        });
    }

    const listenChanges = firebase
      .firestore()
      .collection("users")
      .doc(this.props.uniqueId)
      .collection("userDetails")
      .doc("user")
      .onSnapshot(querySnapshot => {
        const userInfo = querySnapshot.data();
        if (userInfo && reqStatus !== userInfo.status) {
          reqStatus = userInfo.status;
          if (userInfo && userInfo.status === "requested") {
            this.props.setUserInfoAndStatus({
              visible: true,
              data: userInfo,
              status: "requested"
            });
          } else if (userInfo && userInfo.status === "cancelled") {
            this.props.setUserPageStatus("home");
            this.setState({ markers: null });
            this.props.tripStatusSet("default");
            Alert.alert(
              "Cancelled",
              "Booking has been Cancelled",
              [
                {
                  text: "OK",
                  onPress: () => this.props.setDefaultTaskStatus()
                }
              ],
              { cancelable: false }
            );
          } else if (userInfo && userInfo.taskDetails) {
            if (
              userInfo &&
              userInfo.status === "inprogress" &&
              userInfo.taskDetails.onTrip === true
            ) {
              this.props.setUserPageStatus("inprogress");
            } else if (
              userInfo &&
              userInfo.status === "completed" &&
              userInfo.taskDetails.onTrip === false &&
              userInfo.taskDetails.paymentMode === null
            ) {
              this.props.tripStatusSet("default");
              this.props.setUserPageStatus("collectFee");
              this.props.setUserDetails(userInfo);
            } else if (
              userInfo &&
              userInfo.taskDetails &&
              userInfo.taskDetails.paymentStatus === null &&
              (userInfo.taskDetails.paymentMode === "Cash" ||
                userInfo.taskDetails.paymentMode === "Card")
            ) {
              this.props.setPaymentMode(userInfo.taskDetails.paymentMode);
            } else if (
              userInfo &&
              (userInfo.taskDetails.paymentStatus === "succeeded" ||
                userInfo.taskDetails.paymentStatus === "error")
            ) {
              this.props.setPaymentStatus(userInfo.taskDetails.paymentStatus);
            }
          }
        }
      });

    if (this.props.tripStatus === "onTrip" && this.props.userPageStatus === "startTask") {
      firebase
        .firestore()
        .collection("users")
        .doc(this.props.uniqueId)
        .collection("userDetails")
        .doc("user")
        .onSnapshot(querySnapshot => {
          const taskerInfo = querySnapshot.data();
          // console.log(taskerInfo,"insideTaskerInfo!!!!!!!!!!!!!!!!!!!!!!!!!")
          // console.log(this.props.userDetails,"Details inside Tasker")
          if (taskerInfo.taskDetails) {
            this.props.userDetails
              ? Promise.resolve(
                  getDirection(
                    taskerInfo.taskDetails.taskerLoc,
                    this.props.userDetails.taskDetails.userLoc
                  )
                )
                  .then(val => val)
                  .then(val => {
                    // console.log(val,"after method called")
                    this.setState({
                      directions: val.coordinates,
                      markers: [
                        {
                          latlng: {
                            latitude:
                              val.coordinates[
                                val.coordinates.length - val.coordinates.length
                              ].latitude,
                            longitude:
                              val.coordinates[
                                val.coordinates.length - val.coordinates.length
                              ].longitude
                          }
                        },
                        {
                          latlng: {
                            latitude:
                              val.coordinates[val.coordinates.length - 1]
                                .latitude,
                            longitude:
                              val.coordinates[val.coordinates.length - 1]
                                .longitude
                          }
                        }
                      ]
                    });
                    this.fitelements(this.refs.map);
                  })
                  .catch(function(e) {
                    console.log(e);
                  })
              : null;
          }
        });

      navigator.geolocation.getCurrentPosition(
        position => {
          if (this.props.uniqueId) {
            firebase
              .firestore()
              .collection("users")
              .doc(this.props.uniqueId)
              .set(
                {
                  location: new firebase.firestore.GeoPoint(
                    position.coords.latitude,
                    position.coords.longitude
                  )
                },
                {
                  merge: true
                }
              );
          }
        },
        error => {
          this.setState({
            error: error.message
          });
        },
        {
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 1000
        }
      );

      this.watchId = navigator.geolocation.watchPosition(
        position => {
          if (this.props.uniqueId) {
            firebase
              .firestore()
              .collection("users")
              .doc(this.props.uniqueId)
              .set(
                {
                  location: new firebase.firestore.GeoPoint(
                    position.coords.latitude,
                    position.coords.longitude
                  )
                },
                {
                  merge: true
                }
              );
          }
        },
        error =>
          this.setState({
            error: error.message
          }),
        {
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 1000,
          distanceFilter: 10
        }
      );
    }
  }
  fitelements(map) {
    _.get(this.state, "mapReady") ? map.fitToElements(true) : null;
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
      return Math.ceil(amount + minAmount);
    }
  }
  render() {
    const { origin, userDetails, userPageStatus, region, strings } = this.props;
    let obj = {};
    userPageStatus === "home"
      ? navigator.geolocation.getCurrentPosition(
          position => {
            obj = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            };
          },
          error => console.log("Error", error)
        )
      : null;
    return (
      <Container>
        <Content scrollEnabled={false}>
          <View
            style={{
              flex: 1,
              height: Platform.OS === "ios" ? height - 55 : height - 75,
              backgroundColor: "#fff"
            }}
          >
            <View style={{ flex: 2 }}>
              <MapView
                ref="map"
                provider={PROVIDER_GOOGLE}
                showsUserLocation={false}
                region={region}
                initialRegion={this.state.gps}
                style={styles.map}
                // fitToElements={MapView.IMMEDIATE_FIT}
                onMapReady={() => {
                  this.setState({ mapReady: true });
                }}
              ></MapView>
                {/* {_.map(this.state.markers, (marker, index) => (
                  <MapView.Marker
                    key={index}
                    coordinate={marker.latlng}
                    title={marker.title}
                    description={marker.description}
                    pinColor={commonColor.brandPrimary}
                  />
                ))} */}
                {/* {this.state.directions && (
                  <MapView.Polyline
                    coordinates={this.state.directions}
                    strokeWidth={4}
                    strokeColor={commonColor.brandPrimary}
                  />
                )} */}
              {/* </MapView> */}
              {this.props.tripStatus === "onTrip" && this.props.userPageStatus === "startTask" &&(
                <MapView
                ref="map"
                provider={PROVIDER_GOOGLE}
                showsUserLocation
                region={region}
                initialRegion={this.state.gps}
                style={styles.map}
                // fitToElements={MapView.IMMEDIATE_FIT}
                onMapReady={() => {
                  this.setState({ mapReady: true });
                }}
              >
              {_.map(this.state.markers, (marker, index) => (
                  <MapView.Marker
                    key={index}
                    coordinate={marker.latlng}
                    title={marker.title}
                    description={marker.description}
                    pinColor={commonColor.brandPrimary}
                  />
                ))}
              {this.state.directions && (
                  <MapView.Polyline
                    coordinates={this.state.directions}
                    strokeWidth={4}
                    strokeColor={commonColor.brandPrimary}
                  />
                )}
              </MapView>
              )}

              {this.props.userPageStatus === "inprogress" && (
                <MapView
                ref="map"
                provider={PROVIDER_GOOGLE}
                showsUserLocation
                region={region}
                initialRegion={this.state.gps}
                // style={styles.map}
                // fitToElements={MapView.IMMEDIATE_FIT}
                onMapReady={() => {
                  this.setState({ mapReady: true });
                }}
                ></MapView>
              )}
              <View style={styles.locate}>
                <TouchableOpacity
                  onPress={() => {
                    !_.isEmpty(obj)
                      ? this.refs.map.fitToCoordinates([obj], {
                          animated: true
                        })
                      : null;

                    this.state.markers ? this.fitelements(this.refs.map) : null;
                  }}
                >
                  <Icon
                    name="ios-locate-outline"
                    style={{
                      fontSize: 30,
                      backgroundColor: "transparent",
                      color: commonColor.brandPrimary,
                      fontWeight: "bold",
                      top: 1,
                      left: 0.5
                    }}
                  />
                </TouchableOpacity>
              </View>
              {this.props.modalVisible ? (
                <AcceptTask strings={strings} />
              ) : null}
            </View>
            {this.props.userPageStatus === "startTask" ? (
              <View style={{ flex: Platform.OS === "ios" ? 0.8 : 0.7 }}>
                <Card
                  style={{
                    flex: 1,
                    borderTopWidth: 0,
                    borderLeftWidth: 0,
                    borderRightWidth: 0
                  }}
                >
                  <CardItem
                    style={{
                      paddingBottom: 0,
                      paddingTop: 5,
                      borderTopWidth: 0,
                      elevation: 0
                    }}
                  >
                    <Left>
                      {_.get(userDetails, "userData.profileUrl") ? (
                        <Image
                          source={{
                            uri: _.get(userDetails, "userData.profileUrl")
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
                      <Body>
                        <Text>
                          {_.get(
                            this.props,
                            "userDetails.userData.name",
                            "Username"
                          )}
                        </Text>
                        <Text note>
                          {" "}
                          {this.getDistanceFromLatLonInKm(
                            _.get(
                              userDetails,
                              "taskDetails.taskerLoc._latitude"
                            ),
                            _.get(
                              userDetails,
                              "taskDetails.taskerLoc._longitude"
                            ),
                            _.get(userDetails, "taskDetails.userLoc.latitude"),
                            _.get(userDetails, "taskDetails.userLoc.longitude")
                          )}{" "}
                          {"km away"}{" "}
                        </Text>
                      </Body>
                    </Left>
                    <Right>
                      <View
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 20,
                          alignItems: "center",
                          justifyContent: "center",
                          borderWidth: 1.5,
                          borderColor: commonColor.brandSecondary
                        }}
                      >
                        <Item
                          onPress={() =>
                            Communications.phonecall(
                              _.get(
                                userDetails,
                                "userData.phone",
                                "9876565659"
                              ),
                              true
                            )
                          }
                        >
                          <Icon
                            style={{
                              color: commonColor.brandSecondary,
                              paddingRight: 0
                            }}
                            name="ios-call"
                          />
                        </Item>
                      </View>
                    </Right>
                  </CardItem>
                </Card>
              </View>
            ) : null}
            {this.props.userPageStatus === "collectFee" ? (
              <View style={{ flex: Platform.OS === "ios" ? 0.7 : 0.9 }}>
                <Card
                  style={{
                    borderTopWidth: 0,
                    borderLeftWidth: 0,
                    borderRightWidth: 0
                  }}
                >
                  <CardItem
                    style={{
                      paddingBottom: 0,
                      paddingTop: 5,
                      borderTopWidth: 0,
                      elevation: 0
                    }}
                  >
                    <Left>
                      {_.get(userDetails, "userData.profileUrl") ? (
                        <Image
                          source={{
                            uri: _.get(userDetails, "userData.profileUrl")
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
                      <Body>
                        <Text>
                          {_.get(
                            this.props.userDetails,
                            "userData.name",
                            "Name"
                          )}
                        </Text>
                        <Text note>
                          {_.get(
                            this.props.userDetails,
                            "taskDetails.category",
                            "Repair"
                          )}
                        </Text>
                      </Body>
                    </Left>
                    <Right>
                      <View
                        style={{
                          alignItems: "center",
                          justifyContent: "center"
                        }}
                      >
                        <Text style={{ alignSelf: "center" }}>
                          $ {this.calculateFare(userDetails.taskDetails)}
                        </Text>
                      </View>
                      {this.props.paymentMode === "Cash" ||
                      (this.props.paymentMode === "Card" &&
                        this.props.paymentStatus === "error") ? (
                        <View
                          style={{
                            alignItems: "center",
                            justifyContent: "center"
                          }}
                        >
                          <Text>{strings.CollectCash}</Text>
                        </View>
                      ) : null}
                      {(this.props.paymentMode === "Card" &&
                        this.props.paymentStatus === null) ||
                      (this.props.paymentMode === null &&
                        this.props.paymentStatus === null) ? (
                        <View
                          style={{
                            alignItems: "center",
                            justifyContent: "center"
                          }}
                        >
                          <Text>{strings.userPaying}</Text>
                        </View>
                      ) : null}
                      {this.props.paymentMode === "Card" &&
                      this.props.paymentStatus === "succeeded" ? (
                        <View
                          style={{
                            alignItems: "center",
                            justifyContent: "center"
                          }}
                        >
                          <Text>{strings.paymentsuccess}</Text>
                        </View>
                      ) : null}
                    </Right>
                  </CardItem>
                </Card>
              </View>
            ) : null}
          </View>
        </Content>
      </Container>
    );
  }
}

const bindActions = dispatch => ({
  setCurrentAddress: () => dispatch(TripActions.setCurrentAddress()),
  showAcceptModal: bool => dispatch(UserActions.showAcceptModal(bool)),
  setUserDetails: data => dispatch(UserActions.setUserDetails(data)),
  showCard: bool => dispatch(DriverActions.showCard(bool)),
  setUserPageStatus: page => dispatch(UserActions.setUserPageStatus(page)),
  tripStatusSet: status => dispatch(UserActions.tripStatusSet(status)),
  storeToken: token => dispatch(UserActions.storeToken(token)),
  setPaymentMode: mode => dispatch(PaymentActions.setPaymentMode(mode)),
  setPaymentStatus: status => dispatch(PaymentActions.setPaymentStatus(status)),
  setUserInfoAndStatus: status =>
    dispatch(UserActions.setUserInfoAndStatus(status)),
  setDefaultTaskStatus: () => dispatch(TripActions.setDefaultTaskStatus())
});

const mapStateToProps = state => ({
  origin: state.trip.origin,
  region: state.trip.region,
  SubCategorySelected: state.user.SubCategorySelected,
  taskerSelected: state.user.taskerSelected,
  tasker: state.user.tasker,
  allTasker: state.user.allTasker,
  category: state.user.category,
  uniqueId: state.user.id,
  fcmtoken: state.user.fcmtoken,
  userPageStatus: state.user.userPageStatus,
  nearTaskers: state.user.nearTaskers,
  userDetails: state.user.userDetails,
  modalVisible: state.user.modalVisible,
  tripStatus: state.user.tripStatus,
  paymentMode: state.paymentMethods.paymentMode,
  paymentStatus: state.paymentMethods.paymentStatus,
  gps: state.user.gpsLoc
});

export default connect(
  mapStateToProps,
  bindActions
)(TaskerHome);
