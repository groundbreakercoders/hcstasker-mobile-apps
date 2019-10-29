import React, {Component} from 'react';
import {Platform,StyleSheet,View,Image,TouchableOpacity} from 'react-native';
import {Container,Header,Body,CheckBox,
Title,Card,CardItem,Left,Right,Icon,
Content,Thumbnail,Grid,COl,Text,Button} from 'native-base';
import AppointmentActions from "../../../Redux/appointmentstore";
import {getUserstype} from "../../../sagas/appointmentsaga";
import { connect } from "react-redux";


import MyList from './MyList';

const list = [
  {
    id:1,
    name:'Name name1',
    desc:"Just a thought for all",
    img:"https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg"
  },
  {
    id:2,
    name:'Name name2',
    desc:"Just a thought for all",
    img:"https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg"
  },
  {
    id:3,
    name:'Name name3',
    desc:"Just a thought for all",
    img:"https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg"
  },
  {
    id:4,
    name:'Name name4',
    desc:"Just a thought for all",
    img:"https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg"
  },
  {
    id:5,
    name:'Name name5',
    desc:"Just a thought for all",
    img:"https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg"
  }, 
]

class NurseList extends Component{
  constructor(props){
    super(props);
    this.state = {
      activeItem:[],
      activeLength:[],
      isDisabled: false,
      users:props.appointment.availUsers,
      appointment:props.appointment.appointment
    }
  };

  /*_onPressButton(i){
    let activeItem = this.state.activeItem
    activeItem.push(i)
    this.setState({activeItem: activeItem});
  }

  checkNurseDisable(active){
    if (this.state.active==active){
      if (this.state.activeItem.length>2){
        return true
      } else {
        return false
      }  
    } else {
      return false
    }
  }*/
  componentDidMount(){
    
  }

  onPressButton(id) {
    let activeItem = this.state.activeItem
    if(activeItem.indexOf(id) !== -1) {
      activeItem.splice(activeItem.indexOf(id), 1)
    } else {
      activeItem.push(id)
    } 
    this.setState({activeItem: activeItem});
    console.log(activeItem)
  }
  checkDisable(id) {
    console.log(id)
    if((this.state.activeItem.length >= 2) && (this.state.activeItem.indexOf(id) === -1)) {
        return true
    }
    return false
  }
  
  render() {
    console.disableYellowBox = true;
    //const users = this.props.getUserstype(this.state.appointment.serviceType);
    return (           
      <Container style={{backgroundColor:'#efefef'}}>
      <Header style={{backgroundColor:'green'}}/>
      <Content>
          <Card style={{alignItems:'center'}}>
            <CardItem>
            <Title> Nurse List </Title>
            </CardItem>
          </Card>
          {this.state.users.map((item,i) => {
            return <MyList
            /*activeLength = {this.state.activeItem.length}
            onPress={ () => this._onPressButton(i)}
            name={item.name}
            desc={item.desc}
            active=sssssssssss{this.state.activeItem.indexOf(i) !== -1}
            img = {item.img} 
            isDisabled = {this.checkNurseDisable(this.state.active)}
            />*/ 
            onPress={()=>this.onPressButton(item.email)}
              disable={this.checkDisable(item.uniqueId)}
              name={item.name}
              desc="Nurse Description"
              active={this.state.activeItem.indexOf(item.uniqueId) !== -1}
              img={src="https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg"} />
          })}

      <Button style = {{marginTop:50, marginRight:10,marginLeft:10}}
        block success onPress={
         () => (this.setState({
         bgclr: 'green'}))}>
        <Text style={{alignItems:'center'}}>Submit</Text>
      </Button>
      <Button style = {{marginTop:50, marginRight:10,marginLeft:10, backgroundColor:'red'}}
        block success onPress={
         () => (this.setState({
         bgclr: 'green'}))}>
        <Text style={{alignItems:'center'}}>Cancel</Text>
      </Button>
    </Content>   
  </Container>
    )
  }
}

const mapStateToProps = state => ({
  //user: state.user.email,
  //isAddressClicked:false,
  appointment: state.appointment,
  serviceType: state.appointment.serviceType,
  users: state.availUsers
});

const bindActions = dispatch => ({
  saveAppointment: (appointment) =>
    dispatch(AppointmentActions.saveAppointment(appointment)),
    getUserstype : (serviceType) => dispatch(AppointmentActions.getUserstype(serviceType))
});

export default connect(
  mapStateToProps,
  bindActions
)(NurseList);