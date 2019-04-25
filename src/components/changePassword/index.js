import React, { Component } from "react";
import { Button, Text, Icon, Container, Content } from "native-base";
import { Dimensions, View } from "react-native";
import { Actions } from "react-native-router-flux";
import ChangePasswordForm from "./form";
import styles from "./styles";

const { height } = Dimensions.get("window");

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const lang = this.props.strings;
    return (
      <Container>
        <Content style={{ backgroundColor: "#fff" }}>
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              height,
              paddingHorizontal: 20
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
                {lang.changepassword}
              </Text>
              <Text
                style={{
                  fontSize: 22,
                  marginTop: 15,
                  fontWeight: "500",
                  color: "#8a8fab"
                }}
              >
                {lang.usechar}
              </Text>
              <ChangePasswordForm lang={lang} />
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}

export default ChangePassword;
