import React, { Component } from "react";
import {
  Button,
  Text,
  Icon,
  Container,
  Left,
  Right,
  Body,
  Content,
  Spinner,
  Item
} from "native-base";
import { Dimensions, View, WebView, Modal } from "react-native";
import { AccessToken, LoginManager } from "react-native-fbsdk";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import UserActions from "../../Redux/userstore";
import * as userstates from "../../Redux/userstore";
import LoginForm from "./form";
import styles from "./styles";
import commonColor from "../../../native-base-theme/variables/commonColor";


const { height } = Dimensions.get("window");

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
      disableLoginButton: false,
      eulaVisible: false,
      url: "",
      title: ""
    };
  }

  close() {
    this.setState({ eulaVisible: false });
  }

  TermsAndConditions(url, title) {
    this.setState({ url, title, eulaVisible: true });
  }

  yo() {
    this.setState({ show: false, disableLoginButton: true });
    LoginManager.logInWithReadPermissions(["public_profile", "email"])
      .then(result => {
        if (result.isCancelled) {
          this.setState({ show: true, disableLoginButton: false });
        } else {
          let permissionsFromFb = "";
          for (const i = 0; i < result.grantedPermissions.length; i++) {
            if (i === result.grantedPermissions.length - 1) {
              permissionsFromFb += result.grantedPermissions[i];
            } else {
              permissionsFromFb = `${permissionsFromFb +
                result.grantedPermissions[i]}, `;
            }
          }
          AccessToken.getCurrentAccessToken()
            .then(data => {
              if (data.accessToken) {
                this.props.onLoginFinished("null", data.accessToken.toString());
              } else {
                alert("access token is null");
                this.setState({ show: true, disableLoginButton: false });
              }
            })
            .catch(error => {
              Alert.alert("Error from Facebook");
              this.setState({ show: true, disableLoginButton: false });
            });
        }
      })
      .catch(error => {
        Alert.alert("Error calling Facebook Api");
        LoginManager.logOut();
        ++count;
        if (count < 2) {
          this.yo();
        } else {
          Alert.alert("Error in fb login");
        }
      });
  }

  render() {
    const lang = this.props.strings;
    console.log(this.props,"index Login@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
    return (
      <Container>
        <Content style={{ backgroundColor: "#fff" }} scrollEnabled bounces>
          <View style={styles.contentView}>
            <View style={styles.headerView}>
              <Button
                style={{ paddingLeft: 0 }}
                transparent
                onPress={() => Actions.pop()}
              >
                <Icon name="ios-arrow-back" style={styles.arrowIcon} />
              </Button>
            </View>
            <View style={styles.formView}>
              <Text style={styles.signinText}>{lang.signin}</Text>
              <LoginForm lang={lang} loading={this.props.loading} />
            </View>

            <Text style={styles.orText}>{lang.or}</Text>

            <View style={styles.buttonsView}>
              <Button
                onPress={() => {
                  if (!this.state.disableLoginButton) {
                    this.yo();
                  }
                }}
                rounded
                style={[styles.loginButton, styles.facebook]}
              >
                {this.state.show ? (
                  <Text style={styles.buttonText}>{lang.facebook}</Text>
                ) : (
                  <Spinner color="white" size="small" />
                )}
              </Button>

              


              <Button
                    onPress={() => {
                      Actions.signuppage()
                        // this.callMe(),
                        // this.props.setCurrentAddress();
                    }}
                    rounded
                    style={[styles.loginButton, styles.signupButton]}
                  >
                    <Text style={[styles.buttonText, styles.signupText]}>
                      {lang.signup}
                      </Text>
    </Button>
              {/* <Button rounded style={[styles.loginButton, styles.google]}>
                <Text style={styles.buttonText}>{lang.google}</Text>
              </Button> */}
              <View style={{ marginTop: 25 }}>
                <Text
                  style={{
                    color: "#000",
                    alignSelf: "center",
                    textAlign: "center",
                    marginTop: 10,
                    paddingHorizontal: 20
                  }}
                >
                  {" "}
                  By tapping Login you agree to our{"\n"}
                  <Text
                    onPress={() =>
                      this.TermsAndConditions(
                        "https://market.nativebase.io/terms-conditions",
                        "Terms"
                      )
                    }
                    style={{
                      textDecorationLine: "underline",
                      color: commonColor.brandPrimary,
                      marginLeft: 10
                    }}
                  >
                    Terms{" "}
                  </Text>and{" "}
                  <Text
                    onPress={() =>
                      this.TermsAndConditions(
                        "https://market.nativebase.io/privacy-policy",
                        "Privacy Policy"
                      )
                    }
                    style={{
                      textDecorationLine: "underline",
                      color: commonColor.brandPrimary
                    }}
                  >
                    Privacy Policy
                  </Text>
                </Text>
              </View>
            </View>
          </View>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.eulaVisible}
            onRequestClose={() => this.close()}
            backDropOpacity={1}
          >
            <View>
              <Item
                onPress={() => this.setState({ eulaVisible: false })}
                style={{
                  height: 60,
                  flexDirection: "row"
                }}
              >
                <Left>
                  <Icon
                    name="ios-close"
                    style={{
                      marginLeft: 20,
                      marginTop: 10,
                      fontWeight: "bold"
                    }}
                  />
                </Left>
                <Body style={{ flex: 4 }}>
                  <Text
                    style={{
                      color: "#332557",
                      fontSize: 18,
                      fontWeight: "bold"
                    }}
                  >
                    {this.state.title}
                  </Text>
                </Body>
                <Right />
              </Item>
            </View>
            <WebView
              source={{
                uri: this.state.url
              }}
            />
          </Modal>
        </Content>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: userstates.getSpinnerState(state)
  };
}

function bindActions(dispatch) {
  return {
    onLoginFinished: (error, result) =>
      dispatch(UserActions.onLoginFinished(error, result))
  };
}

export default connect(
  mapStateToProps,
  bindActions
)(Login);
