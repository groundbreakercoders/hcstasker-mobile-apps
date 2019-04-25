import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Text } from "react-native";
import { Item, Input, Button, View, Spinner } from "native-base";
import { connect } from "react-redux";
import UserActions from "../../Redux/userstore";

import styles from "./styles";
import commonColor from "../../../native-base-theme/variables/commonColor";

const validate = values => {
  const errors = {};
  if (!values.name) {
    errors.name = "Name is Required";
  } else if (!values.phone) {
    errors.phone = "Phone No is Required";
  }
  return errors;
};
export const input = props => {
  const { meta, input } = props;
  return (
    <View>
      <Item
        style={{
          height: 46,
          borderBottomWidth: meta.active ? 2 : 1,
          borderColor: meta.active ? "blue" : "#c2c6da"
        }}
      >
        <Input
          {...input}
          {...props}
          style={{
            paddingLeft: 0,
            fontSize: 18,
            color: "#44466B",
            paddingBottom: 15
          }}
        />
      </Item>

      {meta.touched &&
        meta.error && <Text style={{ color: "red" }}>{meta.error}</Text>}
    </View>
  );
};

class PaymentForm extends Component {
  submit(values) {
    this.props.dispatch(UserActions.editProfile(values));
  }
  render() {
    const { submitting } = this.props;
    return (
      <View style={{ marginTop: 30 }}>
        <View style={{}}>
          <Text style={{ color: "#44466B", fontSize: 18 }}>NAME</Text>
          <Field
            component={input}
            type="text"
            name="name"
            placeholder={this.props.name}
            placeholderTextColor="#ccc"
            autoCapitalize="none"
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <Text style={{ color: "#44466B", fontSize: 18 }}>PHONE NUMBER</Text>
          <Field
            component={input}
            name="phone"
            autoCapitalize="none"
            placeholder={this.props.phone}
            placeholderTextColor="#ccc"
            keyboardType="numeric"
          />
        </View>
        <Button
          rounded
          bordered
          style={styles.bookButton}
          onPress={this.props.handleSubmit(this.submit.bind(this))}
        >
          {submitting ? (
            <Spinner color={commonColor.brandPrimary} />
          ) : (
            <Text style={styles.buttonText}>Update</Text>
          )}
        </Button>
      </View>
    );
  }
}
const Payment = reduxForm({
  form: "editProfile", // a unique name for this form
  validate
})(PaymentForm);

const mapStateToProps = state => ({
  name: state.user.name,
  phone: state.user.phone
});

const bindActions = dispatch => ({});

export default connect(
  mapStateToProps,
  bindActions
)(Payment);
