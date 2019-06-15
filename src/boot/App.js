import React, { Component } from "react";
import { connect } from "react-redux";
import { Router, Scene, Stack, Modal, Actions } from "react-native-router-flux";
import PropTypes from "prop-types";
import { Platform, NetInfo } from "react-native";
import { guide } from "../theme";

import NetworkActions from "../Redux/network";

import LocalizedStrings from "react-native-localization";

import Signin from "../components/signin";
import Login from "../components/login";
import LoginTasker from "../components/loginTasker"
import SignUpPage from "../components/signup";
import ForgotPassword from "../components/forgotPassword";
import Home from "../components/home";
import Booking from "../components/booking";
import TaskerPage from "../components/tasker";
import TaskerProfile from "../components/taskerProfile";
import PaymentPage from "../components/payment";
import ChangePassword from "../components/changePassword";
import EditProfile from "../components/editProfile";
import SavedTaskers from "../components/savedTaskers";
import TaskerServices from "../components/taskerServices";
import BecomeTasker from "../components/becomeTasker";
import Account from "../components/account";
import BookingHistory from "../components/bookingHistory";
import TabBar from "../components/common/tabBar";
import TabBarTasker from "../components/common/tabBarTasker";
import SavedCards from "../components/savedCards";
import AddCard from "../components/addCard";
import PayTasker from "../components/payTasker";
import Receipt from "../components/receipt";
import TaskerHome from "../components/taskerHome";

import TaskerEarnings from "../components/taskerEarnings";
import NavElement from "../components/NavElement";
import DriverOnlineStatusSwitch from "../components/DriverOnlineStatusSwitch";
import Tasker from "../components/tasker";
import Appointments from "../components/appointments";
import MaintainAppointment from "../components/appointments/maintainAppointment";
import lang from "./localise";

const strings = new LocalizedStrings(lang);

const RouterWithRedux = connect()(Router);

const onBackPress = () => {
  Actions.pop();
  return true;
};

class App extends Component {
  componentWillMount() {
    strings.setLanguage(this.props.lang);
    // NetInfo.isConnected.addEventListener(
    //   "connectionChange",
    //   this._handleConnectionChange
    // );
  }

  componentWillUnmount() {
    // NetInfo.isConnected.removeEventListener(
    //   "connectionChange",
    //   this._handleConnectionChange
    // );
  }

  // _handleConnectionChange = isConnected => {
  //   this.props.connectionState({ status: isConnected });
  // };
  renderUserStack() {
    return (
      <Scene
        key="user"
        initial={
          this.props.user.userType === "user" && this.props.user.isLoggedIn
        }
        hideNavBar
      >
        <Stack
          tabs
          tabBarPosition="bottom"
          lazy={Platform.select({
            ios: false,
            android: false
          })}
          swipeEnabled={false}
          key="User"
          initial
          renderBackButton={NavElement.BackButton}
          tabBarComponent={TabBar}
          strings={strings}
          activeTintColor="#649fff"
          inactiveTintColor="#6498ed"
        >
          <Scene
            hideNavBar
            initial
            key="homepage"
            component={Home}
            title="Home Page"
          />

          <Scene
            hideNavBar
            key="savedtaskers"
            component={SavedTaskers}
            title="SavedTaskers Page"
          />
          <Scene
            hideNavBar
            key="bookinghistory"
            component={BookingHistory}
            title="BookingHistory Page"
          />
          <Scene
            hideNavBar
            key="accountpage"
            component={Account}
            title="Account Page"
            strings={strings}
          />
        </Stack>
        <Scene key="taskerpage" component={TaskerPage} title="Tasker Page" />
        <Scene
          hideNavBar
          key="appointments"
          component={Appointments}
          title="Appointments Page"
        />

        <Scene
          hideNavBar
          key="maintainappointment"
          component={MaintainAppointment}
          title="Appointment Form Page"
          strings={strings}
        />
        <Scene
          key="PaymentPage"
          strings={strings}
          component={PaymentPage}
          title="Payment Page"
        />
        <Scene
          key="editprofile"
          component={EditProfile}
          title="EditProfile Page"
        />
        <Scene
          key="changepassword"
          component={ChangePassword}
          strings={strings}
          title="ChangePassword Page"
        />
        <Scene
          key="TaskerServices"
          component={TaskerServices}
          strings={strings}
          title="TaskerServices Page"
        />
        <Scene
          key="BecomeTasker"
          component={BecomeTasker}
          strings={strings}
          title="BecomeTasker Page"
        />
        <Scene
          hideNavBar
          key="booking"
          component={Booking}
          title="Booking Page"
        />
        <Scene
          hideNavBar
          key="receipt"
          component={Receipt}
          strings={strings}
          title="Receipt Page"
        />
        <Scene
          hideNavBar
          key="taskerprofilrepage"
          component={TaskerProfile}
          title="TaskerProfile Page"
        />
        <Scene
          hideNavBar
          key="paytasker"
          component={PayTasker}
          strings={strings}
          title="Paytasker Page"
        />
        <Stack key="paymentsModal" renderBackButton={NavElement.BackButton}>
          <Scene
            initial
            component={SavedCards}
            title={strings.selectCard}
            strings={strings}
            titleStyle={{ marginTop: 5, fontWeight: "400" }}
            renderLeftButton={NavElement.CloseButton}
            renderRightButton={NavElement.AddIcon}
          />
          <Scene
            clone
            back
            left={NavElement.BackButton}
            key="addCardModal"
            strings={strings}
            component={AddCard}
            title={strings.addCard}
          />
        </Stack>
      </Scene>
    );
  }

  renderTaskerStack() {
    return (
      <Scene
        key="tasker"
        initial={
          this.props.user.userType === "tasker" && this.props.user.isLoggedIn
        }
        hideNavBar
      >
        <Stack
          tabs
          tabBarPosition="bottom"
          lazy={Platform.select({
            ios: true,
            android: false
          })}
          swipeEnabled={false}
          key="User"
          initial
          renderBackButton={NavElement.BackButton}
          tabBarComponent={TabBarTasker}
          strings={strings}
          activeTintColor="#649fff"
          inactiveTintColor="#6495ed"
        >
          <Scene
            initial
            key="taskerhomepage"
            component={TaskerHome}
            title={strings.tasker}
            titleStyle={{
              marginTop: 5,
              fontWeight: "bold",
              fontSize: 20,
              color: "#43496a"
            }}
            renderRightButton={() => <DriverOnlineStatusSwitch />}
          />
          <Scene
            hideNavBar
            key="taskerEarnings"
            component={TaskerEarnings}
            title="Earnings"
          />
          <Scene
            hideNavBar
            key="bookinghistory"
            component={BookingHistory}
            title="BookingHistory Page"
          />
          <Scene
            hideNavBar
            key="accountpage"
            component={Account}
            title="Account Page"
            strings={strings}
          />
        </Stack>
      </Scene>
    );
  }

  render() {
    return (
      <RouterWithRedux
        backAndroidHandler={onBackPress}
        titleStyle={{
          alignSelf: "stretch",
          marginTop: Platform.OS === "ios" ? 5 : 10
        }}
        navigationBarStyle={{ backgroundColor: "#fff" }}
      >
        <Modal hideNavBar>
          <Scene hideNavBar key="auth">
            <Scene
              initial={false}
              hideNavBar
              key="signin"
              component={Signin}
              title="Signin Page"
              strings={strings}
            />
            <Scene
              hideNavBar
              key="loginUser"
              component={Login}
              title="Login Page"
              strings={strings}
            />
            <Scene
              hideNavBar
              key="loginTasker"
              component={LoginTasker}
              title="Login Page Page"
              strings={strings}
            />
            <Scene
              hideNavBar
              key="signuppage"
              component={SignUpPage}
              title="SignUp Page"
              strings={strings}
            />
            <Scene
              hideNavBar
              key="forgotpassword"
              component={ForgotPassword}
              title="Forgot Password Page"
              strings={strings}
            />
          </Scene>

          {this.renderUserStack()}
          {this.renderTaskerStack()}
        </Modal>
      </RouterWithRedux>
    );
  }
}

App.propTypes = {
  user: PropTypes.object.isRequired
};
const bindActions = dispatch => ({
  connectionState: status => dispatch(NetworkActions.connectionState(status))
});

const mapStateToProps = state => ({ user: state.user, lang: state.user.lang });

export default connect(
  mapStateToProps,
  bindActions
)(App);
