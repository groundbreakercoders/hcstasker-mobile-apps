import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import RNGooglePlaces from "react-native-google-places";
import { TextInput,Text, TouchableHighlight, Modal, Keyboard,Alert, Dimensions} from "react-native";
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
class MaintainAppointmentForm extends Component {
  constructor(props) {
      super(props);

      this.state = {
        loading: true,
        data: null,
        cost: "",
        date: ""
      };
      if(props.appointment) {
          this.state = {
            loading: true,
            data: null,
            cost: "",
            appointment:props.appointment,
            isEditMode: true
          };
        } else {
          this.state = {
            loading: true,
            data: null,
            cost: "",
            appointment:{},
            isEditMode: true
          };

      }
  }

  componentDidMount() {
  }


  openLocationSearch() {
    RNGooglePlaces.openAutocompleteModal()
      .then(place => {
        let userLocation = {
                            latitude: place.latitude,
                            longitude: place.longitude,
                            address: place.address
                          }
        this.setState({ appointment: { ...this.state.appointment, userLocation: userLocation} });
        console.log(this.state);
      }).catch(error => {
        console.log(error.message);
      });
  }
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
  render() {
    const { strings, appointment } = this.props;
    return (
      <View style={{ marginTop: 20 }}>
        <View style={{ marginTop: 15 }}>
          <Text style={{ color: "#44466B", fontSize: 24 }}>
            {strings.AFPatientName}
          </Text>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
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
          <Text style={{ color: "#44466B", fontSize: 24 }}>
            {strings.AFSponsorName}
          </Text>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
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
          <Text style={{ color: "#44466B", fontSize: 24 }}>
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
                  <Text style={{ marginRight:10, fontSize:20}} >Male</Text><Radio/>
              </RadioButton>
              <RadioButton style={styles.radioButton} value={"F"}>
                 <Radio/><Text style={{ marginLeft:10}}> Female</Text>
              </RadioButton>
            </RadioGroup>
            </Item>
          </View>
        </View>


          <View style={{ marginTop: 15 }}>
            <Text style={{ color: "#44466B", fontSize: 24 }}>
              {strings.AFDOB}
            </Text>
            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <Item style={{ flex: 1 }}>
              <DatePicker
                      style={{width: 200}}
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
                          fontSize: 25,
                          marginLeft: 20,
                            borderWidth: 0
                        },dateText: {
                          fontSize: 25
                        },


                  placeholderText: {
                      fontSize: 20,
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
          <Text style={{ color: "#44466B", fontSize: 24 }}>
            {strings.Address}
          </Text>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <Item style={{ flex: 1 }}>
              <Input
                placeholder={this.state.appointment&&this.state.appointment.address?this.state.data.appointment:strings.Address}
                placeholderTextColor="#8B8DAC"
                style={styles.input}

                value={(_.get(this.state,'appointment.userLocation.address') === null) ? '' : (_.get(this.state,'appointment.userLocation.address'))}
                onFocus={() => this.openLocationSearch()}
              />
            </Item>
          </View>
        </View>
        <View style={{ marginTop: 15 }}>
          <Text style={{ color: "#44466B", fontSize: 24 }}>
            {strings.phoneno}
          </Text>
          <View style={{  marginTop: 10 }}>
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
          <Text style={{ color: "#44466B", fontSize: 24 }}>
            {strings.AFRelationship}
          </Text>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <Item style={{ flex: 1 }}>
            <Input
              //onChangeText={text => this.setState({cost:text})}
              placeholderTextColor="#8B8DAC"
              style={styles.input}
              onChangeText={text => {
                this.setState({ appointment: { ...this.state.appointment, relationship: text} });
              }}
              value={this.state.appointment&&this.state.appointment.relationship?this.state.appointment.relationship:''}
              editable={true}
              // value={this.state.cost.toString()}
            />

            </Item>
          </View>
        </View>

        <View style={{ marginTop: 15 }}>
          <Text style={{ color: "#44466B", fontSize: 24 }}>
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
          <Text style={{ color: "#44466B", fontSize: 24 }}>
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
    );
  }
}

MaintainAppointmentForm = reduxForm({
  form: "maintainAppointment"
})(MaintainAppointmentForm);

const mapStateToProps = state => ({
  email: state.user.email
});


const bindActions = dispatch => ({
  saveAppointment: (appointment) =>
    dispatch(AppointmentActions.saveAppointment(appointment))
});

export default connect(
  mapStateToProps,
  bindActions
)(MaintainAppointmentForm);
