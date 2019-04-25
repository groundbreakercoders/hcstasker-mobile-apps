import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Text } from "react-native";
import { connect } from "react-redux";
import { Item, Input, Button, View, Spinner } from "native-base";
import UserActions from "../../Redux/userstore";
import styles from "./styles";

const validate = values => {
  const errors = {};
  if (!values.oldpassword) {
    errors.oldpassword = "Old password Required";
  } else if (!values.newpassword) {
    errors.newpassword = "New password Required";
  } else if (values.repassword && values.newpassword !== values.repassword) {
    errors.repassword = "passsword must be same";
  }
  return errors;
};
export const input = props => {
  const { meta, input } = props;
  return (
    <View>
      <Item
        style={{
          height: 36,
          borderColor: "#c2c6da"
        }}
      >
        <Input {...input} {...props} style={{ paddingLeft: 0, fontSize: 18 }} />
      </Item>

      {meta.touched &&
        meta.error && <Text style={{ color: "red" }}>{meta.error}</Text>}
    </View>
  );
};

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      secure1: true,
      secure2: true,
      secure3: true
    };
  }

  submit(values) {
    this.props.changePassword(values);
  }

  render() {
    const lang = this.props.lang;
    const { submitting } = this.props;
    return (
      <View style={{ marginTop: 30 }}>
        <View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ color: "#44466B", fontSize: 18 }}>
              {lang.oldpassword}
            </Text>
            <Button
              transparent
              onPress={() => this.setState({ secure1: !this.state.secure1 })}
            >
              <Text style={{ color: "#44466B", fontSize: 18, marginTop: -15 }}>
                {lang.show}
              </Text>
            </Button>
          </View>
          <Field
            component={input}
            type="password"
            name="oldpassword"
            secureTextEntry={this.state.secure1}
            placeholderTextColor="#c2c6da"
            autoCapitalize="none"
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ color: "#44466B", fontSize: 18 }}>
              {lang.newpassword}
            </Text>
            <Button
              transparent
              onPress={() => this.setState({ secure2: !this.state.secure2 })}
            >
              <Text style={{ color: "#44466B", fontSize: 18, marginTop: -15 }}>
                {lang.show}
              </Text>
            </Button>
          </View>
          <Field
            component={input}
            type="password"
            name="newpassword"
            secureTextEntry={this.state.secure2}
            placeholderTextColor="#c2c6da"
            autoCapitalize="none"
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ color: "#44466B", fontSize: 18 }}>
              {lang.repassword}
            </Text>
            <Button
              transparent
              onPress={() => this.setState({ secure3: !this.state.secure3 })}
            >
              <Text style={{ color: "#44466B", fontSize: 18, marginTop: -15 }}>
                {lang.show}
              </Text>
            </Button>
          </View>
          <Field
            component={input}
            type="password"
            name="repassword"
            secureTextEntry={this.state.secure3}
            placeholderTextColor="#c2c6da"
            autoCapitalize="none"
          />
        </View>
        <Button
          rounded
          bordered
          style={styles.bookButton}
          onPress={this.props.handleSubmit(this.submit.bind(this))}
        >
          {submitting ? (
            <Spinner color="#649fff" />
          ) : (
            <Text style={styles.buttonText}>{lang.submit}</Text>
          )}
        </Button>
      </View>
    );
  }
}

TaskerServiceForm = reduxForm({
  form: "changepassword",
  validate
})(ChangePassword);

const mapStateToProps = state => ({});

const bindActions = dispatch => ({
  changePassword: values => dispatch(UserActions.changePassword(values))
});

export default connect(
  null,
  bindActions
)(TaskerServiceForm);
