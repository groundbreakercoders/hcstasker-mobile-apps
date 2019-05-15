import React from "react";
import { Icon, View, Text, Spinner } from "native-base";
import { TouchableOpacity, Alert,SafeAreaView,Platform, Dimensions } from "react-native";
import { Actions } from "react-native-router-flux";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import _ from "lodash";
import UserActions from "../../../Redux/userstore";
import DriverActions from "../../../Redux/driverstore";
import TripActions from "../../../Redux/tripstore";
import styles from "./styles";
import commonColor from "../../../../native-base-theme/variables/commonColor";



const TabBarTasker = props => {
  // console.log(props, "tabBarTasker");
  const { routes, index } = props.navigation.state;
  const { activeTintColor, inactiveTintColor, strings } = props;
  const taskicons = ["ios-home", "ios-list-box", "ios-book","ios-person-outline"];
  const taskActiveicons = ["ios-home", "ios-list-box", "ios-book","ios-person"];
  const tasktitle = [strings.Home, strings.Earnings, strings.History, strings.account];
  const iconWithName = (name, color) => (
    <Icon name={name} style={{ color: "#FFF", fontSize: 28, marginTop: -2 }} />
  );
  return (
    <View>
      <View>
        {props.userPageStatus === "home" ? (
          <View
            style={{
              backgroundColor: commonColor.brandPrimary,
              flexDirection: "row"
            }}
          >

            {routes.map((route, idx) => {
              const color = index === idx ? activeTintColor : inactiveTintColor;
              return (
                <TouchableOpacity
                  key={idx}
                  onPress={() => {
                    Actions[route.key].call();
                  }}
                  style={{ flex: 1, backgroundColor: color }}
                >
                  <SafeAreaView
                    style={{
                      alignItems: "center",
                      justifyContent: "center",

                       height:Dimensions.get('screen').height*10/100

                    }}
                  >
                    {iconWithName(
                      index === idx ? taskActiveicons[idx] : taskicons[idx],
                      color
                    )}
                    <Text
                      style={{
                        fontSize: 10,
                        color: "white",
                        textAlign: "center"
                      }}
                      numberOfLines={2}
                    >
                      {tasktitle[idx]}
                    </Text>
                  </SafeAreaView>
                </TouchableOpacity>
              );
            })}


           </View>
        ) : null}
        {props.userPageStatus === "startTask" ? (
          <SafeAreaView
            style={{
              flexDirection: "row",
              backgroundColor: "#fff",
              height:Platform.OS === "android" ? 55 : 55,
              // height: 55,
              zIndex: 1000
            }}
          >
            <TouchableOpacity
              style={[styles.fullButton, styles.cancelTaksBtn]}
              onPress={() => {
                props.setUserPageStatus("home");
                props.taskerCancelBooking();
              }}
            >
              <Text style={styles.btnText}>{strings.Cancel}</Text>
            </TouchableOpacity>
            {props.tripStatus === "onTrip" ? (
              <TouchableOpacity
                style={[styles.fullButton, styles.bookNow]}
                onPress={() => {
                 props.startTask();
                }}
              >
                {props.loading ? (
                  <Spinner color="#fff" />
                ) : (
                  <Text style={styles.btnText}>{console.log(strings.StartTask,"StartTask@@@@@@@@@@@@@")}{strings.StartTask}</Text>
                )}
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[styles.fullButton, styles.bookNow]}
                onPress={() => {
                  props.startTrip();
                }}
              >
                <Text style={styles.btnText}>{console.log(strings.Start,"start@@@@@@@@@@@@@!!!!!!!!!!!!!!!!!!")}{strings.Start}</Text>
              </TouchableOpacity>
            )}
            {/* <TouchableOpacity
                style={[styles.fullButton, styles.bookNow]}
                onPress={() => {
                 props.startTask();
                }}
              >
                {props.loading ? (
                  <Spinner color="#fff" />
                ) : (
                  <Text style={styles.btnText}>{console.log(strings.StartTask,"StartTask@@@@@@@@@@@@@")}{strings.StartTask}</Text>
                )}
              </TouchableOpacity>
             */}
              {console.log(props,"after dispatching@@@@@@@@@@@@@@@@@!!!!!!!!!!!!!!!")}
          </SafeAreaView>
        ) : null}

        {props.userPageStatus === "inprogress" ? (
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#fff",
              height: 55
            }}
          >
            <TouchableOpacity
              style={[styles.fullButton, styles.bookLater]}
              onPress={() => {
                props.completeTrip();
              }}
            >
              {props.loading ? (
                <Spinner color="#fff" />
              ) : (
                <Text style={styles.btnText}>{strings.CompleteTask}</Text>
              )}
            </TouchableOpacity>
          </View>
        ) : null}

        {props.userPageStatus === "collectFee" ? (
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#fff",
              height: 55
            }}
          >
            <TouchableOpacity
              style={[styles.fullButton, styles.bookLater]}
              onPress={() => {
                props.setDefaultTaskStatus();
              }}
            >
              <Text style={styles.btnText}>{strings.Done}</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </View>
  );
};

TabBarTasker.propTypes = {
  //navigationState: PropTypes.object.isRequired,
  activeTintColor: PropTypes.string.isRequired,
  inactiveTintColor: PropTypes.string.isRequired,
  setUserPageStatus: PropTypes.func.isRequired,
  userPageStatus: PropTypes.string.isRequired,
  setUserPageStatus: PropTypes.func.isRequired,
  changeStatus: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  userPageStatus: state.user.userPageStatus,
  loading: state.trip.loading,
  tripStatus: state.user.tripStatus,
  typeChanging: state.user.typeChanging
});

const bindActions = dispatch => ({
  switchType: () => dispatch(UserActions.switchType()),
  setUserPageStatus: page => dispatch(UserActions.setUserPageStatus(page)),
  changeStatus: isOnline => dispatch(DriverActions.changeStatus(isOnline)),
  cancelBooking: () => dispatch(TripActions.cancelBooking()),
  taskerCancelBooking: () => dispatch(TripActions.taskerCancelBooking()),
  startTrip: () => dispatch(TripActions.startTrip()),
  startTask: () => dispatch(TripActions.startTask()),
  completeTrip: () => dispatch(TripActions.completeTrip()),
  setDefaultTaskStatus: () => dispatch(TripActions.setDefaultTaskStatus())
});

export default connect(
  mapStateToProps,
  bindActions
)(TabBarTasker);
