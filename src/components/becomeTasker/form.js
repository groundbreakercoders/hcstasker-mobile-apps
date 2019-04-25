import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import RNGooglePlaces from "react-native-google-places";
import { Text, TouchableHighlight, Modal, Keyboard,Alert} from "react-native";
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
import UserActions from "../../Redux/userstore";
import Header from "../common/header";
import MIcon from "../common/mIcon";
import RenderTag from "../common/renderSubCategories";
import commonColor from "../../../native-base-theme/variables/commonColor";
import SubCategorySelect from "./subCategorySelect";
import styles from "./styles";
import firebase from "react-native-firebase";
import data from "../../utils/data";

class TaskerServiceForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: null,
      cost: ""
    };
  }
  componentDidMount() {
    this.setState({
      cat: "",
      subcat: [],
      cost: "",
      latitude: "",
      longitude: "",
      address: "",
      searchInput: "",
      category:"",
      prevAddress:"",
      flag:0
    });
    firebase
    .firestore()
    .collection("users")
    .doc(this.props.email)
    .get()
    .then(querySnapshot => {
      const user = querySnapshot.data();
      console.log(user,"inside WillMount")
      this.setState({ data: user, loading: false });
     this.state.data&&this.setState({cat:this.state.data.category, cost:this.state.data.fee ? this.state.data.fee : 0,address:this.state.data.address,latitude:this.state.data.location.latitude,longitude:this.state.data.location.longitude})
     if(this.state.data && this.state.data.subCategory &&!this.state.flag ){
       this.setState({subcat:this.state.data.subCategory})
     }
    })
    .catch(error => {
      this.setState({ loading: false });
    });
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

  openTripLocationSearch() {
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
  render() {
    const { submitting, strings } = this.props;
    var SubCategory = ""
    if(this.state.data && this.state.data.subCategory &&!this.state.flag ){
      this.state.data.subCategory.forEach(element => {
        // console.log(element,"subCat element")
        SubCategory =SubCategory + element.name +","
      });
    }
    if(SubCategory){
      // console.log("here")
      SubCategory=SubCategory.slice(0,-1)
    }
    // console.log(this.state.flag,"FlagValue!!!!!!!!!!!!!!")
    return (
      <View style={{ marginTop: 20 }}>
        <View style={{}}>
          <Text style={{ color: "#44466B", fontSize: 24 }}>
            {strings.typeOfServices}
          </Text>
          <ModalDropdown
            ref="dropdown_2"
            // defaultValue={strings.SelectCategory}
            defaultValue={this.state.data&&this.state.cat?this.state.cat:strings.SelectCategory}
            // defaultValue={this.state.data&&this.state.cat?strings.SelectCategory:""}
            options={this.renderCats()}
            style={styles.dropdown_2}
            textStyle={styles.dropdown_2_text}
            dropdownStyle={styles.dropdown_2_dropdown}
            dropdownTextStyle={styles.dropdownText}
            onSelect={(idx, value) => this._dropdown_2_onSelect(idx, value)}
          />
        </View>
        <View style={{ marginTop: 25 }}>
          <Text style={{ color: "#44466B", fontSize: 22 }}>
            {strings.SubCategory}
          </Text>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <Item style={{ flex: 1 }}>
              <Input
                maxLength={15}
                onTouchStart={()=>this.changeInput()}
                // onFocus={()=>this.modal.open()}
                // placeholder={SubCategory}
                placeholder={strings.SelectSubCategories}
                // defaultValue={SubCategory}
                // onTouchStart = {()=>this.setState({flag:1})}
                placeholderTextColor="#8B8DAC"
                style={styles.input}                
              />
            </Item>
          </View>
        </View>
        {this.state.subcat ? <RenderTag tags={this.state.subcat} /> : null}
        <View style={{ marginTop: 15 }}>
          <Text style={{ color: "#44466B", fontSize: 24 }}>
            {strings.AverageHourlyCost}
          </Text>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <Item style={{ flex: 1 }}>
              <Input
                maxLength={15}
                keyboardType="numeric"
                // onChangeText={text => this.handleCostText(text)}
                onChangeText={text => this.setState({cost:text})}
                placeholder={JSON.stringify(
                  (_.get(this.state,'data.fee') === null) ? 0 : (_.get(this.state,'data.fee')))}
                // placeholder={strings.Enterfee}
                // placeholder={this.state.data&&this.state.cost?this.state.cost:strings.Enterfee}
                placeholderTextColor="#8B8DAC"
                style={styles.input}
                // value={this.state.cost.toString()}
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
                // placeholder={strings.Address}
                placeholder={this.state.data&&this.state.data.address?this.state.data.address:strings.Address}
                // defaultValue={this.state.data&&this.state.data.address?this.state.data.address:""}
                placeholderTextColor="#8B8DAC"
                style={styles.input}
                value={this.state.address}
                onFocus={() => this.openTripLocationSearch()}
              />
            </Item>
          </View>
        </View>
        <Button
          onPress={() => this.setServices()}
          rounded
          style={styles.updateButton}
        >
          {submitting ? (
            <Spinner color="#fff" />
          ) : (
            <Text style={styles.buttonText}>{strings.Update}</Text>
          )}
        </Button>
        <SubCategorySelect
          onChange={subcat => this.setsubcategories(subcat)}
          cat={this.state.cat}
          getReference={c => {
            this.modal = c;
          }}
          strings={strings}
        />
      </View>
    );
  }
}

TaskerServiceForm = reduxForm({
  form: "taskerService"
})(TaskerServiceForm);

const mapStateToProps = state => ({
  email: state.user.email
});


const bindActions = dispatch => ({
  setServiceAndCategory: (cat, subcat, cost, add) =>
    dispatch(UserActions.setServiceAndCategory(cat, subcat, cost, add))
});

export default connect(
  mapStateToProps,
  bindActions
)(TaskerServiceForm);
