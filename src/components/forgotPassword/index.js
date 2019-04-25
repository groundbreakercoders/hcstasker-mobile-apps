import React, { Component } from "react";
import { Button, Text, Icon, Container, Content } from "native-base";
import { Dimensions, View, TouchableOpacity, FlatList } from "react-native";
import { Actions } from "react-native-router-flux";
import styles from "./styles";

const { height } = Dimensions.get("window");

const language = [
  "English",
  "Français",
  "Deutsche",
  "Español",
  "Português",
  "日本語",
  "普通话"
];

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onSelect(index) {
    if (index === "English") {
      this.props.strings.setLanguage("en");
    } else if (index === "Français") {
      this.props.strings.setLanguage("fr");
    } else if (index === "Deutsche") {
      this.props.strings.setLanguage("de");
    } else if (index === "Español") {
      this.props.strings.setLanguage("es");
    } else if (index === "Português") {
      this.props.strings.setLanguage("po");
    } else if (index === "日本語") {
      this.props.strings.setLanguage("jp");
    } else this.props.strings.setLanguage("ch");

    Actions.pop();
  }

  _keyExtractor = (item, index) => item.id;

  _renderLanguage = ({ item, index }) => (
    <TouchableOpacity
      key={index}
      style={styles.listItem}
      onPress={() => this.onSelect(item)}
    >
      <View>
        <Text style={styles.listText}>{item}</Text>
      </View>
    </TouchableOpacity>
  );

  render() {
    return (
      <Container>
        <Content scrollEnabled={false}>
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
                Choose Language
              </Text>
              <View>
                <FlatList
                  style={styles.flatList}
                  data={language}
                  renderItem={this._renderLanguage}
                  keyExtractor={this._keyExtractor}
                />
              </View>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}

export default ForgotPassword;
