import React, { Component } from "react";
import { Button, Text, Icon, Container, Content } from "native-base";
import { Dimensions, View, Item, Input } from "react-native";
import TaskerServiceForm from "./form";
import { Actions } from "react-native-router-flux";
import styles from "./styles";
import { connect } from "react-redux";
import MaintainAppointmentForm from "./form";


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
              paddingHorizontal: 20,
              paddingBottom: 40
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 20
              }}
            >
              <Button
                style={{ paddingLeft: 0 }}
                transparent
                onPress={() => Actions.pop()}
              >
                <Icon
                  name="ios-arrow-back"
                  style={{
                    fontSize: 35,
                    marginLeft: 0,
                    color: "#43496a"
                  }}
                />
              </Button>
            </View>
            <View style={{ flexDirection: "column", marginTop: 25 }}>
              <Text
                style={{ fontSize: 28, fontWeight: "bold", color: "#43496a" }}
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
