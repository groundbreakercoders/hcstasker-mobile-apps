import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { TouchableOpacity, TextInput,Text,StyleSheet, TouchableHighlight, Modal, Keyboard,Alert, Dimensions, StatusBar, YellowBox} from "react-native";
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

class MaintainAppointmentForm extends Component {

  constructor(props) {
      super(props);

      this.inputRefs = {
        relationship: null,
      };
<<<<<<< HEAD
      
    const validate = ({ patientName }) => {
      const errors = {}
      if (patientName.trim() == null){
        errors.patientName = 'Must not be blank'
      }
      return errors;
    };
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
=======
  const validate = ({ patientName }) => {
    const errors = {}
    if (patientName.trim() == null){
      errors.patientName = 'Must not be blank'
    }
    return errors;
  };
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

>>>>>>> 89eb6ea336833b1486f83765f7dbc0668a08852a
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
    const pickerSelectStyles = StyleSheet.create({
      inputIOS: {
        fontSize: 18,
        paddingVertical: 12,
        paddingHorizontal: 10,
        color: 'white',
        borderBottomColor: '#f8f8f8',
        borderBottomWidth: 1,
        paddingRight: 30, // to ensure the text is never behind the icon
      },
      inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        color: 'white',
        borderBottomColor: '#f8f8f8',
        borderBottomWidth: 1,
        paddingRight: 30, // to ensure the text is never behind the icon
      },
    });
    const { strings, appointment } = this.props;
    
    const serviceType = [
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
    ]
    
    
    return (
      <View style={styles.container}>
<<<<<<< HEAD
        {this.state.placesModal === true ? (
          <View style={{ marginTop: 20 }}>
            <MapInput notifyChange={details => this.getPlaces(details)} />
          </View>
        ) : (
        <View style={ styles.header}>
          <View style={{ marginTop: 20 }}>
            <View>
              <TextInput style={styles.textInput}
=======
      {this.state.placesModal === true ? (
        <View style={{ marginTop: 20 }}>
          <MapInput notifyChange={details => this.getPlaces(details)} />
        </View>
      ) : (
      <View style={ styles.header}>
        <View style={{ marginTop: 20 }}>
          <View style={{alignSelf: 'stretch'}}>
          <TextInput style={styles.textInput}
>>>>>>> 89eb6ea336833b1486f83765f7dbc0668a08852a
                placeholder="Patient Name"
                placeholderTextColor="#000000"
                underlineColorAndroid={'transparent'}
                onChangeText={text => {
                  this.setState({ appointment: { ...this.state.appointment, patientName: text} });
                }}
                value={this.state.appointment&&this.state.appointment.patientName?this.state.appointment.patientName:''}
              />
              {!!this.state.nameError && (<Text style={{ color: "red"}}>{this.state.nameError}</Text>)}
            </View>
          </View>
<<<<<<< HEAD
        
          <View style={{ marginTop: 15 }}>
            <View style={{ alignSelf: 'stretch' }}>
              <TextInput style={styles.textInput}
                  placeholder="Sponsor Name"
                  placeholderTextColor="#000000"
                  underlineColorAndroid={'transparent'}
                  onChangeText={text => {
                    this.setState({ appointment: { ...this.state.appointment, sponsorName: text} });
                  }}
                  value={this.state.appointment&&this.state.appointment.sponsorName?this.state.appointment.sponsorName:''}
              />
              {!!this.state.nameError1 && (<Text style={{ color: "red"}}>{this.state.nameError1}</Text>)}
            </View>
=======
        </View>
        <View style={{ marginTop: 15 }}>
          <View style={{ alignSelf: 'stretch' }}>
          <TextInput style={styles.textInput}
                placeholder="Sponsor Name"
                placeholderTextColor="#000000"
                underlineColorAndroid={'transparent'}
                onChangeText={text => {
                  this.setState({ appointment: { ...this.state.appointment, sponsorName: text} });
                }}
                value={this.state.appointment&&this.state.appointment.sponsorName?this.state.appointment.sponsorName:''}
                />
                {!!this.state.nameError1 && (<Text style={{ color: "red"}}>{this.state.nameError1}</Text>)}
>>>>>>> 89eb6ea336833b1486f83765f7dbc0668a08852a
          </View>

        <View style={{ marginTop: 15 }}>
          <View style={{  alignSelf: 'stretch' }}>
              <RadioGroup
                defaultChoice={this.genderIdx()}
                style={{ color: '#fff', flexDirection: "row", marginBottom: 30 , borderBottomColor: '#000000',borderBottomWidth: 1 }}
                onChoose={(value,index)=>this.onChooseGender(value,index)}
                >
              <RadioButton style={styles.radioButton} value={"M"}>
                  <Text style={{ color:'#000000',marginRight:10, marginTop:10, fontSize:18, height: 30}} >Male</Text><Radio/>
              </RadioButton>
              <RadioButton style={styles.radioButton} value={"F"}>
                 <Radio/><Text style={{ color:'#000000',marginLeft:10, marginTop:10, fontSize:18, height: 30}}> Female</Text>
              </RadioButton>
            </RadioGroup>
          </View>
        </View>


          <View style={{ marginTop: 15 }}>
            <View style={{ alignSelf: 'stretch',borderBottomColor: '#000000',borderBottomWidth: 1,marginBottom:20 }}>
              <DatePicker
                      style={{width: 175}}
                      date={(_.get(this.state,'appointment.dob') === null) ? '' : (_.get(this.state,'appointment.dob'))}
                      mode="date"
                      placeholder="Please select date"
                      placeholderTextColor="#000000"
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
                            color: '#000000',
                            fontSize: 17,
                            marginLeft: 15
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




        <View style={{ marginTop: 20 }}>
          <View style={{ alignSelf: 'stretch' }}>
            <TextInput style={styles.textInput}
                placeholder={this.state.appointment&&this.state.appointment.address?this.state.data.appointment:''}
                placeholder="Address"
                placeholderTextColor="#000000"
                underlineColorAndroid={'transparent'}
                value={(_.get(this.state,'appointment.userLocation.address') === null) ? '' : (_.get(this.state,'appointment.userLocation.address'))}
                onFocus={() => this.openLocationSearch()}
            />
          </View>
        </View>

        <View style={{ marginTop: 20 }}>
          <View style={{ alignSelf: 'stretch' }}>
            <TextInput style={styles.textInput}
                placeholder={this.state.appointment&&this.state.appointment.address?this.state.data.appointment:''}
                placeholder="Phone Number"
                placeholderTextColor="#000000"
                underlineColorAndroid={'transparent'}
                keyboardType={'phone-pad'}
                returnKeyType='done'
                autoCapitalize='none'
                onChangeText={text => {
                  this.setState({ appointment: { ...this.state.appointment, phoneno: text} });
                }}
                value={this.state.appointment&&this.state.appointment.phoneno?this.state.appointment.phoneno:''}
                autoCorrect={false}
                secureTextEntry={false}
            />
          </View>
        </View>

      <View style={{ marginTop: 35 }}>
          <View style={{ alignSelf: 'stretch' ,borderBottomColor: '#000000',borderBottomWidth: 1, marginBottom:20, height: 30}}>
            <RNPickerSelect
                placeholder={{ }}
                items={relationships}
                onValueChange={value => {
                                this.setState({
                                  appointment: { ...this.state.appointment, relationship: value}
                                });
                              }}
                style={ {}}
                value={this.state.appointment.relationship}
              />
          </View>
        </View>


        <View style={{ marginTop: 45 }}>
          <View style={{ alignSelf: 'stretch' ,borderBottomColor: '#000000',borderBottomWidth: 1, marginBottom:20, height: 30 }}>
            <RNPickerSelect
                    placeholder={{}}
                      items={serviceType}
                      onValueChange={value => {
                                      this.setState({
                                        appointment: { ...this.state.appointment, serviceType: value}
                                      });
                                    }}
                      style={ styles.inputIOS,styles.inputAndroid}
                      value={this.state.appointment.serviceType}
                    />
          </View>
        </View>

    <View style={{ marginTop: 50 }}>
          <View style={{ alignSelf: 'stretch' }}>
            <TextInput style={styles.textArea}
              placeholderTextColor="#000000"
              underlineColorAndroid={'transparent'}
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
          </View>
        </View>


        <View style={{ marginTop: 30 }}>
          <View style={{ alignSelf: 'stretch' }}>
            <TextInput style={styles.textArea}
            placeholderTextColor="#000000"
            underlineColorAndroid={'transparent'}
            placeholder={strings.otherInstructions}
              onChangeText={text => {
                this.setState({ appointment: { ...this.state.appointment, otherInstructions: text} });
              }}
              value={this.state.appointment&&this.state.appointment.otherInstructions?this.state.appointment.otherInstructions:''}
              editable={true}
              multiline={true}
              numberOfLines={4}
              selectionColor={commonColor.lightThemePlaceholder}
            />
          </View>
         </View>

        <Button
          onPress={() => {
            if (this.state.appointment.patientName == null ){
              this.setState(() => ({ nameError: "Patient Name required"}));
<<<<<<< HEAD
=======
            }

            if (this.state.appointment.sponsorName == null){
              this.setState(() => ({ nameError1: "Sponsor Name required"}));
>>>>>>> 89eb6ea336833b1486f83765f7dbc0668a08852a
            } else {
              this.setState(() => ({ nameError: null}))
            }
            if (this.state.appointment.sponsorName == null){
              this.setState(() => ({ nameError1: "Sponsor Name required"}));
            } else{
              this.setState(() => ({ nameError1: null}))
            }
            if (this.state.appointment.patientName != null && this.state.appointment.sponsorName != null){
              this.submit()
            }
          }}

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
