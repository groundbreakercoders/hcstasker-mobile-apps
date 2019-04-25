import React, { Component } from "react";
import {
  Button,
  Left,
  Text,
  Container,
  Content,
  Item,
  Icon,
  Spinner
} from "native-base";
import { Actions } from "react-native-router-flux";
import _ from "lodash";
import { connect } from "react-redux";
import {
  Dimensions,
  View,
  ImageBackground,
  TouchableOpacity
} from "react-native";
import firebase from "../../firebase";
import RNFetchBlob from "react-native-fetch-blob";
import ImagePicker from "react-native-image-crop-picker";
import MIcon from "../common/mIcon";
import EditForm from "./form";
import UserActions from "../../Redux/userstore";
import styles from "./styles";

const { height, width } = Dimensions.get("window");
const image = require("../../assets/userimage.png");

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageurl: ""
    };
  }

  openPicker() {
    this.props.setSpinner(true);
    const Blob = RNFetchBlob.polyfill.Blob;
    const fs = RNFetchBlob.fs;
    window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
    window.Blob = Blob;
    const uid = this.props.email;
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      mediaType: "photo"
    })
      .then(image => {
        const imagePath = image.path;
        let uploadBlob = null;

        const imageRef = firebase
          .storage()
          .ref(uid)
          .child("newfile.jpg");
        const mime = "image/jpg";
        fs.readFile(imagePath, "base64")
          .then(data => Blob.build(data, { type: `${mime};BASE64` }))
          .then(blob => {
            uploadBlob = blob;
            return imageRef.put(blob, { contentType: mime });
          })
          .then(() => {
            uploadBlob.close();
            return imageRef.getDownloadURL();
          })
          .then(url => {
            this.props.setProfileUrl(url);
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        this.props.setSpinner(false);
      });
  }

  render() {
    const { name, loading, profileurl } = this.props;
    return (
      <Container>
        <Content style={{ backgroundColor: "#fff" }}>
          <View>
            {loading ? (
              <View
                style={{
                  height: height / 3 + 50,
                  width,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Spinner />
              </View>
            ) : (
              <ImageBackground
                resizeMode="cover"
                style={{
                  flex: 1,
                  height: height / 3 + 50,
                  width
                }}
                source={profileurl ? { uri: profileurl } : image}
              >
                <Item onPress={() => Actions.pop()} style={styles.imageItem}>
                  <Icon
                    name="ios-arrow-back"
                    style={{
                      fontSize: 40,
                      color: "#fff"
                    }}
                  />
                </Item>
                <TouchableOpacity
                  style={styles.eidtpic}
                  onPress={() => this.openPicker()}
                >
                  <MIcon
                    family="Ionicons"
                    name="create"
                    style={{
                      fontSize: 18,
                      paddingLeft: 5,
                      color: "#44466B"
                    }}
                  />
                </TouchableOpacity>
              </ImageBackground>
            )}
            <View style={{ padding: 15, paddingLeft: 20 }}>
              <EditForm />
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  name: state.user.name,
  email: state.user.email,
  loading: state.user.loading,
  profileurl: state.user.profileurl
});

const bindActions = dispatch => ({
  setProfileUrl: profileurl => dispatch(UserActions.setProfileUrl(profileurl)),
  setSpinner: val => dispatch(UserActions.setSpinner(val))
});

export default connect(
  mapStateToProps,
  bindActions
)(EditProfile);
