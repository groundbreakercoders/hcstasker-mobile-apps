import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";

import { TextInput,Text,StyleSheet, TouchableHighlight, Modal, Keyboard,Alert, Dimensions} from "react-native";
import {
  Item,
  Input,
  Button,
  Grid,
  Col,
  View,
  Spinner,
  Icon,
  ListItem,
} from "native-base";
import PropTypes from "prop-types";
import _ from "lodash";
import ModalDropdown from "react-native-modal-dropdown";
import AppointmentActions from "../../../Redux/appointmentstore";
import Header from "../../common/header";
import MIcon from "../../common/mIcon";
import RenderTag from "../../common/renderSubCategories";
import commonColor from "../../../../native-base-theme/variables/commonColor";
import styles from "./styles";
import firebase from "react-native-firebase";
import data from "../../../utils/data";
import {RadioGroup, RadioButton, Radio} from "radio-react-native";
import DatePickerCustom from "../../common/datePicker";
const { height, width } = Dimensions.get("window");
import moment from "moment";
import DatePicker from "react-native-datepicker";
import MapInput from '../../common/maps';
import RNPickerSelect from 'react-native-picker-select';

class MaintainAppointmentForm extends Component {
  constructor(props) {
      super(props);

      if(props.appointment) {
          this.state = {
            loading: true,
            data: null,
            cost: "",
            appointment:props.appointment,
            isEditMode: true,
          };
        } else {
          this.state = {
            loading: true,
            data: null,
            cost: "",
            appointment:{},
            isEditMode: true,
            relationship:undefined,
            serviceType:undefined
          };

      }
  }

  componentDidMount() {
  }

openLocationSearch(){
this.setState({placesModal:true});
}
  // openLocationSearch() {
  //   RNGooglePlaces.openAutocompleteModal()
  //     .then(place => {
  //       let userLocation = {
  //                           latitude: place.latitude,
  //                           longitude: place.longitude,
  //                           address: place.address
  //                         }
  //       this.setState({ appointment: { ...this.state.appointment, userLocation: userLocation} });
  //       console.log(this.state);
  //     }).catch(error => {
  //       console.log(error.message);
  //     });
  // }
  onChooseGender(value,index) {
    this.setState({ appointment: { ...this.state.appointment, gender: value} });
  }
  submit() {
    this.props.saveAppointment(this.state.appointment);
  }
  genderIdx() {
    if(this.state.appointment.gender === "M") {
      return 0;
    } if(this.state.appointment.gender === "F") {
      return 1;
    } else {
      return '';
    }
  }
  setPatientName(patientName) {
    console.log(patientName);
    this.setState({ appointment: { ...this.state.appointment, patientName: patientName} });
  }

  getPlaces(details) {
    let userLocation = {
                       latitude: details.geometry.location.lat,
                       longitude: details.geometry.location.lng,
                       address: details.formatted_address
                       }
    this.setState({ appointment: { ...this.state.appointment, userLocation: userLocation} });
    this.setState({placesModal:false});
  }


  render() {
    const { strings, appointment } = this.props;
    const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

const serviceType = [
  {
    label: 'Place Holder1',
    value: 'PH'
  },{
    label: 'Place Holder2',
    value: 'mother'
  },
]

const relationships = [
  {
    label: 'Father',
    value: 'father'
  },{
    label: 'Mother',
    value: 'mother'
  },
  {
    label: 'Brother',
    value: 'brother'
  },
  {
    label: 'Sister',
    value: 'sister'
  },
  {
    label: 'Friend',
    value: 'friend'
  },
  {
    label: 'Other',
    value: ''
  }
];
    return (
      <View>
      {this.state.placesModal === true ? (
        <View style={{ marginTop: 20 }}>
          <MapInput notifyChange={details => this.getPlaces(details)} />
        </View>
      ) : (
      <View style={{ marginTop: 20 }}>
        <View style={{ marginTop: 15 }}>
          <Text style={{ color: "#a9a9a9", fontSize: 15 }}>
            {strings.AFPatientName}
          </Text>
          <View style={{height: 20, borderColor: 'gray', borderWidth: 0, flexDirection: "row", marginTop: 10 }}>
            <Item style={{ flex: 1 }}>

            <Input
              onChangeText={text => {
                this.setState({ appointment: { ...this.state.appointment, patientName: text} });
              }}
              value={this.state.appointment&&this.state.appointment.patientName?this.state.appointment.patientName:''}
              placeholderTextColor="#8B8DAC"
              style={styles.input}
              editable={true}
              // value={this.state.cost.toString()}
            />
            </Item>
          </View>
        </View>
        <View style={{ marginTop: 15 }}>
          <Text style={{ color: "#a9a9a9", fontSize: 15 }}>
            {strings.AFSponsorName}
          </Text>
          <View style={{ height: 20, borderColor: 'gray', borderWidth: 0,flexDirection: "row", marginTop: 10 }}>
            <Item style={{ flex: 1 }}>
            <Input
              placeholderTextColor="#8B8DAC"
              style={styles.input}
              onChangeText={text => {
                this.setState({ appointment: { ...this.state.appointment, sponsorName: text} });
              }}
              value={this.state.appointment&&this.state.appointment.sponsorName?this.state.appointment.sponsorName:''}
              editable={true}
            />

            </Item>
          </View>
        </View>

        <View style={{ marginTop: 15 }}>
          <Text style={{ color: "#a9a9a9", fontSize: 15 }}>
            {strings.AFGender}
          </Text>
          <View style={{  marginTop: 10 }}>
            <Item style={{ flex: 1 }}>
              <RadioGroup
                defaultChoice={this.genderIdx()}
                style={{ flexDirection: "row",  marginTop: 10, marginBottom: 10  }}
                onChoose={(value,index)=>this.onChooseGender(value,index)}
                >
              <RadioButton style={{alignItems: "center",  justifyContent: "center",  flexDirection: "row",  marginRight:10}} value={"M"}>
                  <Text style={{ color:'#234456',marginRight:10, fontSize:15}} >Male</Text><Radio/>
              </RadioButton>
              <RadioButton style={styles.radioButton} value={"F"}>
                 <Radio/><Text style={{ color:'#234456',marginLeft:10,fontSize:15}}> Female</Text>
              </RadioButton>
            </RadioGroup>
            </Item>
          </View>
        </View>


          <View style={{ marginTop: 15 }}>
            <Text style={{ color: "#a9a9a9", fontSize: 15 }}>
              {strings.AFDOB}
            </Text>
            <View style={{ height: 30, borderColor: 'gray', borderWidth: 0,flexDirection: "row", marginTop: 10 }}>
              <Item style={{ flex: 1 }}>
              <DatePicker
                      style={{width: 175}}
                      date={(_.get(this.state,'appointment.dob') === null) ? '' : (_.get(this.state,'appointment.dob'))}
                      mode="date"
                      placeholder="Please select date"
                      format="DD-MM-YYYY"
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      customStyles={{
                        dateIcon: {
                          position: 'absolute',
                          left: 0,
                          top: 4,
                          marginLeft: 0
                        },
                        dateInput: {
                          justifyContent: 'center',
                          alignItems: 'center',
                          padding: 5,
                          marginLeft: 10,
                          borderWidth: 0
                        },dateText: {
                          fontSize: 20
                        },


                  placeholderText: {
                      fontSize: 15,
                      marginLeft: 15,
                      color: '#234456'
                  }
                        // ... You can check the source to find the other keys.
                      }}
                      onDateChange={(date) => {
                        this.setState({ appointment: { ...this.state.appointment, dob: date} });
                      }
                      }
                    />

              </Item>
            </View>
          </View>


        <View style={{ marginTop: 15 }}>
          <Text style={{ color: "#a9a9a9", fontSize: 15 }}>
            {strings.Address}
          </Text>
          <View style={{ height: 20, borderColor: 'gray', borderWidth: 0,flexDirection: "row", marginTop: 10 }}>
            <Item style={{ flex: 1 }}>
            <Input
              placeholder={this.state.appointment&&this.state.appointment.address?this.state.data.appointment:''}
              placeholderTextColor="#8B8DAC"
              style={{fontSize: 10,color: '#234456'}}
              style={styles.input}

              value={(_.get(this.state,'appointment.userLocation.address') === null) ? '' : (_.get(this.state,'appointment.userLocation.address'))}
              onFocus={() => this.openLocationSearch()}
              
            />
            </Item>
          </View>
        </View>
        <View style={{ marginTop: 15 }}>
          <Text style={{ color: "#a9a9a9", fontSize: 15 }}>
            {strings.phoneno}
          </Text>
          <View style={{ height: 20, borderColor: 'gray', borderWidth: 0, marginTop: 10 }}>
            <Item style={{ flex: 1 }}>
            <Input
                    placeholderTextColor='#adb4bc'
                    keyboardType={'phone-pad'}
                    returnKeyType='done'
                    autoCapitalize='none'
                    onChangeText={text => {
                      this.setState({ appointment: { ...this.state.appointment, phoneno: text} });
                    }}
                    value={this.state.appointment&&this.state.appointment.phoneno?this.state.appointment.phoneno:''}
                    autoCorrect={false}
                    secureTextEntry={false}
                    style={styles.input}
                  />
            </Item>
          </View>
        </View>

        <View style={{ marginTop: 15 }}>
          <Text style={{ color: "#a9a9a9", fontSize: 15 }}>
            {strings.AFRelationship}
          </Text>
          <View style={{ height: 20, borderColor: 'gray', borderWidth: 0,flexDirection: "row", marginTop: 10 }}>
            <Item style={{ flex: 1 }}>

            <RNPickerSelect
                    placeholder={{}}
                      items={relationships}
                      onValueChange={value => {
                                      this.setState({
                                        appointment: { ...this.state.appointment, relationship: value}
                                      });
                                    }}
                      style={ styles.inputIOSstyles,styles.inputAndroid}
                      value={this.state.appointment.relationship}
                    />
            </Item>
          </View>
        </View>

        <View style={{ marginTop: 15 }}>
          <Text style={{ color: "#a9a9a9", fontSize: 15 }}>
            {strings.AFServiceType}
          </Text>
          <View style={{ height: 20, borderColor: 'gray', borderWidth: 0,flexDirection: "row", marginTop: 10 }}>
            <Item style={{ flex: 1 }}>

            <RNPickerSelect
                    placeholder={{}}
                      items={serviceType}
                      onValueChange={value => {
                                      this.setState({
                                        appointment: { ...this.state.appointment, serviceType: value}
                                      });
                                    }}
                      style={ styles.inputIOSstyles,styles.inputAndroid}
                      value={this.state.appointment.serviceType}
                    />
            </Item>
          </View>
        </View>

        <View style={{ marginTop: 15 }}>
          <Text style={{ color: "#a9a9a9", fontSize: 15 }}>
            {strings.AFMedicalConditions}
          </Text>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <Item style={{ flex: 1 }}>
            <TextInput
              style={styles.textArea}
              placeholder={strings.medicalCondition}
              onChangeText={text => {
                this.setState({ appointment: { ...this.state.appointment, medicalCondition: text} });
              }}
              value={this.state.appointment&&this.state.appointment.medicalCondition?this.state.appointment.medicalCondition:''}
              editable={true}
              multiline={true}
              numberOfLines={4}
              selectionColor={commonColor.lightThemePlaceholder}
            />

            </Item>
          </View>
        </View>


        <View style={{ marginTop: 15 }}>
          <Text style={{ color: "#a9a9a9", fontSize: 15 }}>
            {strings.AFOtherInstructions}
          </Text>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <Item style={{ flex: 1 }}>
            <TextInput
              style={styles.textArea}
              onChangeText={text => {
                this.setState({ appointment: { ...this.state.appointment, otherInstructions: text} });
              }}
              value={this.state.appointment&&this.state.appointment.otherInstructions?this.state.appointment.otherInstructions:''}
              placeholder={strings.otherInstructions}
              editable={true}
              multiline={true}
              numberOfLines={4}
              selectionColor={commonColor.lightThemePlaceholder}
            />

            </Item>
          </View>
        </View>

        <Button
          onPress={() => this.submit()}
          rounded
          style={styles.updateButton}
        >

            <Text style={styles.buttonText}>{strings.Save}</Text>

        </Button>
      </View>
)}
</View>
    );
  }
}

MaintainAppointmentForm = reduxForm({
  form: "maintainAppointment"
})(MaintainAppointmentForm);

const mapStateToProps = state => ({
  email: state.user.email,
  isAddressClicked:false
});


const bindActions = dispatch => ({
  saveAppointment: (appointment) =>
    dispatch(AppointmentActions.saveAppointment(appointment))
});

export default connect(
  mapStateToProps,
  bindActions
)(MaintainAppointmentForm);
