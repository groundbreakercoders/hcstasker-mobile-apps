import React, { Component } from "react"
import {
  AppRegistry,
  Button,
  StyleSheet,
  Text,
  View,
  Alert,
  NativeModules,
  Spinner,
  TouchableOpacity } from "react-native";
  import styles from "./styles";

const { RNTwitterSignIn } = NativeModules;


const Constants = {
  //Dev Parse keys
  TWITTER_COMSUMER_KEY: "VI6zPyrnaJ8p4x0KJHA5cRcZb",
  TWITTER_CONSUMER_SECRET: "tcUcNQ4AgolcU8gY5yibBb1zZ8bF57COxXXQsckVtRHhO2rX8u"
}

export default class TwitterButton extends Component {
  state = {
    isLoggedIn: false
  }

  _twitterSignIn = () => {
    RNTwitterSignIn.init(Constants.TWITTER_COMSUMER_KEY, Constants.TWITTER_CONSUMER_SECRET)
    RNTwitterSignIn.logIn()
      .then(loginData => {
        console.log(loginData)
        const { authToken, authTokenSecret } = loginData
        if (authToken && authTokenSecret) {
          this.setState({
            isLoggedIn: true
          })
        }
      })
      .catch(error => {
        console.log(error)
      }
    )
  }

  handleLogout = () => {
    console.log("logout")
    RNTwitterSignIn.logOut()
    this.setState({
      isLoggedIn: false
    })
  }

  render() {
    const { isLoggedIn } = this.state
    return (
      <View style={this.props.style}>
        {isLoggedIn
          ? <TouchableOpacity onPress={this.handleLogout}>
              <Text>Log out</Text>
            </TouchableOpacity>
          : <Button name="logo-twitter" style={[styles.loginButtonFB, styles.facebook]} onPress={this._twitterSignIn} title="Twitter login" rounded>
            <Text style={styles.buttonTextFb}>Twitter</Text>
            {/* {this.state.show ? (
                  <Text style={styles.buttonTextFb}>{lang.facebook}</Text>
                  
                  //  <Image source={require('../../../src/assets/f_logo_RGB-Blue_1024.png')} height="5%" width="5%"/>
                ) : (
                  <Spinner color="white" size="small" />
                )} */}
            </Button>}
      </View>
    )
  }
}

// const styles = StyleSheet.create({
//   button: {
//     marginTop: 30,
//     width: deviceWidth - 275,
//     alignSelf: "flex-start",
//     height: 50,
//     justifyContent: "center",
//     backgroundColor: commonColor.brandPrimary
//   }
// })