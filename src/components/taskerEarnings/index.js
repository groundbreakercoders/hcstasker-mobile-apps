import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { View, Platform, Dimensions } from "react-native";
import _ from "lodash";
import PropTypes from "prop-types";
import {
  Container,
  Content,
  Button,
  Icon,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Item,
  Title,
  Left,
  Right,
  Spinner,
  Body
} from "native-base";
import { Actions } from "react-native-router-flux";
import TripActions from "../../Redux/tripstore";
import commonColor from "../../../native-base-theme/variables/commonColor";
import Header from "../common/header";
import styles from "./styles";

const { width, height } = Dimensions.get("window");

class Earnings extends Component {
  componentWillMount() {
    this.props.getTripHistory("completed");
  }

  timeDiff(time) {
    const diff = moment().diff(time, "days");
    return diff;
  }

  todayRevenue() {
    let total = 0;
    _.map(this.props.trips, trip => {
      if (
        moment().diff(trip.taskDetails.taskDetails.taskStartTime, "days") === 0
      ) {
        total += trip.taskDetails.taskDetails.fee;
      }
    });
    return total;
  }

  weekRevenue() {
    let total = 0;
    _.map(this.props.trips, trip => {
      if (
        moment().diff(trip.taskDetails.taskDetails.taskStartTime, "weeks") === 0
      ) {
        total += trip.taskDetails.taskDetails.fee;
      }
    });
    return total;
  }

  monthRevenue() {
    let total = 0;
    _.map(this.props.trips, trip => {
      if (
        moment().diff(trip.taskDetails.taskDetails.taskStartTime, "months") ===
        0
      ) {
        total += trip.taskDetails.taskDetails.fee;
      }
    });
    return total;
  }

  yearRevenue() {
    let total = 0;
    _.map(this.props.trips, trip => {
      if (
        moment().diff(trip.taskDetails.taskDetails.taskStartTime, "years") === 0
      ) {
        total += trip.taskDetails.taskDetails.fee;
      }
    });
    return total;
  }

  totalRevenue() {
    let total = 0;
    _.map(this.props.trips, trip => {
      total += trip.taskDetails.taskDetails.fee;
    });
    return total;
  }

  render() {
    const { strings } = this.props;
    return (
      <Container>
        <Content style={{ backgroundColor: "#f2f4f6" }}>
          {this.props.loading ? (
            <Spinner />
          ) : (
            <View style={{ padding: 5 }}>
              <Text
                style={{
                  fontSize: 30,
                  fontWeight: "400",
                  color: "#43496a",
                  marginTop: 30,
                  marginBottom: 15,
                  marginLeft: 10
                }}
              >
                {strings.Earnings}
              </Text>
              <View style={{ backgroundColor: "#fff", margin: 10 }}>
                <View style={styles.Cardwrapper}>
                  <Text
                    style={{
                      fontSize: Platform.OS === "ios" ? 40 : 30,
                      fontWeight: "bold",
                      alignSelf: "center",
                      color: "#44466B"
                    }}
                  >
                    ${this.totalRevenue()}
                  </Text>
                  <Text
                    style={{
                      fontWeight: "400",
                      color: "#44466B",
                      marginTop: 10,
                      alignSelf: "center"
                    }}
                  >
                    {strings.TotalEarnings}
                  </Text>
                </View>
                <View>
                  <Card style={styles.cardEarnings}>
                    <CardItem style={styles.CardItemEarnings}>
                      <Text style={styles.textDay}>{strings.TODAY}</Text>
                      <Text style={styles.textEarnings}>
                        ${this.todayRevenue()}
                      </Text>
                    </CardItem>
                    <CardItem
                      style={{
                        ...styles.CardItemEarnings,
                        borderLeftWidth: 0.5,
                        borderLeftColor: "#ddd"
                      }}
                    >
                      <Text style={styles.textDay}>{strings.Week}</Text>
                      <Text style={styles.textEarnings}>
                        ${this.weekRevenue()}
                      </Text>
                    </CardItem>
                    <CardItem
                      style={{
                        ...styles.CardItemEarnings,
                        borderLeftWidth: 0.5,
                        borderLeftColor: "#ddd"
                      }}
                    >
                      <Text style={styles.textDay}>{strings.Month}</Text>
                      <Text style={styles.textEarnings}>
                        ${this.monthRevenue()}
                      </Text>
                    </CardItem>

                    <CardItem
                      style={{
                        ...styles.CardItemEarnings,
                        borderLeftWidth: 0.5,
                        borderLeftColor: "#ddd"
                      }}
                    >
                      <Text style={styles.textDay}>{strings.Year}</Text>
                      <Text style={styles.textEarnings}>
                        ${this.yearRevenue()}
                      </Text>
                    </CardItem>
                  </Card>
                </View>
              </View>
              <View style={{ marginHorizontal: 5, marginTop: 20 }}>
                <View>
                  <Text
                    style={{
                      fontWeight: "bold",
                      color: "#aaa",
                      fontSize: 20,
                      marginBottom: 10
                    }}
                  >
                    {strings.TODAY}
                  </Text>
                  {_.map(
                    this.props.trips,
                    (trip, index) =>
                      this.timeDiff(
                        trip.taskDetails.taskDetails.taskStartTime
                      ) === 0 ? (
                        <Card key={index} style={styles.historyCard}>
                          <CardItem
                            style={{
                              ...styles.historyCardItem,
                              borderTopLeftRadius: 4,
                              borderBottomLeftRadius: 4,
                              paddingLeft: 10,
                              paddingTop: 20,
                              paddingBottom: 20,
                              flex: 0.8,
                              backgroundColor: "#fff"
                            }}
                          >
                            <Text style={styles.textHeading}>
                              {strings.Received}
                            </Text>
                            <Text style={styles.textValue}>
                              ${_.get(
                                trip,
                                "taskDetails.taskDetails.fee",
                                "80"
                              )}
                            </Text>
                          </CardItem>
                          <CardItem
                            style={{ ...styles.historyCardItem, flex: 1 }}
                          >
                            <Text style={styles.textHeading}>
                              {strings.ReceivedVia}
                            </Text>
                            <Text style={styles.textValue}>
                              {_.get(
                                trip,
                                "taskDetails.taskDetails.paymentMode",
                                "-"
                              )}
                            </Text>
                          </CardItem>
                          <CardItem style={styles.historyCardItem}>
                            <Text style={styles.textHeading}>
                              {strings.task}
                            </Text>
                            <Text style={styles.textValue}>
                              {trip.taskDetails.taskDetails.category}
                            </Text>
                          </CardItem>
                          <CardItem
                            style={{
                              ...styles.historyCardItem,
                              borderTopRightRadius: 4,
                              borderBottomRightRadius: 4,
                              flex: 0.6
                            }}
                          >
                            <Text style={styles.textHeading}>
                              {strings.time}
                            </Text>
                            <Text style={styles.textValue}>
                              {moment(
                                trip.taskDetails.taskDetails.taskEndTime
                              ).format("h:mm a")}{" "}
                            </Text>
                          </CardItem>
                        </Card>
                      ) : null
                  )}
                </View>
                <View>
                  <Text
                    style={{
                      fontWeight: "bold",
                      color: "#aaa",
                      fontSize: 20,
                      marginTop: 10,
                      marginBottom: 10
                    }}
                  >
                    {strings.YESTERDAY}
                  </Text>
                  {_.map(
                    this.props.trips,
                    (trip, index) =>
                      this.timeDiff(
                        trip.taskDetails.taskDetails.taskStartTime
                      ) === 1 ? (
                        <Card key={index} style={styles.historyCard}>
                          <CardItem
                            style={{
                              ...styles.historyCardItem,
                              borderTopLeftRadius: 4,
                              borderBottomLeftRadius: 4,
                              paddingLeft: 10,
                              paddingTop: 20,
                              paddingBottom: 20,
                              flex: 0.8,
                              backgroundColor: "#fff"
                            }}
                          >
                            <Text style={styles.textHeading}>
                              {strings.Received}
                            </Text>
                            <Text style={styles.textValue}>
                              ${_.get(
                                trip,
                                "taskDetails.taskDetails.fee",
                                "80"
                              )}
                            </Text>
                          </CardItem>
                          <CardItem
                            style={{ ...styles.historyCardItem, flex: 1 }}
                          >
                            <Text style={styles.textHeading}>
                              {strings.ReceivedVia}
                            </Text>
                            <Text style={styles.textValue}>
                              {_.get(
                                trip,
                                "taskDetails.taskDetails.paymentMode",
                                "-"
                              )}
                            </Text>
                          </CardItem>
                          <CardItem style={styles.historyCardItem}>
                            <Text style={styles.textHeading}>
                              {strings.task}
                            </Text>
                            <Text style={styles.textValue}>
                              {trip.taskDetails.taskDetails.category}
                            </Text>
                          </CardItem>
                          <CardItem
                            style={{
                              ...styles.historyCardItem,
                              borderTopRightRadius: 4,
                              borderBottomRightRadius: 4,
                              flex: 0.6
                            }}
                          >
                            <Text style={styles.textHeading}>
                              {strings.time}
                            </Text>
                            <Text style={styles.textValue}>
                              {moment(
                                trip.taskDetails.taskDetails.taskEndTime
                              ).format("h:mm a")}{" "}
                            </Text>
                          </CardItem>
                        </Card>
                      ) : null
                  )}
                </View>
                <View>
                  <Text
                    style={{
                      fontWeight: "bold",
                      color: "#aaa",
                      fontSize: 20,
                      marginTop: 10,
                      marginBottom: 10
                    }}
                  >
                    {strings.Past}
                  </Text>
                  {_.map(
                    this.props.trips,
                    (trip, index) =>
                      this.timeDiff(
                        trip.taskDetails.taskDetails.taskStartTime
                      ) > 1 ? (
                        <Card key={index} style={styles.historyCard}>
                          <CardItem
                            style={{
                              ...styles.historyCardItem,
                              borderTopLeftRadius: 4,
                              borderBottomLeftRadius: 4,
                              paddingLeft: 10,
                              paddingTop: 20,
                              paddingBottom: 20,
                              flex: 0.8,
                              backgroundColor: "#fff"
                            }}
                          >
                            <Text style={styles.textHeading}>
                              {strings.Received}
                            </Text>
                            <Text style={styles.textValue}>
                              ${_.get(
                                trip,
                                "taskDetails.taskDetails.fee",
                                "80"
                              )}
                            </Text>
                          </CardItem>
                          <CardItem
                            style={{ ...styles.historyCardItem, flex: 1 }}
                          >
                            <Text style={styles.textHeading}>
                              {strings.ReceivedVia}
                            </Text>
                            <Text style={styles.textValue}>
                              {_.get(
                                trip,
                                "taskDetails.taskDetails.paymentMode",
                                "-"
                              )}
                            </Text>
                          </CardItem>
                          <CardItem style={styles.historyCardItem}>
                            <Text style={styles.textHeading}>
                              {strings.task}
                            </Text>
                            <Text style={styles.textValue}>
                              {trip.taskDetails.taskDetails.category}
                            </Text>
                          </CardItem>
                          <CardItem
                            style={{
                              ...styles.historyCardItem,
                              borderTopRightRadius: 4,
                              borderBottomRightRadius: 4,
                              flex: 0.6
                            }}
                          >
                            <Text style={styles.textHeading}>
                              {strings.time}
                            </Text>
                            <Text style={styles.textValue}>
                              {moment(
                                trip.taskDetails.taskDetails.taskEndTime
                              ).format("h:mm a")}{" "}
                            </Text>
                          </CardItem>
                        </Card>
                      ) : null
                  )}
                </View>
              </View>
            </View>
          )}
        </Content>
      </Container>
    );
  }
}

Earnings.propTypes = {
  getTripHistory: PropTypes.func.isRequired,
  trips: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  trips: state.trip.trips,
  loading: state.trip.loading
});

const bindActions = dispatch => ({
  getTripHistory: status => dispatch(TripActions.getTripHistory(status))
});

export default connect(
  mapStateToProps,
  bindActions
)(Earnings);
