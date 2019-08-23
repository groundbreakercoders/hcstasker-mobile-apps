import React, { Component } from "react";
import {
  Button,
  Left,
  Body,
  Thumbnail,
  Text,
  Container,
  Content,
  Right,
  Card,
  CardItem,
  Icon,
  Item,
  Spinner
} from "native-base";
import { Dimensions, View, Image, TouchableOpacity } from "react-native";
import _ from "lodash";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Header from "../common/header";
import firebase from "react-native-firebase";
import commonColor from "../../../native-base-theme/variables/commonColor";
import UserActions from "../../Redux/userstore";
import TripActions from "../../Redux/tripstore";
import { Actions } from "react-native-router-flux";
import MIcon from "../common/mIcon";
import styles from "./styles";
import AppointmentActions from "../../Redux/appointmentstore";

const { height } = Dimensions.get("window");

class Notifications extends Component {
  lastTap = null;

  constructor(props) {
    super(props);
    this.ref = firebase
    .firestore()
    .collection("activity")
    .doc(this.props.email)
    .collection("notifications")
    .orderBy('time','desc');
    
    this.unsubscribe = null;
    this.state = {
      notification:[],
      loading: true
    };
    
  }

  onCollectionUpdate = (querySnapshot) => {
    if (querySnapshot.docs.length) {
      querySnapshot.forEach(data => {
      const appointment = data.data();
      if (appointment) {
        this.setState({
          notification: [...this.state.notification,appointment],
          loading: false
        });
        this.props.getAppointments(this.props.userid,this.props.usertype);
      }
        
    });
    } else {
      this.setState({ loading: false });
    }
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  // async removeFromFavourites(email) {
  //   this.setState({ loading: true });
  //   const userEmail = this.props.email;
  //   await firebase
  //     .firestore()
  //     .collection("users")
  //     .doc(userEmail)
  //     .collection("favourites")
  //     .doc(email)
  //     .delete()
  //     .then(() => {
  //       firebase
  //         .firestore()
  //         .collection("users")
  //         .doc(userEmail)
  //         .collection("tasks")
  //         .where("taskDetails.taskerData.email", "==", email)
  //         .get()
  //         .then(querySnapshot => {
  //           querySnapshot.forEach(data => {
  //             console.log("data", data.favourite);
  //             data.ref.update({
  //               favourite: false
  //             });
  //           });
  //           firebase
  //             .firestore()
  //             .collection("users")
  //             .doc(this.props.email)
  //             .collection("favourites")
  //             .get()
  //             .then(querySnapshot => {
  //               if (querySnapshot.docs.length) {
  //                 querySnapshot.forEach(data => {
  //                   const user = data.data();
  //                   firebase
  //                     .firestore()
  //                     .collection("users")
  //                     .doc(user.email)
  //                     .get()
  //                     .then(datas => {
  //                       const userData = datas.data();
  //                       if (userData) {
  //                         this.setState({
  //                           list: [...[], userData],
  //                           loading: false
  //                         });
  //                       }
  //                     });
  //                 });
  //               } else {
  //                 this.setState({ list: [], loading: false });
  //               }
  //             })
  //             .catch(error => console.log("Catch", error));
  //         })
  //         .catch(error => {
  //           console.log("Catch", error);
  //         });
  //     });
  // }

  getRating(rating) {
    let total = null;
    const length = rating.length;
    _.map(rating, (rate, index) => {
      total += rate;
    });
    return Math.ceil(total / length);
  }

  getName(){
    console.log("hello");
  }

  pressItem(appointments,uid) {
    const now = Date.now();
    var appointment = '';
    for(var j=0;j<appointments.length;j++){
    if(appointments[j].uniqueId=== uid){
        appointment = appointments[j];
        break
    }
    }
    
    if (this.lastTap && (now - this.lastTap) < 500) {
      console.log('Double Clicked!');
    } else {
      Actions.maintainappointment({"appointment":appointment})
      this.lastTap = now;
    }

}

  render() {
    const { strings } = this.props;
    
    return (
      <Container>
        <Header title={strings.notifications} />
        <Content>
          <View>
            {this.state.loading ? (
              <Spinner color={commonColor.brandPrimary} />
            ) : (
              <View style={{ marginTop: 5 }}>
                {!this.state.notification.length ? (
                  <View
                    style={{
                      marginTop: height / 3,
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        color: "#8B8DAC"
                      }}
                    >
                      {strings.noNewNotifications}
                    </Text>
                  </View>
                ) : (
                  _.map(this.state.notification, (notification,index) => (
                    <Card key={index} style={styles.card}>
                      <CardItem
                        style={{
                          flex:1,
                          paddingBottom: 50,
                          height: 190,
                          fontWeight: "bold",
                        }}
                        >
                        <Body>
                          <Item
                               onPress={() => this.pressItem(this.props.appointments,notification.uid)}
                               style={{ borderBottomWidth: 0 }}
                            >
                            <Text style={{
                                    fontSize: 18,
                                    color: "#44466B",
                                  }} >
                            <Text style={{
                              fontSize: 22,
                              color: "#44466B",
                              fontWeight: 'bold'}} >
                            {notification.status}{'\n'}{'\n'}                                                      
                            </Text>
                            <Text>{notification.userNotifMessage}</Text>
                            
                          </Text>
                          
                        </Item>
                        </Body>
                        {/* </Left> */}
                        {/* <Right
                          style={{
                            flex: 0.3,
                            alignItems: "center",
                            justifyContent: "space-between"
                          }}
                        >
                          <TouchableOpacity
                            style={{
                              height: 30,
                              width: 30,
                              alignItems: "center",
                              justifyContent: "center"
                            }}
                            onPress={() =>
                              this.removeFromFavourites(tasker.email)
                            }
                          >
                            <MIcon
                              family="Ionicons"
                              name="ios-heart"
                              style={{ color: commonColor.brandPrimary }}
                            />
                          </TouchableOpacity>
                          <Button
                            small
                            disabled
                            style={{
                              marginTop: 10,
                              backgroundColor: commonColor.brandPrimary,
                              borderRadius: 2
                            }}
                            onPress={() =>
                              this.props.bookFavourite(tasker.email)
                            }
                          >
                            <Text>{strings.book}</Text>
                          </Button>

                          <Text note style={{ fontSize: 10, color: "red",paddingTop:7 }}>
                            Coming soon...
                          </Text>
                        </Right> */}
                      </CardItem>
                    </Card>
                  ))
                )}
              </View>
            )}
          </View>
        </Content>
      </Container>
    );
  }
}

Notifications.propTypes = {
  favourites: PropTypes.array
};

Notifications.defaultProps = {
  favourites: []
};
const mapStateToProps = state => ({
  favourites: state.user.favourites,
  email: state.user.email,
  userid: state.user.id,
  usertype: state.user.userType,
  appointments:state.appointment.appointments
});

const bindActions = dispatch => ({
  getFavouritetaskers: () => dispatch(UserActions.getFavouritetaskers()),
  bookFavourite: email => dispatch(TripActions.bookFavourite(email)),
  getAppointments: (userid, usertype) =>
    dispatch(AppointmentActions.getAppointments(userid, usertype))
});

export default connect(
  mapStateToProps,
  bindActions
)(Notifications);
