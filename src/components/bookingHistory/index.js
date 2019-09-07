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
  Tab,
  Tabs,
  Spinner
} from "native-base";
import { Dimensions, View, Image, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Header from "../common/header";
import _ from "lodash";
import { Actions } from "react-native-router-flux";
import ImageSwiper from "../common/swiper";
import TripActions from "../../Redux/tripstore";
import UserActions from "../../Redux/userstore";
import MIcon from "../common/mIcon";
import commonColor from "../../../native-base-theme/variables/commonColor";
import styles from "./styles";
import AppointmentActions from "../../Redux/appointmentstore";

const { height, width } = Dimensions.get("window");
const image = require("../../assets/map.png");

class BookingHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appointmentHistory:[]
    };
    this.props.getAppointments(this.props.userid,this.props.usertype);
  }
  componentDidMount() {
    var appnt=[];
    
    for(var i=0;i<this.props.appointments.length;i++){
      if(this.props.appointments[i].status==='Rejected' || this.props.appointments[i].status==='Cancelled' || this.props.appointments[i].status==='Completed'){
        appnt = [...appnt,this.props.appointments[i]];
        // this.setState({
        //   appointmentHistory: this.state.appointmentHistory.concat(this.props.appointments[i])
        // });
        
      }
    }

    this.setState({
          appointmentHistory: appnt
        });
  }

  setfavourite(name, email, favourite) {
    const favouriteData = {
      name,
      email,
      favourite
    };
    this.props.setFavourite(favouriteData);
  }

  getHistory(i) {
    const status = i === 0 ? "pending" : "completed";
    this.props.getTripHistory(status, i);
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
      <Container>
        <Header hasTabs title={strings.AppointmentHistory} backButton={false} />
        <Content style={{ backgroundColor: "#fff" }}>
        {this.state.appointmentHistory != null && this.state.appointmentHistory.length > 0 ? (
                    <View>
                      {_.map(this.state.appointmentHistory, (appointment, key) => (
                        
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
                                    {appointment.patientName}
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
                                    {appointment.sponsorName}
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
                                    {appointment.dateCreated}
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
                                    {appointment.status}
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
                      <Text>No appointment history</Text>
                    </View>
                  )}
        </Content>
        
      </Container>
    );
  }
}

BookingHistory.propTypes = {
  getTripHistory: PropTypes.func.isRequired,
  trips: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  loading: state.trip.loading,
  userid:state.user.id,
  usertype: state.user.userType,
  appointments:state.appointment.appointments
});

const bindActions = dispatch => ({
  getTripHistory: (status, i) =>
    dispatch(TripActions.getTripHistory(status, i)),
  setFavourite: (favourite, filled) =>
    dispatch(UserActions.setFavourite(favourite, filled)),
    getAppointments: (userid, usertype) =>
    dispatch(AppointmentActions.getAppointments(userid, usertype))
});

export default connect(
  mapStateToProps,
  bindActions
)(BookingHistory);
