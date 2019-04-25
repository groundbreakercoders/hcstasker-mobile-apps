import React, { Component } from "react";
import { StyleSheet, Text, View, Image, Platform } from "react-native";

import Swiper from "react-native-swiper";
import commonColor from "../../../../native-base-theme/variables/commonColor";

const image1 = require("../../../assets/1.png");
const image2 = require("../../../assets/2.png");
const image3 = require("../../../assets/3.png");

const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  slide2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  slide3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    color: "#43496a",
    fontSize: 20,
    textAlign: "center",
    alignSelf: "center"
  },
  boldtext: {
    color: commonColor.brandPrimary,
    fontSize: 30,
    marginBottom: 15,
    fontWeight: "bold"
  }
});

export default class ImageSwiper extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  renderDot() {
    return (
      <View
        style={{
          backgroundColor: "rgba(0,0,0,.2)",
          width: 10,
          height: 10,
          borderRadius: 5,
          marginLeft: 3,
          marginRight: 3,
          marginTop: 0,
          marginBottom: 3
        }}
      />
    );
  }
  renderActiveDot() {
    return (
      <View
        style={{
          backgroundColor: commonColor.brandPrimary,
          width: 12,
          height: 12,
          borderRadius: 6,
          marginLeft: 3,
          marginRight: 3,
          marginTop: 0,
          marginBottom: 3
        }}
      />
    );
  }
  render() {
    const lang = this.props.lang;
    return (
      <Swiper
        autoplay={Platform.OS === "ios" ? true : false}
        style={styles.wrapper}
        autoplayTimeout={1}
        showsButtons={Platform.OS === "ios" ? false : true}
        dot={this.renderDot()}
        activeDot={this.renderActiveDot()}
      >
        <View style={styles.slide1}>
          <Image source={image1} />
          <Text style={styles.boldtext}>{lang.taskman}</Text>
          <Text style={styles.text}>{lang.organized}</Text>
          <Text style={styles.text}> {lang.more} </Text>
        </View>
        <View style={styles.slide2}>
          <Image source={image2} />
          <Text style={styles.boldtext}>{lang.getorganized}</Text>
          <Text style={styles.text}>{lang.organized}</Text>
          <Text style={styles.text}> {lang.more} </Text>
        </View>
        <View style={styles.slide3}>
          <Image source={image3} />
          <Text style={styles.boldtext}>{lang.group}</Text>
          <Text style={styles.text}>{lang.organized}</Text>
          <Text style={styles.text}> {lang.more} </Text>
        </View>
      </Swiper>
    );
  }
}
