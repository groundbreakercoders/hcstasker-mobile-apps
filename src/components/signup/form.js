import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Text } from "react-native";
import { Item, Input, Button, Grid, Col, View, Spinner } from "native-base";
import PropTypes from "prop-types";

import UserActions from "../../Redux/userstore";
import commonColor from "../../../native-base-theme/variables/commonColor";
import styles from "./styles";
import TripActions from "../../Redux/tripstore";

const validate = values => {
  const errors = {};
  if (!values.name) {
    errors.name = "Name is Required";
  } else if (!values.phone) {
    errors.phone = "Phone No is Required";
  } else if (!values.email) {
    errors.email = "Email is Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email";
  } else if (!values.password) {
    errors.password = "Password is Required";
  } else if (values.password.length < 8) {
    errors.password = "Passwrd must be more than 8 characters";
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
        meta.error && (
          <Text style={{ color: "red", marginLeft: 20 }}>{meta.error}</Text>
        )}
    </View>
  );
};

class SignUpForm extends Component {
  submit(values) {
    this.props.dispatch(UserActions.signUp(values));
  }
  render() {
    const locale = this.props.lang;
    const { loading } = this.props;
    return (
      <View style={{ marginTop: 10 }}>
        <View style={styles.inputView}>
          <Field
            component={input}
            type="text"
            name="name"
            placeholder={locale.name}
            placeholderTextColor="#c2c6da"
            autoCapitalize="none"
          />
        </View>
        <View style={styles.inputView}>
          <Field
            component={input}
            type="phone"
            name="phone"
            placeholder={locale.phoneno}
            keyboardType="numeric"
            placeholderTextColor="#c2c6da"
            autoCapitalize="none"
          />
        </View>
        <View style={styles.inputView}>
          <Field
            component={input}
            type="email"
            name="email"
            placeholder={locale.emailaddress}
            placeholderTextColor="#c2c6da"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <View style={styles.inputView}>
          <Field
            component={input}
            name="password"
            placeholder={locale.password}
            secureTextEntry
            placeholderTextColor="#c2c6da"
            autoCapitalize="none"
          />
        </View>
        <Text
          style={{
            color: "#8a8fab",
            margin: 15,
            alignSelf: "center",
            fontSize: 16,
            fontWeight: "bold"
          }}
        >
          {locale.usechar}
        </Text>
        <Button
          onPress={this.props.handleSubmit(this.submit.bind(this))}
          rounded
          block
          style={styles.loginButton}
        >
          {loading ? (
            <Spinner color="#fff" />
          ) : (
            <Text style={styles.buttonText}>{locale.signup}</Text>
          )}
        </Button>
      </View>
    );
  }
}
export default reduxForm({
  form: "signupform",
  validate,
  destroyOnUnmount: false
})(SignUpForm);
