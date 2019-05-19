import React, { Component } from "react";
import { Text, Container, Content, Icon } from "native-base";
import {
  Dimensions,
  View,
  TouchableOpacity,
  Alert,
  Platform,
  ActivityIndicator
} from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import _ from "lodash";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import firebase from "react-native-firebase";
import { Actions } from "react-native-router-flux";
import UserActions from "../../Redux/userstore";
import TripActions from "../../Redux/tripstore";
import { guide } from "../../theme";
import SearchLocation from "../common/searchLocatioon";
import { getDirections } from "../../utils/userutils";
import styles from "./styles";
import CustomModal from "../common/modal";
import CategoryAndSubCategory from "../common/userComponents/categoryAndSubCategory";
import BookingPage from "../common/userComponents/bookingPage";
import BookingConfirmed from "../common/userComponents/bookingConfirmed";
import platform from "../../../native-base-theme/variables/platform";
import commonColor from "../../../native-base-theme/variables/commonColor";
import Tasker from "../tasker";

const { height, width } = Dimensions.get("window");

const reqStatus = null;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapReady: false,
      markers: this.props.nearTaskers,
      directions: [],
      gps: this.props.gps,
      loader: true,
      latitude:null,
      longitude:null,
      longitudeDelta:null,
      latitudeDelta:null,
      allTaskers: []
    };
  }

  async componentDidMount() {
    firebase
      .firestore()
      .collection("users")
      .doc(this.props.uniqueId)
      .collection("taskerDetails")
      .doc("tasker")
      .onSnapshot(querySnapshot => {
        const userInfo = querySnapshot.data();
        if (userInfo && reqStatus !== userInfo.status) {
          reqStatus = userInfo.status;
          if (
            userInfo &&
            userInfo.status === "accepted" &&
            userInfo.taskDetails.onTrip === false
          ) {
            this.props.setUserPageStatus("bookingConfirmed");
            this.props.tripStatusSet("accepted");
            this.props.setTaskerDetails(userInfo);
            if (this.props.tripStatus === "cancelled") {
              this.props.tripStatusSet("accepted");
            }
          } else if (userInfo && userInfo.status === "cancelled") {
            this.props.tripStatusSet("default");
            this.props.setUserPageStatus("home");
            Alert.alert(this.props.strings.bookingCancelled);
          } else if (userInfo && userInfo.taskDetails) {
            if (
              userInfo &&
              userInfo.status === "OnTrip" &&
              userInfo.taskDetails.onTrip === true
            ) {
              this.props.tripStatusSet("onTrip");
            } else if (
              userInfo &&
              userInfo.status === "inprogress" &&
              userInfo.taskDetails.onTrip === true
            ) {
              if (this.props.userPageStatus !== "inprogress") {
                this.props.setUserPageStatus("inprogress");
              }
            } else if (
              userInfo &&
              userInfo.status === "completed" &&
              userInfo.taskDetails.onTrip === false &&
              userInfo.taskDetails.paymentMode === null
            ) {
              this.props.tripStatusSet("default");
              this.props.setTaskerDetails(userInfo);
              Actions.paytasker();
            }
          }
        }
      });

    // if (this.props.tripStatus === "onTrip" || this.props.tripStatus === "accepted") {
      // if(this.props.tripStatus === "accepted"){
        if(this.props.userPageStatus === "bookingConfirmed"){
      firebase
        .firestore()
        .collection("users")
        .doc(this.props.taskerDetails.taskDetails.taskerId)
        .collection("userDetails")
        .doc("user")
        .onSnapshot(querySnapshot => {
          const taskerInfo = querySnapshot.data();
          // console.log(taskerInfo,"!!!!!!!!!!!!!!!!!!!!!!!")
          if (taskerInfo.taskDetails) {
            _.get(this.props, "taskerDetails") !== null
              ? Promise.resolve(
                  getDirections(this.props.origin, taskerInfo.taskDetails.taskerLoc)
                )
                  .then(val => val)
                  .then(val => {
                    // console.log(val, "State")
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
                  .catch(e => {
                    console.log(e);
                  })
              : null;
          }
        });
    }

    this.watchId = navigator.geolocation.watchPosition(
      position => {
        if (this.props.uniqueId) {
          this.props.setCurrentAddress();
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

    if (this.props.fcmtoken === null) {
      firebase
        .messaging()
        .getToken()
        .then(fcm => {
          if (fcm) {
            console.log(fcm,"fcmToken UserHome")
            this.props.storeToken(fcm);
          } else {
            console.log("User does not have token");
          }
        });
    }
  }



  getTaskers(name) {
    console.log(name);
    this.setState({allTaskers:[]});
  }

  fitelements(map) {
    _.get(this.state, "mapReady") ? map.fitToElements(true) : null;
  }
  getInitialState() {
    return {
      region: {
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        latitudeDelta: this.state.latitudeDelta,
        longitudeDelta: this.state.longitudeDelta,
      },
    };

  }


  render() {
    // setTimeout(()=>{this.setState({loader:false})},5000)
    const {
      origin,
      taskerDetails,
      nearTaskers,
      userPageStatus,
      region,
      strings
    } = this.props;
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
    // if(this.state.loader){
    //   return(
    //  <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
    //    <ActivityIndicator color="blue" size="large"/>
    //  </View>
    //    )}

    return (
      <Container>
        <CustomModal fetchTaskers={this.props.fetchTaskers} strings={strings} />
        <Content scrollEnabled={false}>
          <View
            style={{
              flex: 1,
              height: Platform.OS === "ios" ? height - 55 : height - 75,
              backgroundColor: "#fff"
            }}
          >
            <View style={{ flex: 1, flexDirection: "column" }}>
              <View style={{ flex: 6 }}>
              <Tasker />
              </View>
              {this.props.userPageStatus === "home" ? (
                <CategoryAndSubCategory getSelectedCatTaskers={this.getTaskers} strings={strings} />
              ) : null}
              {this.props.userPageStatus === "bookingpage" ? (
                <BookingPage />
              ) : null}
              {this.props.userPageStatus === "bookingConfirmed" ? (
                <BookingConfirmed />
              ) : null}

              {this.props.userPageStatus === "inprogress" ? (
                <View
                  style={{
                    flex: 1.3,
                    backgroundColor: "#fff",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingLeft: 15
                  }}
                >
                  <Text
                    style={{
                      color: commonColor.brandPrimary,
                      alignSelf: "center",
                      textAlign: "center",
                      fontSize: 20
                    }}
                  >
                    Your requested task is in progress. wait untill the task is
                    completed.
                  </Text>
                </View>
              ) : null}
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}

Home.propTypes = {
  setUserPageStatus: PropTypes.func,
  openTripLocationSearch: PropTypes.func,
  setCurrentAddress: PropTypes.func,
  tasker: PropTypes.string,
  category: PropTypes.string,
  userPageStatus: PropTypes.string,
  origin: PropTypes.object,
  nearTaskers: PropTypes.array,
  paymentMode: PropTypes.string
};

const bindActions = dispatch => ({
  setUserPageStatus: page => dispatch(UserActions.setUserPageStatus(page)),
  openTripLocationSearch: key =>
    dispatch(TripActions.openTripLocationSearch(key)),
  setCurrentAddress: () => dispatch(TripActions.setCurrentAddress()),
  storeToken: token => dispatch(UserActions.storeToken(token)),
  setTripStatus: bool => dispatch(UserActions.setTripStatus(bool)),
  tripStatusSet: status => dispatch(UserActions.tripStatusSet(status)),
  setTaskerDetails: data => dispatch(UserActions.setTaskerDetails(data)),
  setUserTripStatus: data => dispatch(UserActions.setUserTripStatus(data)),
  sendNotification: (token, title, body) =>
    dispatch(UserActions.sendNotification(token, title, body))
});

const mapStateToProps = state => ({
  gps: state.user.gpsLoc,
  origin: state.trip.origin,
  region: state.trip.region,
  email: state.user.email,
  userPageStatus: state.user.userPageStatus,
  nearTaskers: state.user.nearTaskers,
  paymentMode: state.paymentMethods.paymentMode,
  uniqueId: state.user.id,
  tripStatus: state.user.tripStatus,
  taskerDetails: state.user.taskerDetails,
  fcmtoken: state.user.fcmtoken,
  fetchTaskers: state.user.fetchTaskers
});

export default connect(
  mapStateToProps,
  bindActions
)(Home);
