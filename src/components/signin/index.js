import React, { Component } from "react";
import { Button, Text, Container, Content, Icon, Item } from "native-base";
import {
  Dimensions,
  View,
  Platform,
  Modal,
  FlatList,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { guide } from "../../theme";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Actions } from "react-native-router-flux";
import ImageSwiper from "../common/swiper";
import MIcon from "../common/mIcon";
import styles from "./styles";
import UserActions from "../../Redux/userstore";
import TripActions from "../../Redux/tripstore";

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

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      loader: true,
      disabled: false
    };
  }

  pressButton(){
    this.setState({
      disabled: true
    })

   setTimeout(() => {
    this.setState({
      disabled:false
    });
  }, 5000)
}

  onSelect(index) {
    let lang = "";
    this.setModalVisible(false);
    if (index === "English") {
      this.props.strings.setLanguage("en");
      lang = "en";
    } else if (index === "Français") {
      this.props.strings.setLanguage("fr");
      lang = "fr";
    } else if (index === "Deutsche") {
      this.props.strings.setLanguage("de");
      lang = "de";
    } else if (index === "Español") {
      this.props.strings.setLanguage("es");
      lang = "es";
    } else if (index === "Português") {
      this.props.strings.setLanguage("po");
      lang = "po";
    } else if (index === "日本語") {
      this.props.strings.setLanguage("jp");
      lang = "jp";
    } else {
      this.props.strings.setLanguage("ch");
      lang = "ch";
    }
    this.props.updateLanguage(lang);
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  callMe() {
    navigator.geolocation.getCurrentPosition(
      position => {
        const region = {
          ...({ latitude, longitude } = position.coords),
          ...guide.components.map.latLngDelta
        };
        this.props.setUserLocation(region);
      },
      error => console.log(new Date(), error)
    );
  }
  componentwillMount(){
    console.log("call me")
    this.callMe();
  }
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
  
    const lang = this.props.strings;
    if(this.props.User.loading){
        return(

      <Container>
        <Content
          scrollEnabled={true}
          style={{ backgroundColor: "#fff", flex: 1, height }}
        >
          <View style={{ flex: 1, flexDirection: "column", height }}>
            <View style={{ flex: Platform.OS === "ios" ? 2.7 : 2.7 }}>
              <ImageSwiper lang={lang} />

              <View style={{flex:1,justifyContent:"center",alignItems:"center",position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                backgroundColor:"#F5FCFF88"
                }}>
                  <ActivityIndicator color="blue" size="large"></ActivityIndicator>
              </View>

            
            </View>
            <View style={styles.buttonsView}>
              <Button disabled
                onPress={() => {
                  Actions.loginUser()
                }}
                rounded
                style={styles.loginButton}
              >
                <Text style={styles.buttonText}>{lang.loginUser}</Text>
              </Button>

              <Button disabled
                onPress={() => {
                  Actions.loginTasker()
                   
                    
                }}
                rounded
                style={[styles.loginButton]}
              >
                  <Text style={styles.buttonText}>{lang.LoginTasker}</Text>
              </Button>
              <Button
                onPress={() => this.setModalVisible(true)}
                style={{
                  paddingRight: 0,
                  alignContent: "center",
                  alignSelf: "center",
                  marginTop: -5,
                  paddingTop: 0,
                  paddingBottom: Platform.OS === "ios" ? 6 : 10
                }}
                transparent
              >
                <Text style={styles.forgotText}>{lang.changelanguage}</Text>
              </Button>
            </View>
          </View>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {}}
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
                  <Text style={styles.modalText}>{lang.changelanguage}</Text>
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
        </Content>
      </Container>
         )}
    return (
      <Container>
        <Content
          scrollEnabled={true}
          style={{ backgroundColor: "#fff", flex: 1, height }}
        >
          <View style={{ flex: 1, flexDirection: "column", height }}>
            <View style={{ flex: Platform.OS === "ios" ? 2.7 : 2.7 }}>
              <ImageSwiper lang={lang} />
            </View>
            <View style={styles.buttonsView}>
              <Button
                onPress={() => {
                  Actions.loginUser()
                    
                }}
                rounded
                style={styles.loginButton}
              >
                <Text style={styles.buttonText}>{lang.LoginUser}</Text>
              </Button>
              <Button
                onPress={() => {
                  Actions.loginTasker()
                    
                }}
                rounded
                style={styles.loginTaskerButton}
              >
                <Text style={styles.buttonText}>{lang.LoginTasker}</Text>
              </Button>

              <Button
                onPress={() => this.setModalVisible(true)}
                style={{
                  paddingRight: 0,
                  alignContent: "center",
                  alignSelf: "center",
                  marginTop: -5,
                  paddingTop: 0,
                  paddingBottom: Platform.OS === "ios" ? 6 : 10
                }}
                transparent
              >
                <Text style={styles.forgotText}>{lang.changelanguage}</Text>
              </Button>
            </View>
          </View>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {}}
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
                  <Text style={styles.modalText}>{lang.changelanguage}</Text>
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
        </Content>
      </Container>
    );
  }
}

Signin.propTypes = {
  strings: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    gps: state.user.gps,
    User: state.user
  };
}
function bindActions(dispatch) {
  return {
    setUserLocation: position =>
      dispatch(UserActions.setUserLocation(position)),
    setCurrentAddress: () => dispatch(TripActions.setCurrentAddress()),
    updateLanguage: lang => dispatch(UserActions.updateLanguage(lang))
  };
}

export default connect(
  mapStateToProps,
  bindActions
)(Signin);
