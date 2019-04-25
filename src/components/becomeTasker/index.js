import React, { Component } from "react";
import { Button, Text, Icon, Container, Content } from "native-base";
import { Dimensions, View, Item, Input } from "react-native";
import TaskerServiceForm from "./form";
import { Actions } from "react-native-router-flux";
import styles from "./styles";



const { height, width } = Dimensions.get("window");

class TaskerServices extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    // console.log(this.props,"Index##############")
    const { strings } = this.props;
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
                {strings.myservices}
              </Text>
            </View>
            <TaskerServiceForm strings={strings} />
          </View>
        </Content>
      </Container>
    );
  }
}

export default TaskerServices;
