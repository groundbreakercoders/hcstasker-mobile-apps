import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Dimensions } from "react-native";
import { Actions } from "react-native-router-flux";
import { reduxForm } from "redux-form";
import {
  View,
  Button,
  Text,
  Content,
  Footer,
  FooterTab,
  Spinner
} from "native-base";
import { CreditCardInput } from "react-native-credit-card-input";
import Modal from "../common/modal";
import PaymentActions from "../../Redux/paymentmethodsstore";
import commonColor from "../../../native-base-theme/variables/commonColor";

const { height, width } = Dimensions.get("window");

const s = {
  switch: {
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 20
  },
  container: {
    backgroundColor: "#F5F5F5",
    flex: 1,
    backgroundColor: "#fff"
  },
  label: {
    color: "black",
    fontSize: 12
  },
  input: {
    fontSize: 16,
    color: "black"
  }
};

class AddPayment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isInvalid: false
    };
  }
  _onChange = formData => this.setState({ formData });

  onSubmit = () => {
    if (this.state.formData.valid === true) {
      const values = this.state.formData.values;
      this.setState({
        isInvalid: false
      });
      var cardExpiryDetails = values.expiry.split("/");
      const carddata = {
        type: values.type,
        name: values.name,
        number: values.number,
        exp_year: parseInt(cardExpiryDetails[1]),
        exp_month: parseInt(cardExpiryDetails[0]),
        cvc: values.cvc
      };
      this.props.addPaymentMethod(carddata);
    } else {
      this.setState({
        isInvalid: true
      });
    }
  };

  render() {
    const { submitting, strings } = this.props;
    return (
      <View style={s.container}>
        <Modal Visible={submitting} />
        <Content keyboardShouldPersistTaps="always" style={{ marginTop: 20 }}>
          <CreditCardInput
            autoFocus
            requiresName
            requiresCVC
            labelStyle={s.label}
            inputStyle={s.input}
            validColor="black"
            invalidColor="red"
            placeholderColor="darkgray"
            onChange={this._onChange}
          />
          {this.state.isInvalid && (
            <Text style={{ color: "red" }}>{strings.invalidInput}</Text>
          )}
          <Button
            bordered
            rounded
            style={{
              backgroundColor: "#fff",
              borderColor: commonColor.brandPrimary,
              width: width - 120,
              alignSelf: "center",
              marginTop: 30,
              justifyContent: "center"
            }}
            onPress={this.onSubmit}
          >
            <Text style={{ color: commonColor.brandPrimary, fontSize: 16 }}>
              {strings.addCard}
            </Text>
          </Button>
        </Content>
        {/* )} */}
      </View>
    );
  }
}

const AddPayment1 = reduxForm({
  form: "addPayment"
})(AddPayment);

AddPayment.propTypes = {
  addPaymentMethod: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  paymentList: state.paymentMethods.paymentList
});

const bindActions = dispatch => ({
  addPaymentMethod: values => dispatch(PaymentActions.addPaymentMethod(values))
});

export default connect(
  mapStateToProps,
  bindActions
)(AddPayment1);
