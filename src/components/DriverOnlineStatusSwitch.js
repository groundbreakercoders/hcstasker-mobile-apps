import React from "react";
import { connect } from "react-redux";
import {Text} from "react-native";
import { View, Title } from "native-base";
import PropTypes from "prop-types";
import Switch from "./Switch";
import DriverActions from "../Redux/driverstore";



const DriverOnlineStatusSwitch = props => (
  
  <View style={{ flexDirection: "row", marginRight: 10 }}>
    {/* <Title
      style={{
        color: "#44466B",
        marginRight: 5,
        opacity: props.isOnline ? 1 : 0.5
      }}
    >{console.log(props,"Driverstatus")}
      {props.isOnline ? "ONLINE" : "OFFLINE"}
    </Title> */}
    {props.userPageStatus === "home" && (
    <Switch
      value={props.isOnline}
      onValueChange={val => props.changeStatus(val)}
    />
    )}
  </View>
);

DriverOnlineStatusSwitch.propTypes = {
  isOnline: PropTypes.bool.isRequired,
  changeStatus: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return { isOnline: state.tasker.isOnline ,
   userPageStatus: state.user.userPageStatus,};
}

const bindActions = dispatch => ({
  changeStatus: isOnline => dispatch(DriverActions.changeStatus(isOnline))
});

export default connect(
  mapStateToProps,
  bindActions
)(DriverOnlineStatusSwitch);
