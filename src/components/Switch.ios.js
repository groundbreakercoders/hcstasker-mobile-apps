import React from "react";
import PropTypes from "prop-types";
import { Switch as DefaultSwitch } from "native-base";
import commonColor from "../../native-base-theme/variables/commonColor";

const Switch = props => (
  <DefaultSwitch
    onTintColor={commonColor.brandPrimary}
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
