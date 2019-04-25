import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Text, Spinner, Row, Button, Icon, CheckBox } from "native-base";
import { reduxForm, Field } from "redux-form";
import { Actions } from "react-native-router-flux";
import _ from "lodash";
import commonColor from "../../../native-base-theme/variables/commonColor";
import { TouchableOpacity, FlatList, View, Dimensions } from "react-native";
import PaymentActions from "../../Redux/paymentmethodsstore";
const { height, width } = Dimensions.get("window");

class SavedCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
      cardItem: {},
      selected: true
    };
  }
  componentDidMount() {
    this.props.getPaymentMethodsList();
  }

  _keyExtractor = item => item.number;

  renderAsNonEmpty() {
    return (
      <View style={{ flexDirection: "column" }}>
        <FlatList
          style={{ backgroundColor: "#fff" }}
          renderSeparator={() => <View />}
          data={this.props.paymentList}
          _keyExtractor={this._keyExtractor}
          renderItem={this.renderRow}
        />
        <Button
          style={{
            alignSelf: "center",
            marginTop: 30,
            backgroundColor: commonColor.brandPrimary
          }}
          disabled={this.state.selected}
          onPress={() => {
            this.props.updateDefaultCard(this.state.cardItem);
            this.props.onPaymentMethodSelect();
          }}
        >
          <Text>{this.props.strings.choosecard}</Text>
        </Button>
      </View>
    );
  }

  renderAsEmpty = () => {
    const text = this.props.strings.noCards;
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Text style={{ color: "grey", textAlign: "center" }}>{text}</Text>
      </View>
    );
  };

  renderRow = ({ item, index }) => {
    const number = _.get(item, "number", "0000");
    const last4 = number.substr(-4);
    const text = `**** **** **** ${last4}`;

    return (
      <TouchableOpacity
        key={index}
        onPress={() => {
          this.setState({ value: index, cardItem: item, selected: false });
        }}
        style={{
          flexDirection: "row",
          backgroundColor: "#fff",
          paddingVertical: 10,
          borderBottomWidth: 1,
          borderColor: "#8B8DAC"
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 20
          }}
        >
          <CheckBox
            color={commonColor.brandSecondary}
            onPress={() => {
              this.setState({ value: index, cardItem: item, selected: false });
            }}
            checked={index === this.state.value}
          />
        </View>
        <View
          style={{
            flex: 5,
            justifyContent: "space-around",
            alignItems: "flex-start"
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontWeight: "300", color: "#44466B" }}>{text}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontWeight: "300", color: "#8B8DAC" }}>{`${
              item.name
            }`}</Text>
            <Text style={{ fontWeight: "300", color: "#8B8DAC" }}>{`  exp: ${
              item.exp_month
            }/${item.exp_year}`}</Text>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: "flex-end",
            justifyContent: "center",
            marginRight: "5%"
          }}
        >
          <Icon
            style={{ color: commonColor.brandSecondary, fontSize: 34 }}
            name="arrow-forward"
          />
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const isEmpty = _.isEmpty(this.props.paymentList);
    const { submitting } = this.props;
    if (submitting) {
      return (
        <View>
          <Spinner />
        </View>
      );
    }
    return (
      <View style={{ height: height, backgroundColor: "#fff" }}>
        {isEmpty ? this.renderAsEmpty() : this.renderAsNonEmpty()}
      </View>
    );
  }
}

SavedCards = reduxForm({
  form: "payment"
})(SavedCards);

SavedCards.propTypes = {
  removePaymentMethod: PropTypes.func,
  selectOnly: PropTypes.bool,
  submitting: PropTypes.bool,
  paymentList: PropTypes.array,
  onPaymentMethodSelect: PropTypes.func
};

SavedCards.defaultProps = {
  paymentList: []
};

const mapStateToProps = state => ({
  paymentList: state.paymentMethods.paymentList
});

const bindActions = dispatch => ({
  removePaymentMethod: id => dispatch(PaymentActions.removePaymentMethod(id)),
  getPaymentMethodsList: () => dispatch(PaymentActions.getPaymentMethodsList()),
  setPaymentIndex: index => dispatch(PaymentActions.setPaymentIndex(index)),
  updateDefaultCard: card => dispatch(PaymentActions.updateDefaultCard(card))
});

export default connect(
  mapStateToProps,
  bindActions
)(SavedCards);
