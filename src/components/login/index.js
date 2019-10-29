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
import {
  TouchableOpacity
} from 'react-native';
import { Dimensions, View, Modal } from "react-native";
import { WebView } from "react-native-webview";
import { AccessToken, LoginManager } from "react-native-fbsdk";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import UserActions from "../../Redux/userstore";
import * as userstates from "../../Redux/userstore";
import LoginForm from "./form";
import styles from "./styles";
import commonColor from "../../../native-base-theme/variables/commonColor";
import Header from "../common/header";
import TwitterButton from './TwitterButton';
import InstagramLogin from 'react-native-instagram-login';
import fbImage from './f_logo_RGB-Blue_1024.png';
import { SocialIcon } from 'react-native-elements';

const { height } = Dimensions.get("window");
const fbIcon = require("../../../src/assets/f_logo_RGB-Blue_1024.png");

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
      disableLoginButton: false,
      eulaVisible: false,
      url: "",
      title: "",
      token: ''
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

  renderImage() {
    //var imgSource = this.state.show ? fbImage : null
    return (
      <Image
        source={ fbIcon }
      />
    );
  }

  render() {
    const lang = this.props.strings;
    console.log(this.props,"index Login@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
    const strings = this.props;
    return (
      <Container>
        <Header title={lang.signin} backButton />
        <Content style={{ backgroundColor: "#fff" }} scrollEnabled bounces>
          <View style={styles.contentView}>
            <View style={styles.headerView}>
              {/*<Button
                style={{ paddingLeft: 0 }}
                transparent
                onPress={() => Actions.pop()}
              >
                <Icon name="ios-arrow-back" style={styles.arrowIcon} />
              </Button>*/}
            </View>
            <View style={styles.formView}>
              <Text style={styles.signinText}>{lang.signin}</Text>
              <LoginForm lang={lang} loading={this.props.loading} />
            </View>

            <Text style={styles.orText}>{lang.or}</Text>

              <View style={{flexDirection: "row",justifyContent:"center"}}>
              <SocialIcon
                style = {{justifyContent:'space-evenly'}}
                type='facebook'
                onPress={() => {
                  if (!this.state.disableLoginButton) {
                    this.yo();
                  }
                }}
                //  rounded
                //  style={[styles.loginButtonFB, styles.facebook]}
              >
                {/* {this.state.show ? (
                  //<Text style={styles.buttonTextFb}>{lang.facebook}</Text>
                  //this.renderImage()
                  <Image  source={{
                    uri: 'https://facebook.github.io/react/logo-og.png',
                    cache: 'only-if-cached',
                  }}
                  style={{width: 400, height: 400}}/>
                ) : (
                  <Spinner color="white" size="small" />
                )} */}
              </SocialIcon>
              
              <TwitterButton /> 
              
            
            {/* <TouchableOpacity
              style={{
                borderRadius: 5,
                backgroundColor: 'orange',
                height: 30, width: 100,
                justifyContent: 'center',
                alignItems: 'center'
              }}
              onPress={() => this.instagramLogin.show()}>
              <Text style={{ color: 'white', textAlign: 'center' }}>Login now</Text>
            </TouchableOpacity> */}
            
            {/* <SocialIcon
            style = {{justifyContent:'space-evenly'}}
            type='instagram'
            onPress={() => this.instagramLogin.show()}
            disabled='true'/>
            {/* <Text style={{ margin: 10 }}>Token: {this.state.token}</Text> */}
            {this.state.failure && <View>
              <Text style={{ margin: 10 }}>failure: {JSON.stringify(this.state.failure)}</Text>
            </View>}
            <InstagramLogin
              ref={ref => (this.instagramLogin = ref)}
              clientId="c54f9ecfc7964bc7afceafc6baeea282"
              redirectUrl="https://google.com"
              scopes={['basic']}
              onLoginSuccess={token => this.setState({ token })}
              onLoginFailure={data => this.setState({ failure: data })}
            /> */}
         
              
              </View>

              

              <View style={styles.buttonsView}>
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
