import React, { Component } from "react";
import {
  Button,
  Text,
  Container,
  Content,
  Icon,
  ListItem,
  List,
  Item
} from "native-base";
import {
  Dimensions,
  View,
  FlatList,
  TouchableOpacity,
  Modal,
  TouchableHighlight
} from "react-native";
import { connect } from "react-redux";
import { Actions as NavigationActions } from "react-native-router-flux";
import PropTypes from "prop-types";
import MIcon from "../common/mIcon";
import { Actions } from "react-native-router-flux";
import ImageSwiper from "../common/swiper";
import styles from "./styles";
import UserActions from "../../Redux/userstore";
import commonColor from "../../../native-base-theme/variables/commonColor";

const { height, width } = Dimensions.get("window");

const language = [
  "English"
];

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false
    };
  }

  logout() {
    this.props.logOut();
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  onPress(index) {
    const { navigation } = this.props.navigation;
    switch (index) {
      case '1':
        Actions.TaskerServices();
        break;
      case '2':
        this.setModalVisible(true);
        break;
      case '3':
        NavigationActions.PaymentPage();
        break;
      case '4':
        NavigationActions.changepassword();
        break;
      case '5':
        this.logout();
      default:
        console.log("default");
    }
  }

  onSelect(index) {
    let lang = "";
    this.setModalVisible(false);
    if (index === "English") {
      this.props.strings.setLanguage("en");
      lang = "en";
    }
    this.props.updateLanguage(lang);
  }

  _keyExtractor = (item, index) => item.index;
  _renderItem = ({ item, index }) => (
    <TouchableOpacity
      key={item.index}
      style={styles.listItem}
      onPress={() => this.onPress(item.index)}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.listText}>{item.name}</Text>
        <MIcon
          family={item.iconFamily}
          name={item.icon}
          style={{
            fontSize: 30,
            paddingRight: 0,
            color: "#8B8DAC"
          }}
        />
      </View>
    </TouchableOpacity>
  );

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
    const navigation = this.props.navigation;
    const locale = this.props.strings;
    const data = [
      {
        index: "1",
        name: locale.myservices,
        iconFamily: "Ionicons",
        icon: "ios-bulb-outline"
      },
      {
        index: "2",
        name: locale.language,
        iconFamily: "Ionicons",
        icon: "ios-flag-outline"
      },
      {
        index: "3",
        name: locale.payment,
        iconFamily: "Ionicons",
        icon: "ios-card-outline"
      },
      {
        index: "4",
        name: locale.changepassword,
        icon: "ios-key-outline",
        iconFamily: "Ionicons"
      },
      {
        index: "5",
        name: locale.signout,
        icon: "ios-people-outline",
        iconFamily: "Ionicons"
      }
    ];
    return (
      <Container>
        <Content style={{ backgroundColor: "#fff" }}>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              alert("Modal has been closed.");
            }}
          >
            <View style={{ marginTop: 22, marginLeft: 20 }}>
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingVertical: 10
                  }}
                >
                  <Text style={styles.modalText}>{locale.ChooseLanguage}</Text>
                  <Item
                    style={{ borderBottomWidth: 0 }}
                    onPress={() => this.setModalVisible(false)}
                  >
                    <MIcon
                      family="Ionicons"
                      name="close"
                      style={{
                        fontSize: 22,
                        fontWeight: "bold",
                        padding: 10,
                        paddingTop: 0,
                        marginTop: 15,
                        marginRight: 20,
                        color: "#43496a"
                      }}
                    />
                  </Item>
                </View>
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
          </Modal>
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              height,
              padding: 20
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 40,
                marginBottom: 40
              }}
            >
              <Text style={{ fontSize: 25, color: "#44466B" }}>
                {this.props.name}
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("editprofile")}
                style={{ height: 50, width: 50, alignItems: "center" }}
              >
                <MIcon
                  family="Ionicons"
                  name="create"
                  style={{
                    fontSize: 25,
                    paddingRight: 0,
                    color: "#44466B"
                  }}
                />
              </TouchableOpacity>
            </View>
            <View>
              <FlatList
                style={styles.flatList}
                data={data}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
              />
            </View>
            </View>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  name: state.user.name,
  lang: state.user.lang,
  isTasker: state.user.isTasker,
  fcmtoken: state.user.fcmtoken
});

const bindActions = dispatch => ({
  logOut: () => dispatch(UserActions.logOut()),
  updateLanguage: lang => dispatch(UserActions.updateLanguage(lang)),
  sendNotification: (token, title, body) =>
    dispatch(UserActions.sendNotification(token, title, body))
});

export default connect(
  mapStateToProps,
  bindActions
)(Account);
