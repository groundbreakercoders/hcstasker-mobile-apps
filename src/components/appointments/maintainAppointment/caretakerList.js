import React, {Component} from 'react';
import {Platform,StyleSheet,View,Image,TouchableOpacity} from 'react-native';
import {Container,Header,Body,CheckBox,
Title,Card,CardItem,Left,Right,Icon,
Content,Thumbnail,Grid,COl,Text,Button} from 'native-base';

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

export default class caretakerList extends Component{
  constructor(props){
    super(props);
    this.state = {
      activeItem:[],
      activeLength:[],
      isDisabled: false
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
    return (           
      <Container style={{backgroundColor:'#efefef'}}>
      <Header style={{backgroundColor:'green'}}/>
      <Content>
          <Card style={{alignItems:'center'}}>
            <CardItem>
            <Title> NURSE DETAILS </Title>
            </CardItem>
          </Card>
          {list.map((item,i) => {
            return <MyList
            /*activeLength = {this.state.activeItem.length}
            onPress={ () => this._onPressButton(i)}
            name={item.name}
            desc={item.desc}
            active=sssssssssss{this.state.activeItem.indexOf(i) !== -1}
            img = {item.img} 
            isDisabled = {this.checkNurseDisable(this.state.active)}
            />*/ 
            onPress={()=>this.onPressButton(item.id)}
              disable={this.checkDisable(item.id)}
              name={item.name}
              desc={item.desc}
              active={this.state.activeItem.indexOf(item.id) !== -1}
              img={item.img} />
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