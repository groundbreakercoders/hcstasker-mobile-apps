import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { Picker, TouchableOpacity, TextInput,Text,StyleSheet, TouchableHighlight, Modal, Keyboard,Alert, Dimensions, StatusBar, YellowBox} from "react-native";
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
//import {RadioGroup, RadioButton, Radio} from "radio-react-native";
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import DatePickerCustom from "../../common/datePicker";
const { height, width } = Dimensions.get("window");
import moment from "moment";
import DatePicker from "react-native-datepicker";
import MapInput from '../../common/maps';
import RNPickerSelect from 'react-native-picker-select';
import Toast from 'react-native-root-toast'
import PhoneInput from 'react-phone-number-input';

const required = value => (value || typeof value === 'number' ? undefined : 'Required')
const validate = values => {
  const errors = {};
  if (!values.phoneno) {
    errors.phoneno = "Phone Number is Required";
  } else if (!/^[0-9]$/i.test(values.phoneno)) {
    errors.phoneno = "Invalid Phone Number";
  } else if (!values.password) {
    errors.password = "Password is Required";
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Entered passwords doesn't match";
  }
  return errors;
};

export const phoneNumber = value =>
  value && !/^(0|[1-9][0-9]{9})$/i.test(value)
    ? 'Invalid phone number, must be 10 digits'
    : undefined

var radio_props = [
  {label: 'Male', value: "M"},
  {label: 'Female', value: "F" }
];

class MaintainAppointmentForm extends Component {

  constructor(props) {
      super(props);
      this.state = {
        visible: false,
        error : ""
    };
      this.inputRefs = {
        relationship: null,
      };
      
      setTimeout(() => this.setState({
        visible: true
      }), 1000);

        let isEditable;
        let isDisabled;
        
        if(props.appointment) {
          if (props.appointment.status === 'Under Review' || props.appointment.status === 'Service Requested') {
              isEditable=true;
              isDisabled=false;
          } else {
              isEditable=false;
              isDisabled=true;
          }
        } else{
          isEditable=true;
          isDisabled=false;
      }

      if(props.appointment) {
          this.state = {
            loading: true,
            data: null,
            cost: "",
            appointment:props.appointment,
            isEditMode: isEditable,
           isDisabled: isDisabled,
          };
        } else {
          this.state = {
            loading: true,
            data: null,
            cost: "",
            appointment:{},
            isEditMode: isEditable,
            isDisabled: isDisabled,
            relationship:undefined,
            serviceType:undefined,
          };
      }
  }

  componentDidMount() {
  }

  mobilevalidate(text) {
    const reg = /^[0]?[789]\d{9}$/;
    if (reg.test(text) === false) {
      this.setState({
        mobilevalidate: false,
        telephone: text,
      });
      return false;
    } else {
      this.setState({
        mobilevalidate: true,
        telephone: text,
        message: '',
      });
      return true;
    }
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
    const pickerSelectStyles = StyleSheet.create({
      inputIOS: {
        fontSize: 18,
        color: this.state.isEditMode ? '#44466B' : '#C0C0C0',
        borderColor: this.state.isEditMode ? 1 : 0,
        padding:5
      },
      inputAndroid: {
        fontSize: 18
      }
    });
    const { strings, appointment } = this.props;

    const relationships = [
      {
        label: '',
        value: ''
      },{
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
        value: 'Other'
      }
    ];

    const serviceType = [
      {
        label: '',
        value: ''
      },
      {
        label: 'Nurse',
        value: 'Nurse'
      },{
        label: 'physiotherapist',
        value: 'physiotherapist'
      },{
        label: 'Baby Sitter',
        value: 'Baby Sitter'
      },
    ];

    return (
      <View style={styles.container}>
      {this.state.placesModal === true ? (
        <View style={{ marginTop: 20 }}>
          <MapInput notifyChange={details => this.getPlaces(details)} />
        </View>
      ) : (
      <View style={styles.header}>
        <View style={{ marginTop: 20 }}>
            <Text style={styles.textInput}>{strings.AFPatientName}</Text>
            <View style={{marginTop:1}}>
              <TextInput style={[styles.input, { color: this.state.isEditMode ? '#44466B' : '#C0C0C0',
                borderWidth: this.state.isEditMode ? 2 : 0}]}
                onChangeText={text => {
                  this.setState({ appointment: { ...this.state.appointment, patientName: text} });
                }}
                value={this.state.appointment&&this.state.appointment.patientName?this.state.appointment.patientName:''}
                editable={this.state.isEditMode}
              />
              {!!this.state.nameError && (<Text style={{ color: "red"}}>{this.state.nameError}</Text>)}
            </View>
          </View>

        <View>
            <Text style={styles.textInput}>{strings.AFSponsorName}</Text>
            <View style={{marginTop:1}}>
            <TextInput style={[styles.input, { color: this.state.isEditMode ? '#44466B' : '#C0C0C0',
                borderWidth: this.state.isEditMode ? 2 : 0}]}
                onChangeText={text => {
                  this.setState({ appointment: { ...this.state.appointment, sponsorName: text} });
                }}
                editable={this.state.isEditMode}
                value={this.state.appointment&&this.state.appointment.sponsorName?this.state.appointment.sponsorName:''}
                />
                {!!this.state.nameError1 && (<Text style={{ color: "red"}}>{this.state.nameError1}</Text>)}
          </View>
        </View>

        <View>
            <Text style={styles.textInput}>{strings.AFGender}</Text>
            <View style={{ marginTop:1, marginLeft:20}}>
            <RadioForm
              radio_props={radio_props}
              initial={this.genderIdx()}
              formHorizontal={false}
              labelHorizontal={true}
              buttonColor={'#44466B'}
              animation={true}
              selectedButtonColor = {this.state.isDisabled ? '#C0C0C0' : 'blue'}
              selectedLabelColor = {this.state.isDisabled ? '#C0C0C0' : 'blue'}
              labelStyle = {{ fontSize:18}}
              disabled={this.state.isDisabled}
              onPress={(value,index)=>this.onChooseGender(value,index)}
            />
          </View>
        </View>

          <View>
              <Text style={styles.textInput}>{strings.AFDOB}</Text>
              <View style={{ marginTop:1}}>
              <DatePicker
                      style={{margin:15,marginTop:1, width: 200}}
                      date={(_.get(this.state,'appointment.dob') === null) ? '' : (_.get(this.state,'appointment.dob'))}
                      mode="date"
                      format="DD-MM-YYYY"
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      disabled={this.state.isDisabled}
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
                            color: this.state.isDisabled ? '#C0C0C0' : '44466B',
                            fontSize: 17,
                            marginLeft: 15,
                            paddingLeft:5
                        }
                        // ... You can check the source to find the other keys.
                      }}
                      onDateChange={(date) => {
                        this.setState({ appointment: { ...this.state.appointment, dob: date} });
                      }
                      }
                    />
            </View>
          </View>

        <View>
            <Text style={styles.textInput}>{strings.AFAddress}</Text>
            <View style={{ marginTop:1}}>
            <TextInput style={[styles.input, { color: this.state.isEditMode ? '#44466B' : '#C0C0C0',
                borderWidth: this.state.isEditMode ? 2 : 0}]}
                placeholder={this.state.appointment&&this.state.appointment.address?this.state.data.appointment:''}
                value={(_.get(this.state,'appointment.userLocation.address') === null) ? '' : (_.get(this.state,'appointment.userLocation.address'))}
                onFocus={() => this.openLocationSearch()}
                editable={this.state.isEditMode}
            />
          </View>
        </View>

        
        <View>
          <View>
            <Text style={styles.textInput}>{strings.AFPhoneNumber}</Text>
            <TextInput style={[styles.input, { color: this.state.isEditMode ? '#44466B' : '#C0C0C0',
                borderWidth: this.state.isEditMode ? 2 : 0}]}
                placeholder={this.state.appointment&&this.state.appointment.address?this.state.data.appointment:''}
                keyboardType={'phone-pad'}
                returnKeyType='done'
                autoCapitalize='none'
                onChangeText={text => {
                  this.setState({ appointment: { ...this.state.appointment, phoneno: text} });
                }}
                value={this.state.appointment&&this.state.appointment.phoneno?this.state.appointment.phoneno:''}
                autoCorrect={false}
                secureTextEntry={false}
                editable={this.state.isEditMode}
            />
            {!!this.state.phoneNumberError && (<Text style={{ color: "red"}}>{this.state.phoneNumberError}</Text>)}
          </View>
        </View>

      <View>
        <Text style={styles.textInput}>{strings.AFRelationship}</Text>
          <View style={{ borderWidth:2,borderColor:'#000000',margin:15,marginTop:1, height: 40}}>
            <Icon
              name='ios-arrow-down'
              size={20}
              color='white'
              style={[{right: 18, top: 1, position: 'absolute'}]}
            />
            <RNPickerSelect
                placeholder={{}}
                items={relationships}
                onValueChange={value => {
                                this.setState({
                                  appointment: { ...this.state.appointment, relationship: value}
                                });
                              }}
                style={pickerSelectStyles}
                value={this.state.appointment.relationship}
                disabled={this.state.isDisabled}
              />

          </View>
        </View>

        <View>
          <Text style={styles.textInput}>{strings.AFServiceType}</Text>
          <View style={{ borderWidth:2,borderColor:'#000000',margin:15, marginTop:1, height: 40}}>
            <Icon
              name='ios-arrow-down'
              size={20}
              color='white'
              style={[{right: 18, top: 1, position: 'absolute'}]}
            />
            <RNPickerSelect
                    placeholder={{}}
                      items={serviceType}
                      onValueChange={value => {
                                      this.setState({
                                        appointment: { ...this.state.appointment, serviceType: value}
                                      });
                                    }}
                        style={pickerSelectStyles}
                      value={this.state.appointment.serviceType}
                      disabled={this.state.isDisabled}
                    />
          </View>
        </View>

    <View>
          <Text style={styles.textInput}>{strings.AFMedicalConditions}</Text>
          <View style={{ margin:15,marginTop:1}}>
            <TextInput style={[styles.textArea, { color: this.state.isEditMode ? '#44466B' : '#C0C0C0',
                borderWidth: this.state.isEditMode ? 2 : 0}]}
                onChangeText={text => {
                  this.setState({ appointment: { ...this.state.appointment, medicalCondition: text} });
                }}
                value={this.state.appointment&&this.state.appointment.medicalCondition?this.state.appointment.medicalCondition:''}
                editable={this.state.isEditMode}
                multiline={true}
                scrollEnabled = {false}
                numberOfLines={4}
                selectionColor={commonColor.lightThemePlaceholder}
                enableAutoAutomaticScroll={false}
              />
          </View>
        </View>


        <View >
          <Text style={styles.textInput}>{strings.AFOtherInstructions}</Text>
          <View style={{ margin:15,marginTop:1}}>
            <TextInput style={[styles.textArea, { color: this.state.isEditMode ? '#44466B' : '#C0C0C0',
                borderWidth: this.state.isEditMode ? 2 : 0}]}
                onChangeText={text => {
                  this.setState({ appointment: { ...this.state.appointment, otherInstructions: text} });
                }}
                value={this.state.appointment&&this.state.appointment.otherInstructions?this.state.appointment.otherInstructions:''}
                editable={this.state.isEditMode}
                multiline={true}
                numberOfLines={4}
                selectionColor={commonColor.lightThemePlaceholder}
                enableAutoAutomaticScroll={false}
            />
          </View>
         </View>

        {this.props.user.userType === "tasker"? (
          <View>
            <Text style={styles.textInput}>{strings.AFSupervisorComments}</Text>
            <View style={{ margin:15,marginTop:1}}>
              <TextInput style={[styles.textArea, { backgroundColor: this.state.isEditMode ? '#FFF' : '#C0C0C0' }]}
                onChangeText={text => {
                  this.setState({ appointment: { ...this.state.appointment, supervisorComments: text} });
                }}
                value={this.state.appointment&&this.state.appointment.supervisorComments?this.state.appointment.supervisorComments:''}
                editable={this.state.isEditMode}
                multiline={true}
                numberOfLines={4}
                selectionColor={commonColor.lightThemePlaceholder}
                enableAutoAutomaticScroll={false}
              />
            </View>
        </View> ) : null }
        
         <Button
          disabled = {this.state.isDisabled}
          onPress={() => {
            if (this.state.appointment.patientName == null ){
              this.setState(() => ({ nameError: "Patient Name required"}));
            } else {
              this.setState(() => ({ nameError: null}))
            }
            if (this.state.appointment.sponsorName == null){
              this.setState(() => ({ nameError1: "Sponsor Name required"}));
            } else{
              this.setState(() => ({ nameError1: null}))
            }
            if (this.state.appointment.phoneNumber == null){
                this.setState(() => ({ phoneNumberError: "Phone Number required"}));
              } else if (this.state.appointment.phoneNumber != null){
              this.mobilevalidate(this.state.phoneNumber)
              if(this.mobilevalidate == false){
                this.setState(() => ({ phoneNumberError: "Invalid Phone Number"}));
              } else {
              this.setState(() => ({ phoneNumberError: null}))
            } }            
            if (this.state.appointment.patientName != null && this.state.appointment.sponsorName != null){
              this.submit()
              Toast.show('Appoinment Created Succesfully',{
                duration: 3500,
                position: 75,
                shadow: true,
                animation: true,
                backgroundColor:'#800000',
                hideOnPress:true,
              })
            }
          }}

          rounded 
          style={[styles.updateButton, { backgroundColor: this.state.isDisabled ? '#C0C0C0' : commonColor.brandPrimary}]}
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
  isAddressClicked:false,
  user: state.user
});

const bindActions = dispatch => ({
  saveAppointment: (appointment) =>
    dispatch(AppointmentActions.saveAppointment(appointment))
});

export default connect(
  mapStateToProps,
  bindActions
)(MaintainAppointmentForm);
