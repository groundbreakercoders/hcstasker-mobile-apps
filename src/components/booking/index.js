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
  FooterTab,
  Icon,
  Footer,
  Spinner
} from "native-base";
import { Dimensions, View } from "react-native";
import moment from "moment";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Actions } from "react-native-router-flux";
import Header from "../common/header";
import DatePickerCustom from "../common/datePicker";
import TripActions from "../../Redux/tripstore";
import ImageSwiper from "../common/swiper";
import commonColor from "../../../native-base-theme/variables/commonColor";
import styles from "./styles";

const { height, width } = Dimensions.get("window");
const image = require("../../assets/large-heart-logo.png");

class Booking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: moment(new Date()).format("MMM DD YYYY"),
      time: moment(new Date()).format("HH:mm")
    };
  }
  update(date) {
    this.setState({ date });
  }
  updateTime(date) {
    this.setState({ time: date });
  }

  render() {

    return (
      <Container>
        <Header title="Booking" backButton />
        <Content>
        <View
          style={{
            flexDirection: "row",
            padding: 20,
            borderBottomWidth: 1,
            borderBottomColor: "#C2C5DB"
          }}
        >
          <Left>
            <Text style={{ color: "#44466B", fontSize: 18 }}>Set Time</Text>
          </Left>
          <Right>
            <DatePickerCustom
              date={this.state.time}
              mode="time"
              format="HH:mm"
              itemstyle={{
                borderBottomWidth: 0,
                height: 40,
                justifyContent: "flex-end"
              }}
              datepickerStyle={{ width: width / 2, borderBottomWidth: 0 }}
              datestyle={{
                dateInput: {
                  flex: 0,
                  borderWidth: 0,
                  height: null,
                  alignItems: "flex-end",
                  justifyContent: "flex-end",
                  marginTop: -10
                },
                dateText: {
                  flex: 0,
                  fontSize: 22,
                  color: commonColor.brandSecondary,
                  right: -45,
                  marginBottom: 10
                }
              }}
            />
          </Right>
        </View>
        </Content>
        <Footer>
          <FooterTab>

          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
Booking.propTypes = {
  tasker: PropTypes.object.isRequired,
  requestTasker: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};
const mapStateToProps = state => ({
  //loading: state.trip.loading
});

const bindActions = dispatch => ({
  requestTasker: (tasker, tripdate, triptime) =>
    dispatch(TripActions.requestTasker(tasker, tripdate, triptime))
});

export default connect(
  mapStateToProps,
  bindActions
)(Booking);
