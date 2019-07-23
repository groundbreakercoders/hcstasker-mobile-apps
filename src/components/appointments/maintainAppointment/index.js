import React, { Component } from "react";
import { Button, Text, Icon, Container, Content } from "native-base";
import { Dimensions, View, Item, Input } from "react-native";
import TaskerServiceForm from "./form";
import { Actions } from "react-native-router-flux";
import styles from "./styles";
import { connect } from "react-redux";
import MaintainAppointmentForm from "./form";

import commonColor from "../../../../native-base-theme/variables/commonColor";
class MaintainAppointment extends Component {


  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: null
    };
  }
  componentDidMount() {

      this.setState({ loading: false });
  }
  render() {
    const { strings, appointment } = this.props;
    return (
      <Container>
        <Content scrollEnabled style={{ backgroundColor: "#fff" }}>
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              //paddingHorizontal: 20,
              //paddingBottom: 40,
            }}
          >
            <View
              style={{
<<<<<<< HEAD
                backgroundColor: "#6495ed",
=======
                backgroundColor: commonColor.brandPrimary,
>>>>>>> 89eb6ea336833b1486f83765f7dbc0668a08852a
                flexDirection: "row",
                //alignContent: "center",
                //marginTop: 40,
                paddingLeft: 0

              }}
            >
              <Button
                style={{ paddingLeft: 0, marginTop:40 }}
                transparent
                onPress={() => Actions.pop()}
              >
                <Icon
                  name="ios-arrow-back"
                  style={{
                    fontSize: 35,
                    marginLeft: 5,
                    color: "white",
                    width: 65
                  }}
                />
              </Button>
              <Text
                style={{fontSize: 28, fontWeight: "bold", color: "white", marginTop: 50 }}
              >
              {this.props.appointment ? (
                strings.editAppointment
              ) : (
                strings.createAppointment
              )}
              </Text>

            </View>
            <MaintainAppointmentForm strings={strings} appointment={appointment} />
          </View>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  email: state.user.email
});

const bindActions = dispatch => ({});

export default connect(
  mapStateToProps,
  bindActions
)(MaintainAppointment);
