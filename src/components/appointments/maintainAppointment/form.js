import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import RNGooglePlaces from "react-native-google-places";
import { TextInput,Text, TouchableHighlight, Modal, Keyboard,Alert} from "react-native";
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
class MaintainAppointmentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: null,
      cost: ""
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

  setAppointmentState(appointment) {

  }

  componentDidMount() {
  }


  setServices() {
    const address = Object.assign(
      {},
      {
        lat: this.state.latitude,
        lng: this.state.longitude,
        add: this.state.address
      }
    );

    console.log(address, "Address", this.state)

    this.props.setServiceAndCategory(
      this.state.cat,
      this.state.subcat,
      // this.state.cost,
      // console.log(typeof this.state.cost,"before Change"),
      parseInt(this.state.cost,10),
      // console.log(typeof parseInt(this.state.cost,10),"after Change"),
      // this.state.cost,
      // 300,
      address
    );
  }

  handleCostText(text) {
    this.setState({ cost: text });
  }
  _dropdown_2_onSelect(idx, value) {
    // console.log(value,"here*****")
    this.setState({ cat: value,subcat:[],flag:1 });
  }

  renderCats() {
    const options = [];
    _.map(data, (data, ind) => options.push(data.name));
    // this.setState({subcat:''})
    return options;

  }

  clearText = () => {
    this.setState({
      searchInput: "",
      loading: false,
      createTagError: false
    });
  };
  setsubcategories(subcat) {
    // console.log(subcat,"SUBca888888888888")
    var Subcat = this.state.subcat
    // console.log(this.state.subcat,"HHHHHHHH")
    subcat.forEach(element =>{
      // console.log(element,Subcat,"compare")
      var id = Subcat.findIndex(x=>x.name == element.name)
      // console.log(id,"compare")
      if(id===-1)
      Subcat.push(element)
    })
    this.setState({ subcat: Subcat });
  }

  openLocationSearch() {
    RNGooglePlaces.openAutocompleteModal()
      .then(place => {
        this.setState({
          latitude: place.latitude,
          longitude: place.longitude,
          address: place.address
        });
      })
      .catch(error => console.log(error.message));
  }
  clearSubCat(text){
    console.log(text,'here')
  }
  changeInput(){
    this.state.flag===1?this.modal.open():Alert.alert("Select Category")
  }
  onChooseGender(value,index) {
    console.log(value);
    console.log(index);
  }
  submit() {
    this.props.saveAppointment(this.state.appointment);
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
              onChangeText={text => _.set(this.state,'appointment.patientName',text)}
              placeholderTextColor="#8B8DAC"
              style={styles.input}
              value={(_.get(this.state,'appointment.patientName') === null) ? '' : (_.get(this.state,'appointment.patientName'))}
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
              //onChangeText={text => this.setState({cost:text})}
              placeholderTextColor="#8B8DAC"
              style={styles.input}
              value={(_.get(this.state,'appointment.sponsorName') === null) ? '' : (_.get(this.state,'appointment.sponsorName'))}
              editable={true}
              // value={this.state.cost.toString()}
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
                defaultChoice={0}
                style={{ flexDirection: "row",  marginTop: 10, marginBottom: 10  }}
                onChoose={(value,index)=>this.onChooseGender(value,index)}
                >
              <RadioButton style={{alignItems: "center",  justifyContent: "center",  flexDirection: "row",  marginRight:10}} value={"M"}>
                  <Text style={{ marginRight:10}} >Male</Text><Radio/>
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
            {strings.Address}
          </Text>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <Item style={{ flex: 1 }}>
              <Input
                // placeholder={strings.Address}
                placeholder={this.state.appointment&&this.state.appointment.address?this.state.data.appointment:strings.Address}
                // defaultValue={this.state.data&&this.state.data.address?this.state.data.address:""}
                placeholderTextColor="#8B8DAC"
                style={styles.input}
                value={this.state.address}
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
                    placeholder='+44766554433'
                    placeholderTextColor='#adb4bc'
                    keyboardType={'phone-pad'}
                    returnKeyType='done'
                    autoCapitalize='none'
                    autoCorrect={false}
                    secureTextEntry={false}
                    style={styles.input}
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
              onChangeText={review => this.setState({ review })}
              placeholder={strings.medicalCondition}
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
