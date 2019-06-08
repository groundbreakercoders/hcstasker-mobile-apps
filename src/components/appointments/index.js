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
import { Dimensions, View } from "react-native";
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
  constructor(props) {
    super(props);
    this.state = {};
    this.props.getAppointments('testapp@gmail.com','user');
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

  render() {
    const { strings } = this.props;
    return (
      <Container>
        <Header title="My Appointments"  />
        <Content>
          {this.props.appointments != null && this.props.appointments.length > 0 ? (
            <View>
              {_.map(this.props.allTasker, (tasker, key) => (
                <Card  style={styles.card} key={key}>
                  <CardItem
                    style={{ paddingTop: 30, paddingBottom: 30, height: 150 }}
                  >

                    <Item
                      onPress={() => Actions.booking(tasker)}
                      style={{ borderBottomWidth: 0 }}
                    >
                    {tasker.profileurl ?
                    (
                      <Thumbnail
                        circle
                        source={{ uri: tasker.profileurl }}
                        style={{ width: 80, height: 80, borderRadius: 40 }}
                      />
                    ):
                    (
                      <Thumbnail
                        circle
                        source={image}
                        style={{ width: 80, height: 80, borderRadius: 40 }}
                      />
                    )
                    }

                      <Body>
                        <Text
                          style={{
                            fontSize: 20,
                            color: "#44466B",
                            fontWeight: "500"
                          }}
                        >
                          {tasker.name}
                        </Text>

                        <Text
                        style={{
                          fontSize: 20,
                          color: "#44466B",
                          fontWeight: "500"
                        }}
                        >

                          <Text style={{ paddingRight: 16,
                                        color: "#154299"
                                        }}>
                          <StarRating
                               disabled={true}
                               maxStars={5}
                               rating={this.getRating(tasker.rating)}
                                fullStarColor={commonColor.brandPrimary}
                                starSize={16}
                          />
                            {" "}{this.getRating(tasker.rating)}
                          </Text>

                        </Text>
                        <Text>{tasker.fee ? tasker.fee : "10"} KWD/Hour</Text>
                      </Body>
                    </Item>



                  </CardItem>
                </Card>
              ))}
            </View>
          ) : (
            <View>
              <Text>No Care Taker available for this service</Text>
            </View>
          )}
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  allTasker: state.user.taskerList,
  selectedCategory: state.user.selectedCategory,
  origin: state.trip.origin,
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
