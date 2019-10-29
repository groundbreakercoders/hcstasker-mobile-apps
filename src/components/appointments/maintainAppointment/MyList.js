import React, {Component} from 'react';
import {Platform,StyleSheet,View,Image,TouchableHighlight} from 'react-native';
import {Container,Header,Body,CheckBox,
Title,Card,CardItem,Left,Right,Icon,
Content,Thumbnail,Grid,COl,Text,Button, Subtitle, Item} from 'native-base';

export default class MyList extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isSelected: false,
        };
    }
    _onPressButton() {
        this.setState({activeItem: !this.state.activeItem});
      }
      onButtonPress(e) {
          console.log(this.props.disable)
        if(!this.props.disable){
            this.props.onPress()
        }  
    }
 
    render(){
        return(
            <Card>
                <CardItem 
                        button onPress={this.onButtonPress.bind(this)} 
                        style = {{backgroundColor: 
                            (this.props.active ? '#6495ed' : (this.props.disable ? 'grey':'white'))}}>
                <View>
                    <Left>
                        <Thumbnail
                        source={{uri:this.props.img}}
                        style={{width:80,height:60,borderRadius:10,marginRight:5}}/>
                        <View style={{alignItems:'center'}}>
                            <Title>{this.props.name}</Title>
                            <Subtitle>{this.props.desc}</Subtitle>
                        </View>
                    </Left>
                    </View>
                </CardItem>
            </Card>
        )
    }
}