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
  import { SocialIcon } from 'react-native-elements';

const { RNTwitterSignIn } = NativeModules;


const Constants = {
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
          : 
          
          <SocialIcon
          style = {{justifyContent:'space-evenly'}}
          type = 'twitter'
          onPress={this._twitterSignIn}
          />
           }
            }
      </View>
    )
  }
}

