import React, { Component } from "react";
import { Button, Text, Icon, Container, Content } from "native-base";
import { Dimensions, View, Platform } from "react-native";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import SignUpForm from "./form";
import styles from "./styles";

const { height } = Dimensions.get("window");

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log(position);
      },
      error => console.log(new Date(), error)
    );
  }
  render() {
    const lang = this.props.strings;
    return (
      <Container>
        <Content
          style={{ backgroundColor: "#fff", paddingBottom: 30 }}
          scrollEnabled={true}
          bounces
        >
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              paddingHorizontal: 20,
              paddingBottom: 30
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: Platform.OS === "ios" ? 15 : 5
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
            <View style={{ flexDirection: "column", marginTop: 10 }}>
              <Text
                style={{ fontSize: 30, fontWeight: "bold", color: "#43496a" }}
              >
                {lang.signup}
              </Text>
              <SignUpForm lang={lang} loading={this.props.loading} />
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}


function mapStateToProps(state) {
  return {
    loading: state.user.loading
  };
}

function bindActions(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  bindActions
)(SignUp);
