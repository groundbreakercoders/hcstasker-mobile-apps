import React, { Component } from "react";
import DatePicker from "react-native-datepicker";
import { Dimensions } from "react-native";
import { Item, View } from "native-base";
import styles from "./styles";

const { width, height } = Dimensions.get("window");

class Datepickercustom extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          width: null
        }}
      >
        <Item
          style={this.props.itemstyle ? this.props.itemstyle : styles.itemstyle}
        >
          <DatePicker
            style={
              this.props.datepickerStyle
                ? this.props.datepickerStyle
                : styles.pickerStyle
            }
            date={this.props.date}
            mode={this.props.mode ? this.props.mode : "date"}
            format={this.props.format ? this.props.format : "MM/YY"}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            androidMode="default"
            showIcon={false}
            customStyles={
              this.props.datestyle ? this.props.datestyle : styles.customStyles
            }
            onDateChange={date => {
              this.props.onUpdate(date);
            }}
          />
        </Item>
      </View>
    );
  }
}

export default Datepickercustom;
