import React, { Component } from "react";
import moment from "moment";
import { connect } from "react-redux";
import _ from "lodash";
import {
  View,
  TouchableOpacity,
  Platform,
  TextInput,
  Dimensions
} from "react-native";
import PropTypes from "prop-types";
import {
  Container,
  Text,
  Button,
  Icon,
  Title,
  Thumbnail,
  Left,
  Right,
  Body,
  Content,
  Spinner
} from "native-base";

import styles from "./styles";
import commonColor from "../../../../../native-base-theme/variables/commonColor";


class BookingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log(this.props.allTasker,"AllTasker########### BookingPage")
    // console.log(this.props.Task,"Tasker@@@@@@@@@@@@@@@@")
    const fee = [];
    if (this.props.allTasker) {
      this.props.allTasker.map(index => fee.push(index.fee));
    }
    return (
      <View
        style={{
          flex: 0.8,
          flexDirection: "row",
          borderBottomWidth: 1
        }}
      >
        <View style={{ flex: 1 }}>
          <Button full style={[styles.fullButton1, styles.pricebtn]}>
            <Text style={{ color: "#44466B" }}>{this.props.tasker}</Text>
          </Button>
        </View>
        <View style={{ flex: 1 }}>
          <Button full style={[styles.fullButton1, styles.paybtn]}>
            {this.props.allTasker.length === 1 ? (
              this.props.allTasker.map(index => (
                <Text style={{ color: commonColor.brandPrimary }}>
                  ${index.fee}
                </Text>
              ))
            ) : (
              <Text style={{ color: commonColor.brandPrimary }}>
                ${Math.min.apply(null, fee)}-${Math.max.apply(null, fee)}
              </Text>
            )}
          </Button>
        </View>
      </View>
    );
  }
}

BookingPage.propTypes = {};

function mapStateToProps(state) {
  return {
    tasker: state.user.tasker,
    allTasker: state.user.allTasker,
    Task: state.user
  };
}

const bindActions = dispatch => ({});

export default connect(
  mapStateToProps,
  bindActions
)(BookingPage);
