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
const image = require("../../assets/avatar.png");
import firebase from "react-native-firebase";
class Tasker extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    const { strings } = this.props;
    return (
      <Container>
        <Header title={this.props.strings[this.props.selectedCategory]}  />
        <Content>
          {this.props.allTasker != null && this.props.allTasker.length > 0 ? (
            <View>
              {_.map(this.props.allTasker, (tasker, key) => (
                <Card  style={styles.card} key={key}>
                  <CardItem
                    style={{ paddingTop: 30, paddingBottom: 30, height: 150 }}
                  >

                    <Item
                      onPress={() => Actions.taskerprofilrepage()}
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
                          <Icon
                            name="ios-star"
                            style={{
                              color: commonColor.brandPrimary,
                              fontSize: 20
                            }}
                          />
                          <Text style={{ paddingRight: 16 }}>
                            {" "}{tasker.rating && tasker.rating > 0  ? tasker.rating : "0"}{" / 5"}
                          </Text>

                        </Text>
                        <Text>$ {tasker.fee ? tasker.fee : "10"} </Text>
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
  origin: state.trip.origin
});

const bindActions = dispatch => ({});

export default connect(
  mapStateToProps,
  bindActions
)(Tasker);
