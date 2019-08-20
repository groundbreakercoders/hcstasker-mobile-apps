import React, { Component } from "react";
import {
  Button,
  Left,
  Body,
  Thumbnail,
  Text,
  Container,
  Content,
  Right,
  Card,
  CardItem,
  Icon,
  Spinner
} from "native-base";
import { Dimensions, View, Image, TouchableOpacity } from "react-native";
import _ from "lodash";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Header from "../common/header";
import firebase from "react-native-firebase";
import commonColor from "../../../native-base-theme/variables/commonColor";
import UserActions from "../../Redux/userstore";
import TripActions from "../../Redux/tripstore";
import MIcon from "../common/mIcon";
import styles from "./styles";

const { height } = Dimensions.get("window");

class Notifications extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      status:[],
      loading: true
    };
  }

  componentDidMount() {
    firebase
      .firestore()
      .collection("activity")
      .doc(this.props.email)
      .collection("notifications")
      .orderBy('time','desc')
      .get()
      .then(querySnapshot => {
        if (querySnapshot.docs.length) {
          querySnapshot.forEach(data => {
            const appointment = data.data();
            firebase
              .firestore()
              .collection("users")
              .doc(appointment.user)
              .get()
              .then(datas => {
                const userData = datas.data();
                var notifMsg = appointment.status+'\n'+appointment.userNotifMessage;
                if (userData) {
                  this.setState({
                    list: [...this.state.list, userData],
                    status: [...this.state.status,notifMsg],
                    loading: false
                  });
                }
              });
          });
        } else {
          this.setState({ loading: false });
        }
      })
      .catch(error => console.log("Catch", error));
  }

  async removeFromFavourites(email) {
    this.setState({ loading: true });
    const userEmail = this.props.email;
    await firebase
      .firestore()
      .collection("users")
      .doc(userEmail)
      .collection("favourites")
      .doc(email)
      .delete()
      .then(() => {
        firebase
          .firestore()
          .collection("users")
          .doc(userEmail)
          .collection("tasks")
          .where("taskDetails.taskerData.email", "==", email)
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(data => {
              console.log("data", data.favourite);
              data.ref.update({
                favourite: false
              });
            });
            firebase
              .firestore()
              .collection("users")
              .doc(this.props.email)
              .collection("favourites")
              .get()
              .then(querySnapshot => {
                if (querySnapshot.docs.length) {
                  querySnapshot.forEach(data => {
                    const user = data.data();
                    firebase
                      .firestore()
                      .collection("users")
                      .doc(user.email)
                      .get()
                      .then(datas => {
                        const userData = datas.data();
                        if (userData) {
                          this.setState({
                            list: [...[], userData],
                            loading: false
                          });
                        }
                      });
                  });
                } else {
                  this.setState({ list: [], loading: false });
                }
              })
              .catch(error => console.log("Catch", error));
          })
          .catch(error => {
            console.log("Catch", error);
          });
      });
  }

  getNotficationText(status) {
    let count = null;
    let statusSize = status.length;
    
    for(var i=0;i<statusSize;i++){
   
      return status[statusSize-1];
      
    }
     
        
  }

  getRating(rating) {
    let total = null;
    const length = rating.length;
    _.map(rating, (rate, index) => {
      total += rate;
    });
    return Math.ceil(total / length);
  }

  getName(){
    console.log("hello");
  }

  render() {
    const { strings } = this.props;
    
    return (
      <Container>
        <Header title={strings.notifications} />
        <Content>
          <View>
            {this.state.loading ? (
              <Spinner color={commonColor.brandPrimary} />
            ) : (
              <View style={{ marginTop: 5 }}>
                {!this.state.status.length ? (
                  <View
                    style={{
                      marginTop: height / 3,
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        color: "#8B8DAC"
                      }}
                    >
                      {strings.noNewNotifications}
                    </Text>
                  </View>
                ) : (
                  _.map(this.state.status, (notifMsg,index) => (
                    <Card key={index} style={styles.card}>
                      <CardItem
                        style={{
                          flex:1,
                          paddingBottom: 50,
                          height: 160,
                          fontWeight: "bold"
                        }}
                      >
                        {/* <Left style={{flex: 1, flexDirection: "row", alignItems: "stretch", alignSelf: "stretch",}}>
                          {_.get(tasker, "profileUrl") ? (
                            <Image
                              source={{
                                uri: _.get(userDetails, "userData.profileUrl")
                              }}
                              style={{
                                width: 80,
                                height: 80,
                                borderRadius: 40
                              }}
                            />
                          ) : (
                            <Icon
                              name="md-contact"
                              style={{
                                fontSize: 80,
                                color: commonColor.brandPrimary
                              }}
                            />
                          )} */}
                          <Body>
                            
                          
                            {/* <Text
                              style={{
                                fontSize: 20,
                                color: "#44466B",
                                fontWeight: "500"
                              }}
                            >
                              {setMessage}
                            </Text> */}

                            <Text style={styles.baseText}>
                            <Text style={styles.titleText} onPress={this.onPressTitle}>
                                                                                       
                              {/* {this.getNotficationText(this.state.status)} */}
                              {notifMsg}
                            </Text>
                         
                          </Text>
                            {/* <Text
                              note
                              style={{
                                paddingVertical: 5,
                                color: "#8B8DAC",
                                fontSize: 14
                              }}
                            > {tasker.category}
                            </Text>
                            <Text
                              style={{
                                fontSize: 14,
                                color: "#44466B",
                                fontWeight: "bold"
                              }}
                            >
                              <MIcon
                                family="Ionicons"
                                name="ios-star"
                                style={{ color: "#F3DE00", fontSize: 18 }}
                              />
                              {this.getRating(tasker.rating)} {"  "}$
                              {tasker.fee}
                               {/* <Icon name="ios-pin" style={{ color: '#44466B', fontSize: 18 }} />{' '}
                         km away 
                            </Text> */}
                          </Body>
                        {/* </Left> */}
                        {/* <Right
                          style={{
                            flex: 0.3,
                            alignItems: "center",
                            justifyContent: "space-between"
                          }}
                        >
                          <TouchableOpacity
                            style={{
                              height: 30,
                              width: 30,
                              alignItems: "center",
                              justifyContent: "center"
                            }}
                            onPress={() =>
                              this.removeFromFavourites(tasker.email)
                            }
                          >
                            <MIcon
                              family="Ionicons"
                              name="ios-heart"
                              style={{ color: commonColor.brandPrimary }}
                            />
                          </TouchableOpacity>
                          <Button
                            small
                            disabled
                            style={{
                              marginTop: 10,
                              backgroundColor: commonColor.brandPrimary,
                              borderRadius: 2
                            }}
                            onPress={() =>
                              this.props.bookFavourite(tasker.email)
                            }
                          >
                            <Text>{strings.book}</Text>
                          </Button>

                          <Text note style={{ fontSize: 10, color: "red",paddingTop:7 }}>
                            Coming soon...
                          </Text>
                        </Right> */}
                      </CardItem>
                    </Card>
                  ))
                )}
              </View>
            )}
          </View>
        </Content>
      </Container>
    );
  }
}

Notifications.propTypes = {
  favourites: PropTypes.array
};

Notifications.defaultProps = {
  favourites: []
};
const mapStateToProps = state => ({
  favourites: state.user.favourites,
  email: state.user.email
});

const bindActions = dispatch => ({
  getFavouritetaskers: () => dispatch(UserActions.getFavouritetaskers()),
  bookFavourite: email => dispatch(TripActions.bookFavourite(email))
});

export default connect(
  mapStateToProps,
  bindActions
)(Notifications);
