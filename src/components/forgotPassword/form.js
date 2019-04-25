import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Text } from "react-native";
import { Item, Input, Button, Grid, Col, View, Spinner } from "native-base";

import commonColor from "../../../native-base-theme/variables/commonColor";
import styles from "./styles";

const validate = values => {
  const errors = {};
  if (!values.email) {
    errors.email = "Email is Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email";
  }
  return errors;
};
export const input = props => {
  const { meta, input } = props;
  return (
    <View>
      <Item
        style={{
          height: 56,
          padding: 10,
          marginTop: 20,
          borderTopWidth: 2,
          borderLeftWidth: 2,
          borderRightWidth: 2,
          borderBottomWidth: 2,
          borderColor: "#c2c6da",
          borderRadius: 28
        }}
      >
        <Input {...input} {...props} />
      </Item>

      {meta.touched &&
        meta.error && <Text style={{ color: "red" }}>{meta.error}</Text>}
    </View>
  );
};

class ForgotPasswordForm extends Component {
  componentWillMount() {
    this.setState({
    });
  }
  submit(values) {
  }
  render() {
    return (
      <View style={{ marginTop: 20 }}>
        <View style={{}}>
          <Field
            component={input}
            type="email"
            name="email"
            placeholder="Email Address"
            placeholderTextColor="#c2c6da"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <Button rounded block style={styles.loginButton}>
          <Text style={styles.buttonText}>Submit</Text>
        </Button>
      </View>
    );
  }
}
export default reduxForm({
  form: "forgotpasswordform", // a unique name for this form
  validate
})(ForgotPasswordForm);
