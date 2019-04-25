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
    const { tasker } = this.props;
    return (
      <Container>
        <Header title="Booking" backButton />
        <Content>
          <Card style={styles.card}>
            <CardItem style={{ paddingTop: 30, paddingBottom: 30 }}>
              <Left style={{ flex: 1 }}>
                <Thumbnail size={50} source={image} />
                <Body>
                  <Text style={{ color: "#44466B", fontSize: 18 }}>
                    {tasker.name ? tasker.name : ""}
                  </Text>
                  <Text note style={{ marginTop: 5, color: "#8B8DAC" }}>
                    <Icon
                      name="ios-pin"
                      style={{ fontSize: 18, color: "#8B8DAC" }}
                    />{" "}
                    {tasker.dist ? tasker.dist : 4} km away
                  </Text>
                </Body>
              </Left>
              <Right style={{ flex: 0.3 }}>
                <View style={{ flexDirection: "row" }}>
                  <Icon
                    name="ios-star"
                    style={{ color: commonColor.brandSecondary, fontSize: 22 }}
                  />
                  <Text style={{ paddingLeft: 5, fontSize: 18 }}>
                    {tasker.likes ? tasker.likes : "4"}
                  </Text>
                </View>
              </Right>
            </CardItem>
          </Card>
          <View
            style={{
              flex: 1,
              marginTop: 30,
              backgroundColor: "#fff",
              height: height / 1.5
            }}
          >
            <View
              style={{
                flexDirection: "row",
                padding: 20,
                borderBottomWidth: 1,
                borderBottomColor: "#C2C5DB"
              }}
            >
              <Left />
              <Body>
                <DatePickerCustom
                  date={this.state.date}
                  onUpdate={date => this.update(date)}
                  mode="date"
                  format="MMM DD YYYY"
                  itemstyle={{ borderBottomWidth: 0, height: 40 }}
                  datepickerStyle={{ width: width / 2, borderBottomWidth: 0 }}
                  datestyle={{
                    dateInput: {
                      flex: 0,
                      borderWidth: 0,
                      height: null,
                      alignItems: "center",
                      marginTop: -10
                    },
                    dateText: {
                      fontSize: 18,
                      color: "#44466B"
                    }
                  }}
                />
              </Body>
              <Right>
                <Icon
                  name="ios-arrow-forward"
                  style={{ color: commonColor.brandSecondary }}
                />
              </Right>
            </View>
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
                  onUpdate={date => this.updateTime(date)}
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
            <View
              style={{
                padding: 10,
                borderBottomWidth: 1,
                borderBottomColor: "#C2C5DB"
              }}
            >
              <Button full transparent onPress={() => Actions.PaymentPage()}>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 20,
                    color: "#44466B"
                  }}
                >
                  Select payment
                </Text>
              </Button>
            </View>
          </View>
        </Content>
        <Footer>
          <FooterTab>
            <Button
              onPress={() =>
                this.props.requestTasker(
                  tasker,
                  this.state.date,
                  this.state.time
                )
              }
              full
              style={{ backgroundColor: commonColor.brandSecondary }}
            >
              {this.props.loading ? (
                <Spinner />
              ) : (
                <Text
                  style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}
                >
                  CONFIRM BOOKING
                </Text>
              )}
            </Button>
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
  loading: state.trip.loading
});

const bindActions = dispatch => ({
  requestTasker: (tasker, tripdate, triptime) =>
    dispatch(TripActions.requestTasker(tasker, tripdate, triptime))
});

export default connect(
  mapStateToProps,
  bindActions
)(Booking);
