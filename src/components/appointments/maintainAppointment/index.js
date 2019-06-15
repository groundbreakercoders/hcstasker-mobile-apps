import React, { Component } from "react";
import { View, Text, Button } from 'native-base';
import { connect } from "react-redux";



class MaintainAppointment extends Component {


  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: null
    };
  }
  componentDidMount() {

      this.setState({ loading: false });
  }
  render() {

    console.log(this.state.data,"Data@@@@@@@@@@@")
    console.log(this.props,"TaskerServices")
    const styles = {
  wrapper: {
    flex: 1,
    marginTop: 150,
  },
  submitButton: {
    paddingHorizontal: 10,
    paddingTop: 20,
  },
};
// These Fields will create a login form with three fields
const fields = [
  {
    type: 'text',
    name: 'user_name',
    required: true,
    icon: 'ios-person',
    label: 'Username',
  },
  {
    type: 'password',
    name: 'password',
    icon: 'ios-lock',
    required: true,
    label: 'Password',
  },
  {
    type: 'picker',
    name: 'country',
    mode: 'dialog',
    label: 'Select Country',
    defaultValue: 'INDIA',
    options: ['US', 'INDIA', 'UK', 'CHINA', 'FRANCE'],
  },
];
    const { strings } = this.props;
    return (
      <View style={styles.wrapper}>
       <View>

       </View>
       <View style={styles.submitButton}>
         <Button block onPress={() => this.login()}>
           <Text>Login</Text>
         </Button>
       </View>
     </View>
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
)(MaintainAppointment);
