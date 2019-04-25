import React, { Component } from "react";
import { Button, Text, Icon, Container, Content, Spinner } from "native-base";
import { Dimensions, View, Item, Input } from "react-native";
import { connect } from "react-redux";
import firebase from "react-native-firebase";
import RenderTag from "../common/renderSubCategories";
import { Actions } from "react-native-router-flux";
import styles from "./styles";


const { height, width } = Dimensions.get("window");

class TaskerServices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: null
    };
  }
  componentDidMount() {
    firebase
      .firestore()
      .collection("users")
      .doc(this.props.email)
      .get()
      .then(querySnapshot => {
        const user = querySnapshot.data();
        this.setState({ data: user, loading: false });
      })
      .catch(error => {
        this.setState({ loading: false });
      });
  }
  render() {
    console.log(this.state.data,"Data@@@@@@@@@@@")
    console.log(this.props,"TaskerServices")
    const { strings } = this.props;
    return (
      <Container>
        <Content scrollEnabled style={{ backgroundColor: "#fff" }}>
          {this.state.loading ? (
            <Spinner />
          ) : (
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
                  style={{
                    fontSize: 28,
                    fontWeight: "bold",
                    color: "#43496a"
                  }}
                >
                  {strings.myservices}
                </Text>
              </View>
              <View>
                {this.state.data !== null &&
                this.state.data.isTasker === true ? (
                  <View>
                    <Text
                      style={{ color: "#44466B", fontSize: 24, marginTop: 15 }}
                    >
                      {strings.typeOfServices}
                    </Text>
                    <View
                      style={{
                        paddingVertical: 5,
                        borderBottomWidth: 1,
                        borderBottomColor: "#8a8fab"
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 20,
                          color: "#8a8fab",
                          marginTop: 10,
                          lineHeight: 20,
                          paddingVertical: 5
                        }}
                      >
                        {this.state.data.category}
                      </Text>
                    </View>
                    <Text
                      style={{ color: "#44466B", fontSize: 24, marginTop: 15 }}
                    >
                      {strings.SubCategory}
                    </Text>
                    <View
                      style={{
                        borderBottomWidth: 1,
                        paddingVertical: 5,
                        borderBottomColor: "#8a8fab"
                      }}
                    >
                      <RenderTag tags={this.state.data.subCategory} />
                    </View>
                    <Text
                      style={{ color: "#44466B", fontSize: 24, marginTop: 15 }}
                    >
                      {strings.AverageHourlyCost}
                    </Text>
                    <View
                      style={{
                        borderBottomWidth: 1,
                        paddingVertical: 5,
                        borderBottomColor: "#8a8fab"
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 20,
                          color: "#8a8fab",
                          marginTop: 10
                        }}
                      >
                        $ {this.state.data.fee}
                      </Text>
                    </View>
                    <Text
                      style={{ color: "#44466B", fontSize: 24, marginTop: 15 }}
                    >
                      {strings.Address}
                    </Text>
                    <Text
                      numberOfLines={2}
                      style={{ fontSize: 20, color: "#8a8fab", marginTop: 10 }}
                    >
                      {this.state.data.address}
                    </Text>
                  </View>
                ) : (
                  <View style={{ marginTop: 20 }}>
                    <Text
                      style={{
                        color: "#44466B",
                        fontSize: 24,
                        marginTop: 15,
                        textAlign: "center"
                      }}
                    >
                      {strings.BecomeTasker}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          )}
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  email: state.user.email
});

const bindActions = dispatch => ({});

export default connect(
  mapStateToProps,
  bindActions
)(TaskerServices);
