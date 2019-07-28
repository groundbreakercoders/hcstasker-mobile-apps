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
  Item,
  Icon,
  Spinner
} from "native-base";
import Booking from "../booking";
import _ from "lodash";
import { Dimensions, View,StatusBar } from "react-native";
import { connect } from "react-redux";
import Header from "../common/header";
import { Actions } from "react-native-router-flux";
import commonColor from "../../../native-base-theme/variables/commonColor";
import ImageSwiper from "../common/swiper";
import styles from "./styles";
import StarRating from 'react-native-star-rating';
const { height } = Dimensions.get("window");
const image = require("../../assets/avatar.png");
import firebase from "react-native-firebase";
import AppointmentActions from "../../Redux/appointmentstore";

class Appointments extends Component {
  lastTap = null;
  constructor(props) {
    super(props);
    this.state = {};
    this.props.getAppointments(this.props.userid,this.props.usertype);
  }

  getRating(rating) {
    let total = 0;
    const length = rating.length? rating.length: 0;
    _.map(rating, (rate, index) => {
      total += (rate)?Number(rate):0;
    });
    if(total === 0) {
      return total
    }
    return Math.ceil(total / length);
  }

  pressItem(appointment) {
    const now = Date.now();
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
      <Container >
        <Header title={this.props.strings.myAppointments}/>
        <Content>
                  {this.props.appointments != null && this.props.appointments.length > 0 ? (
                    <View>
                      {_.map(this.props.appointments, (appointment, key) => (
                        <Card  style={styles.card} key={key}>
                          <CardItem
                            style={ styles.cardCardItem }
                          >

                            <Item
                               onPress={() => this.pressItem(appointment)}
                               style={{ borderBottomWidth: 0 }}
                            >

                            <View style={styles.cardCardItemView}>

                                <View  style={{ paddingBottom: 5 }}>
                                <Text
                                  style={{
                                    fontSize: 18,
                                    color: "#44466B",

                                    fontWeight: "bold"
                                  }}
                                >
                                  Patient Name
                                </Text>
                                </View>
                                <View style={{ paddingBottom: 5 }}>
                                <Text
                                  style={{
                                    fontSize: 18,
                                    color: "#44466B",
                                    fontWeight: "bold"
                                  }}
                                >
                                  Sponsor Name
                                </Text>
                                </View>
                                <View style={{ paddingBottom: 5 }}>
                                <Text
                                  style={{
                                    fontSize: 18,
                                    color: "#44466B",
                                    fontWeight: "bold"
                                  }}
                                >
                                  Created
                                </Text>
                                </View>
                                <View style={{ paddingBottom: 5 }}>
                                <Text
                                  style={{
                                    fontSize: 18,
                                    color: "#44466B",
                                    fontWeight: "bold"
                                  }}
                                >
                                  Status
                                </Text>
                                </View>
                              </View>
                              <View style={styles.cardCardItemView}>

                                  <View style={{ paddingBottom: 5, paddingLeft:5 }}>
                                  <Text
                                    style={{
                                      fontSize: 18,
                                      color: "#44466B",
                                      fontWeight: "500"
                                    }}
                                  >
                                    : {appointment.patientName}
                                  </Text>
                                  </View>
                                  <View style={{ paddingBottom: 5, paddingLeft:5 }}>
                                  <Text
                                    style={{
                                      fontSize: 18,
                                      color: "#44466B",
                                      fontWeight: "500"
                                    }}
                                  >
                                    : {appointment.sponsorName}
                                  </Text>
                                  </View>
                                  <View style={{ paddingBottom: 5, paddingLeft:5 }}>
                                  <Text
                                    style={{
                                      fontSize: 18,
                                      color: "#44466B",
                                      fontWeight: "500"
                                    }}
                                  >
                                    : {appointment.dateCreated}
                                  </Text>
                                  </View>
                                  <View style={{ paddingBottom: 5, paddingLeft:5 }}>
                                  <Text
                                    style={{
                                      fontSize: 18,
                                      color: "#44466B",
                                      fontWeight: "500"
                                    }}
                                  >
                                    : {appointment.status}
                                  </Text>
                                  </View>
                                </View>
                            </Item>



                          </CardItem>
                        </Card>
                      ))}
                    </View>
                  ) : (
                    <View style={ styles.cardCardItem }>
                      <Text>No appointment available</Text>
                    </View>
                  )}
                </Content>
      </Container>
    );

  }
}

const mapStateToProps = state => ({
  userid: state.user.id,
  usertype: state.user.userType,
  appointments:state.appointment.appointments
});

const bindActions = dispatch => ({
  getAppointments: (userid, usertype) =>
    dispatch(AppointmentActions.getAppointments(userid, usertype))
});

export default connect(
  mapStateToProps,
  bindActions
)(Appointments);
