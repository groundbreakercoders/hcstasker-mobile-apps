import React from "react";
import PropTypes from "prop-types";
import { Switch as DefaultSwitch } from "react-native";
import commonColor from "../../native-base-theme/variables/commonColor";
import { guide } from "../theme";

const Switch = props => (
  <DefaultSwitch
    thumbTintColor={props.value ? commonColor.brandSecondary : null}
    value={props.value}
    onValueChange={props.onValueChange}
  />
);

export default Switch;

Switch.propTypes = {
  value: PropTypes.bool,
  onValueChange: PropTypes.func
};

Switch.defaultProps = {
  value: false,
  onValueChange: null
};
