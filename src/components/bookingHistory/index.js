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

const { height, width } = Dimensions.get("window");
const image = require("../../assets/map.png");

class BookingHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      heartfill: false
    };
  }
  componentDidMount() {
    this.props.getTripHistory("pending", null);
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
  render() {
    const { trips, userType, tabIndex, strings } = this.props;
    return (
      <Container>
        <Header hasTabs title={strings.bookingHistory} backButton={false} />
        <Content style={{ backgroundColor: "#fff" }}>
          <Tabs
            page={tabIndex}
            style={{ flex: 0, backgroundColor: "#fff", borderTopWidth: 0 }}
            onChangeTab={({ i }) => this.getHistory(i)}
          >
            <Tab heading={strings.AppointmentHistory}>

            </Tab>
            {/*<Tab
              heading={strings.Past}
              style={{ backgroundColor: "#fff", borderTopWidth: 0 }}
            >

            </Tab>*/}
          </Tabs>
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
  trips: state.trip.trips,
  loading: state.trip.loading,
  userType: state.user.userType,
  tabIndex: state.trip.tabIndex
});

const bindActions = dispatch => ({
  getTripHistory: (status, i) =>
    dispatch(TripActions.getTripHistory(status, i)),
  setFavourite: (favourite, filled) =>
    dispatch(UserActions.setFavourite(favourite, filled))
});

export default connect(
  mapStateToProps,
  bindActions
)(BookingHistory);
