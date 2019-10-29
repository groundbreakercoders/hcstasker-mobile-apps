import React, { Component } from "react";
import { Button, Text, Icon, Container, Content } from "native-base";
import { Dimensions, View, Item, Input } from "react-native";
import TaskerServiceForm from "./form";
import { Actions } from "react-native-router-flux";
import styles from "./styles";
import { connect } from "react-redux";
import MaintainAppointmentForm from "./form";
import Contract from "./contract";
import Header from "../../common/header";
import commonColor from "../../../../native-base-theme/variables/commonColor";
import NurseList from "./nurseList";
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
    const isScrollEnabled = this.props.appointment && this.props.appointment.status != "Contract Released";
    return (
      <Container>
      <Header title={strings.appointment} backButton />
        <Content scrollEnabled={true} style={{ backgroundColor: "#fff" }}>
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
                backgroundColor: commonColor.brandPrimary,
                flexDirection: "row",
                //alignContent: "center",
                //marginTop: 40,
                paddingLeft: 0,
                flex: 6
              }}
            >


            </View>
            {appointment && appointment.status == 'Contract Released' ? (
              <Contract strings={strings} appointment={appointment} />
              //<NurseList appointment={appointment} />
            ):(
              <MaintainAppointmentForm strings={strings} appointment={appointment} />
            )}

          </View>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  email: state.user.email,
  userType: state.user.userType
});

const bindActions = dispatch => ({});

export default connect(
  mapStateToProps,
  bindActions
)(MaintainAppointment);
