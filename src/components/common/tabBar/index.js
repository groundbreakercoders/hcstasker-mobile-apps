import React from "react";
import { Icon, View, Text, Spinner } from "native-base";
import { TouchableOpacity, Alert,SafeAreaView,Platform, Dimensions } from "react-native";
import { Actions } from "react-native-router-flux";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import _ from "lodash";
import UserActions from "../../../Redux/userstore";
import TripActions from "../../../Redux/tripstore";
import styles from "./styles";
import commonColor from "../../../../native-base-theme/variables/commonColor";

const TabBar = props => {
  // console.log(props, "helloooooo");
  const { routes, index } = props.navigation.state;
  const { activeTintColor, inactiveTintColor, strings } = props;
  const icons = [
    "ios-compass-outline",
    "ios-notifications-outline",
    "ios-book-outline",
    "ios-person-outline"
  ];
  const routemaps = [];
  const activeIcons = ["ios-compass", "ios-notifications", "ios-book", "ios-person"];
  const title = [
    strings.Appointments,
    strings.notifications,
    strings.booking,
    strings.account
  ];
  {
    routes.map((route, idx) => {
      if(idx<4){
      routemaps.push(route.key);
      }
    })
  }
  const iconWithName = (name, color) => (
    <Icon name={name}  style={{ color: "white", fontSize: 28 }} />
  );
  switchUser = istasker => {
    if (istasker) {
      props.switchType();
    } else {
      Alert.alert("You are not a Tasker", "Go to Account and become a tasker");
    }
  };
  // console.log(routes, "routes ")
  return (
    <View style={{ height: 55 }}>
      <View style={{ height : 55 }}>
        {props.userPageStatus === "home" ? (
          <View
            style={{
              backgroundColor: commonColor.brandPrimary,
              flexDirection: "row",
              zIndex: -1000
            }}
          >
            {

              routemaps.map((route, idx) => {
              const color = index === idx ? activeTintColor : inactiveTintColor;
                return (
                  <TouchableOpacity
                    key={idx}
                    onPress={() => {
                      Actions[route].call();
                    }}
                    style={{ flex: 1, backgroundColor: color }}
                  >
                    <SafeAreaView
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                        height: Platform.OS === "android" ? 55 : Dimensions.get('screen').height*10/100
                        // height:Dimensions.get('screen').height*10/100,
                        // height: 55
                      }}
                    >
                      {iconWithName(
                        index === idx ? activeIcons[idx] : icons[idx],
                        color
                      )}
                      <Text
                        style={{
                         color: "white",
                         fontSize: 10,
                         textAlign: "center",
                         // flex: 0.7
                       }}
                        numberOfLines={1}
                      >

                        {title[idx]}
                      </Text>

                    </SafeAreaView>

                  </TouchableOpacity>
                );



            })}

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
