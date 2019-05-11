import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Text } from "react-native";
import { Item, Input, Button, Grid, Col, View, Spinner } from "native-base";
import UserActions from "../../Redux/userstore";
import commonColor from "../../../native-base-theme/variables/commonColor";
import styles from "./styles";

const validate = values => {
  const errors = {};
  if (!values.email) {
    errors.email = "Email is Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email";
  } else if (!values.password) {
    errors.password = "Password is Required";
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Entered passwords doesn't match";
  }
  return errors;
};
export const input = props => {
  const { meta, input } = props;
  return (
    <View>
      <Item style={styles.formItem}>
        <Input {...input} {...props} />
      </Item>

      {meta.touched &&
        meta.error && <Text style={{ color: "red" }}>{meta.error}</Text>}
    </View>
  );
};

class LoginForm extends Component {
  submit(values) {
    // this.setState({loading:true})
    console.log("Hello",values)
    this.props.dispatch(UserActions.login(values.email, values.password,"user"));
  }
  render() {
    const locale = this.props.lang;
    const { loading } = this.props;
    console.log(this.props,"LoginPage!!!!!!!!!!!!!")
    return (
      <View style={{ marginTop: 20 }}>
        <View style={{ marginTop: 15 }}>
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
        <View style={{ marginTop: 25 }}>
          <Field
            component={input}
            name="password"
            placeholder={locale.password}
            secureTextEntry
            placeholderTextColor="#c2c6da"
            autoCapitalize="none"
          />
        </View>
        <View>
          <Button
            rounded
            style={styles.loginButton}
            onPress={this.props.handleSubmit(this.submit.bind(this))}

          >
            {loading  ? (
              <Spinner color="#fff" />
            ) : (
              <Text style={styles.buttonText}>{locale.Login}</Text>
            )}
          </Button>
        </View>
      </View>
    );
  }
}
export default reduxForm({
  form: "loginform", // a unique name for this form
  validate,
  destroyOnUnmount: false
})(LoginForm);
