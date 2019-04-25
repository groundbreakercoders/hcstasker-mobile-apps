import React from "react";
import { Icon, View, Text, Spinner } from "native-base";
import { TouchableOpacity, Alert } from "react-native";
import { Actions } from "react-native-router-flux";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import _ from "lodash";
import UserActions from "../../../Redux/userstore";
import TripActions from "../../../Redux/tripstore";
import styles from "./styles";
import commonColor from "../../../../native-base-theme/variables/commonColor";

const TabBar = props => {
  console.log(props, "helloooooo");
  const { routes, index } = props.navigation.state;
  const { activeTintColor, inactiveTintColor, strings } = props;
  const icons = [
    "compass",
    "ios-heart-outline",
    "ios-book-outline",
    "ios-person-outline"
  ];
  const activeIcons = ["ios-compass", "ios-heart", "ios-book", "ios-person"];
  const title = [
    strings.Explore,
    strings.favourite,
    strings.booking,
    strings.account
  ];
  const iconWithName = (name, color) => (
    <Icon name={name} style={{ color: "#FFF" }} />
  );
  switchUser = istasker => {
    if (istasker) {
      props.switchType();
    } else {
      Alert.alert("You are not a Tasker", "Go to Account and become a tasker");
    }
  };
  return (
    <View style={{ height: 55 }}>
      <View style={{ height: 55 }}>
        {_.get(props, "SubCategorySelected") &&
        props.userPageStatus === "home" ? (
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#fff",
              height: 55,
              zIndex: 1000
            }}
          >
            <TouchableOpacity
              style={[styles.fullButton, styles.bookNow]}
              onPress={() => {
                props.setUserPageStatus("bookingpage");
              }}
            >
              <Text style={styles.btnText}>{strings.booknow}</Text>
            </TouchableOpacity>
          </View>
        ) : null}
        {props.userPageStatus === "home" &&
        !_.get(props, "SubCategorySelected") ? (
          <View
            style={{
              backgroundColor: commonColor.brandPrimary,
              flexDirection: "row",
              zIndex: -1000
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
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      height: 55
                    }}
                  >
                    {iconWithName(
                      index === idx ? activeIcons[idx] : icons[idx],
                      color
                    )}
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: 10,
                        textAlign: "center",
                        marginBottom: 1.5
                      }}
                      numberOfLines={1}
                    >
                      {title[idx]}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
            <TouchableOpacity
              style={{ flex: 1, backgroundColor: commonColor.brandSecondary }}
              onPress={() => this.switchUser(props.isTasker)}
            >
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  height: 55
                }}
              >
                {props.typeChanging ? (
                  <Spinner color="#fff" />
                ) : (
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      height: 55
                    }}
                  >
                    <Icon
                      name="md-swap"
                      style={{ color: "white", fontSize: 28, marginTop: -2 }}
                    />
                    <Text
                      numberOfLines={2}
                      style={{
                        color: "white",
                        fontSize: 10,
                        textAlign: "center"
                      }}
                    >
                      {strings.tasker}
                    </Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          </View>
        ) : null}

        {props.userPageStatus === "bookingpage" ? (
          <View
            style={{
              backgroundColor: commonColor.brandPrimary,
              flexDirection: "row",
              zIndex: -1000
            }}
          >
            <TouchableOpacity
              style={[styles.fullButton, styles.bookLater]}
              onPress={() => {
                props.requestTrip();
              }}
            >
              {props.loading ? (
                <Spinner color="#fff" />
              ) : (
                <Text style={styles.btnText}>{strings.confirmbook}</Text>
              )}
            </TouchableOpacity>
          </View>
        ) : null}
        {props.userPageStatus === "bookingConfirmed" ? (
          <View
            style={{
              flexDirection: "row",
              zIndex: -1000
            }}
          >
            <TouchableOpacity
              onPress={() => props.cancelBooking()}
              style={[styles.fullButton, styles.cancelbtn]}
            >
              <Text style={styles.btnTextCancel}>{strings.CancelBooking}</Text>
            </TouchableOpacity>
          </View>
        ) : null}
        {props.userPageStatus === "inprogress" ? (
          <View
            style={{
              flexDirection: "row",
              zIndex: -1000
            }}
          >
            <TouchableOpacity
              disabled
              onPress={() => Alert.alert("Task in progress")}
              style={[styles.fullButton, styles.bookLater]}
            >
              <Text style={styles.btnText}>{strings.taskInProgress}</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </View>
  );
};

TabBar.propTypes = {
  // navigationState: PropTypes.object.isRequired,
  activeTintColor: PropTypes.string.isRequired,
  inactiveTintColor: PropTypes.string.isRequired,
  setUserPageStatus: PropTypes.func.isRequired,
  userPageStatus: PropTypes.string.isRequired,
  setUserPageStatus: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  SubCategorySelected: state.user.SubCategorySelected,
  userPageStatus: state.user.userPageStatus,
  loading: state.trip.loading,
  isTasker: state.user.isTasker,
  typeChanging: state.user.typeChanging
});

const bindActions = dispatch => ({
  switchType: () => dispatch(UserActions.switchType()),
  setUserPageStatus: page => dispatch(UserActions.setUserPageStatus(page)),
  requestTrip: () => dispatch(TripActions.requestTrip()),
  cancelBooking: () => dispatch(TripActions.cancelBooking())
});

export default connect(
  mapStateToProps,
  bindActions
)(TabBar);
