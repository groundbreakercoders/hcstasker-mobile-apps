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
import _ from "lodash";
import { Dimensions, View } from "react-native";
import { connect } from "react-redux";
import Header from "../common/header";
import { Actions } from "react-native-router-flux";
import commonColor from "../../../native-base-theme/variables/commonColor";
import ImageSwiper from "../common/swiper";
import styles from "./styles";

const { height } = Dimensions.get("window");
const image = require("../../assets/image.png");
import firebase from "react-native-firebase";
class Tasker extends Component {
  constructor(props) {
    super(props);
    console.log(props.cat);
    this.state = {};
    let allTaskers = [];
    firebase
      .firestore()
      .collection("users")
      .where("userType", "==", "tasker")
      .where("category", "==", "nurses")
      .get()
      .then(data => {
        data.forEach(item => {
          const tasker = item.data();
          allTaskers.push(tasker);
        });
        this.setState({
          allTasker: allTaskers
        });
      })
      .catch(err => reject(err));
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
    const d = Math.ceil(R * c); // Distance in km
    return d;
  }

  deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  render() {
    return (
      <Container>
        <Header title={_.get(this.props, "category", "")}  />
        <Content>
          {this.state.allTasker != null ? (
            <View>
              {_.map(this.state.allTasker, (tasker, key) => (
                <Card style={styles.card} key={key}>
                  <CardItem
                    style={{ paddingTop: 30, paddingBottom: 30, height: 150 }}
                  >
                    <Left style={{ flex: 1, height: 150 }}>
                      <Item
                        onPress={() => Actions.taskerprofilrepage()}
                        style={{ borderBottomWidth: 0 }}
                      >
                        <Thumbnail
                          circle
                          source={{ uri: "../../assets/image.png" }}
                          style={{ width: 80, height: 80, borderRadius: 40 }}
                        />
                      </Item>
                      <Body>
                        <Text
                          style={{
                            fontSize: 20,
                            color: "#44466B",
                            fontWeight: "500"
                          }}
                        >
                          {tasker.name ? tasker.name : "dummy name"}
                        </Text>

                        <Text
                          style={{
                            fontSize: 14,
                            color: "#44466B",
                            fontWeight: "500",
                            marginVertical: 5
                          }}
                        >
                          <Icon
                            name="ios-star"
                            style={{
                              color: commonColor.brandPrimary,
                              fontSize: 20
                            }}
                          />{" "}
                          <Text style={{ fontSize: 16 }}>
                            {tasker.rating ? tasker.rating : "4"}
                          </Text>{" "}
                          <Icon
                            name="ios-pin"
                            style={{ color: "#44466B", fontSize: 18 }}
                          />{" "}
                          {" "}
                          km away
                        </Text>
                        <Text>$ {tasker.fee ? tasker.fee : "900"} </Text>
                      </Body>
                    </Left>
                    <Right
                      style={{
                        flex: 0.3,
                        justifyContent: "space-between",
                        alignItems: "center"
                      }}
                    >
                      <View
                        style={{ flexDirection: "row", alignSelf: "center" }}
                      >
                        <Icon
                          name="ios-heart-outline"
                          style={{ color: commonColor.brandSecondary }}
                        />
                      </View>
                      <Button
                        onPress={() => Actions.booking({ tasker })}
                        small
                        style={{
                          marginTop: 10,
                          backgroundColor: commonColor.brandPrimary,
                          borderRadius: 2
                        }}
                      >
                        <Text>Book</Text>
                      </Button>
                    </Right>
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
  allTasker: state.taskerList,
  category: state.user.category,
  origin: state.trip.origin
});

const bindActions = dispatch => ({});

export default connect(
  mapStateToProps,
  bindActions
)(Tasker);
