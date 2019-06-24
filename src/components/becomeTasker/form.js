import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { Text, TouchableHighlight, Modal, Keyboard,Alert,TouchableOpacity} from "react-native";
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
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import UserActions from "../../Redux/userstore";
import Header from "../common/header";
import MIcon from "../common/mIcon";
import RenderTag from "../common/renderSubCategories";
import commonColor from "../../../native-base-theme/variables/commonColor";
import SubCategorySelect from "./subCategorySelect";
import styles from "./styles";
import firebase from "react-native-firebase";
import data from "../../utils/data";
import apiKey from "../../utils/config";

const keys = apiKey.apiKey
class TaskerServiceForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: null,
      cost: "",
      placesModal: false
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
    var Subcat = this.state.subcat
    subcat.forEach(element =>{
      var id = Subcat.findIndex(x=>x.name == element.name)
      if(id===-1)
      Subcat.push(element)
    })
    this.setState({ subcat: Subcat });
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
        SubCategory =SubCategory + element.name +","
      });
    }
    if(SubCategory){
      SubCategory=SubCategory.slice(0,-1)
    }
    return (
      <View style={{ marginTop: 20 }}>
        <View style={{}}>
          <Text style={{ color: "#44466B", fontSize: 24 }}>
            {strings.typeOfServices}
          </Text>
          <ModalDropdown
            ref="dropdown_2"
            defaultValue={this.state.data&&this.state.cat?this.state.cat:strings.SelectCategory}
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
                placeholder={strings.SelectSubCategories}
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
                onChangeText={text => this.setState({cost:text})}
                placeholder={JSON.stringify(
                  (_.get(this.state,'data.fee') === null) ? 0 : (_.get(this.state,'data.fee')))}
                placeholderTextColor="#8B8DAC"
                style={styles.input}
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
                placeholder={this.state.data&&this.state.data.address?this.state.data.address:strings.Address}
                placeholderTextColor="#8B8DAC"
                style={styles.input}
                value={this.state.address}
                onFocus={() => this.setState({placesModal:true})}
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
         {this.state.placesModal === true &&
    <Modal
                        animationType="slide"
                        visible={this.state.placesModal}>
                           <View style={{ flex: 1, backgroundColor: "white", padding: 6}}>
                             <View style={{ flex: 1 }}>
                          <View style={{ height: 40 }}>
                        <TouchableOpacity style={{marginLeft:15, marginTop: 10 }} onPress={()=>this.setState({placesModal:false})}>
                        <Icon name="ios-arrow-back"></Icon>
                        </TouchableOpacity>
                        </View>
                        <View style={{ flex: 0.9 }}>
                        <GooglePlacesAutocomplete
                            placeholder='Enter Location'
                            minLength={2}
                            autoFocus={true}
                            returnKeyType={'default'}
                            fetchDetails={true}
                            currentLocationLabel="Current location"
                            onPress={(data, details = null) => {
                              this.setState({
                                      latitude: details.geometry.location.lat,
                                      longitude: details.geometry.location.lng,
                                      address: details.formatted_address
                                    });

                                this.setState({placesModal:false});
                            }}
                            query={{
                                key: keys,
                                language: 'en',
                            }}
                            styles={{
                                textInputContainer: {
                                backgroundColor: 'rgba(0,0,0,0)',
                                borderTopWidth: 0,
                                borderBottomWidth:0
                            },
                            textInput: {
                                marginRight: 0,
                                height: 38,
                                color: '#5d5d5d',
                                fontSize: 16
                            },
                            predefinedPlacesDescription: {
                                color: '#1faadb'
                            },
                            }}
                            currentLocation={false}
                            currentLocationLabel="Current location"
                            nearbyPlacesAPI='GooglePlacesSearch'
                            GooglePlacesSearchQuery={{
                                rankby: 'distance',
                            }}
                            filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']}
                            debounce={200}

                      />

                      </View>
                      </View>
                      </View>
        </Modal> }
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
