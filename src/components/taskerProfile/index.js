import React, { Component } from "react";
import {
  Button,
  Left,
  Text,
  Container,
  Content,
  Right,
  Item,
  Icon
} from "native-base";
import { Actions } from "react-native-router-flux";
import _ from "lodash";
import { Dimensions, View, ImageBackground } from "react-native";
import commonColor from "../../../native-base-theme/variables/commonColor";
import MapView from "react-native-maps";
import MIcon from "../common/mIcon";
import styles from "./styles";

const { height, width } = Dimensions.get("window");
const image = require("../../assets/image.png");

const Reviews = [
  {
    name: "Victoria Williamson",
    reviewDate: "jan 24, 2018",
    rating: 4,
    review:
      "Happy withDoctor friendliness, Explanation of the health issue, Value for money."
  },
  {
    name: "Gordan Wallace",
    reviewDate: "jan 9, 2018",
    rating: 3,
    review:
      "Happy withDoctor friendliness, Explanation of the health issue, Treatment satisfaction, Value for money. "
  }
];
const ProfileData = {
  name: "Max Henderson",
  certificate: "BDS, FAGE Certificate",
  dist: 2,
  rating: 4,
  fee: 900,
  desc:
    "She graduated from KMC Mangalore and was trained in Phacoemulsification surgery at Narayana Nethralaya, Bengaluru. She had her vitreo retinal training in Minto Ophthalmic hospital, Bengaluru."
};

class TaskerProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Container>
        <Content style={{ backgroundColor: "#fff" }}>
          <View>
            <ImageBackground
              resizeMode="cover"
              style={{
                flex: 1,
                height: height / 3 + 50,
                width
              }}
              source={image}
            >
              <Item onPress={() => Actions.pop()} style={styles.imageItem}>
                <Icon
                  name="ios-arrow-back"
                  style={{
                    fontSize: 35,
                    alignSelf: "center",
                    color: "#43496a",
                    paddingRight: 4,
                    paddingTop: 2
                  }}
                />
              </Item>
            </ImageBackground>
            <View
              style={{
                flexDirection: "row",
                padding: 15,
                borderBottomWidth: 1,
                borderBottomColor: "#ddd"
              }}
            >
              <Left
                style={{
                  flex: 1,
                  flexDirection: "column",
                  justifyContent: "space-around"
                }}
              >
                <Text
                  style={{ fontSize: 20, fontWeight: "bold", color: "#44466B" }}
                >
                  {ProfileData.name}
                </Text>
                <Text note style={{ marginTop: 5, color: "#8B8DAC" }}>
                  <Icon
                    name="ios-pin"
                    style={{ fontSize: 18, color: "#8B8DAC" }}
                  />{" "}
                  {ProfileData.dist} km away
                  {"  "}
                  <Icon
                    name="ios-star"
                    style={{ fontSize: 18, color: commonColor.brandPrimary }}
                  />
                  <Text
                    style={{
                      color: commonColor.brandPrimary,
                      fontSize: 17,
                      fontWeight: "bold"
                    }}
                  >
                    {ProfileData.rating}
                  </Text>
                </Text>
              </Left>
              <Right style={{ flex: 0.5 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-evenly"
                  }}
                >
                  <Icon name="ios-heart-outline" style={{ color: "#8B8DAC" }} />
                </View>
                <Text style={{ color: "#44466B" }}>INR {ProfileData.fee}</Text>
              </Right>
            </View>
            <View
              style={{
                padding: 15,
                borderBottomWidth: 1,
                borderBottomColor: "#ddd"
              }}
            >
              <Text style={{ color: "#8A8FAB" }}>{ProfileData.desc}</Text>
            </View>
            <View style={{ padding: 15 }}>
              <Item style={styles.mapItem}>
                <MIcon
                  family="SimpleLineIcons"
                  name="notebook"
                  style={{
                    fontSize: 30,
                    paddingRight: 0,
                    color: "#fff"
                  }}
                />
              </Item>
            </View>
            <View style={styles.reviewCont}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingVertical: 10
                }}
              >
                <Text style={{ fontSize: 24, color: "#44466B" }}>Reviews</Text>
              </View>
              {_.map(Reviews, (review, index) => (
                <View
                  style={{
                    paddingTop: 15,
                    borderBottomWidth: 1,
                    borderBottomColor: "#ddd"
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between"
                    }}
                  >
                    <View>
                      <Text style={{ fontSize: 18, color: "#44466B" }}>
                        {review.name}
                      </Text>
                      <Text note style={{}}>
                        on {review.reviewDate}
                      </Text>
                    </View>
                    <Text
                      style={{ fontSize: 12, color: commonColor.brandPrimary }}
                    >
                      RATED:{" "}
                      <Icon
                        name="ios-star"
                        style={{
                          fontSize: 16,
                          paddingRight: 0,
                          color: commonColor.brandPrimary
                        }}
                      />
                      <Text style={{ color: commonColor.brandPrimary }}>
                        {review.rating}
                      </Text>
                    </Text>
                  </View>
                  <View style={{ paddingVertical: 15 }}>
                    <Text style={{ color: "#8a8fab" }}>{review.review}</Text>
                  </View>
                </View>
              ))}
            </View>
            <Button rounded bordered style={styles.readButton}>
              <Text style={styles.readText}>Read all reviews</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}

export default TaskerProfile;
