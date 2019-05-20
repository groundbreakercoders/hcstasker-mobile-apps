import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import {
  View,
  Platform,
  Dimensions,
  ScrollView,
  FlatList
} from "react-native";
import PropTypes from "prop-types";
import {
  Text,
  Button,
  Item
} from "native-base";
import MIcon from "../../mIcon";
import UserActions from "../../../../Redux/userstore";
import data from "../../../../utils/data";

const deviceWidth = Dimensions.get("window").width;
import styles from "./styles";
import commonColor from "../../../../../native-base-theme/variables/commonColor";
import firebase from "react-native-firebase";
import Tasker from "../../../tasker";

class CategoryAndSubCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.category,
      selectedCategory: null
    };
    // this.scrollToItem(bind)

  }
  componentDidMount(){
    this.scrollToItem()
  }

  categorieSelect(name) {
    this.props.setTaskerList(name);
    //this.props.setSelectedCategory(name);
  }
  getCurrentSubcategory(name) {
    return data.filter(cat => cat.name === name)[0].subCategories;
  }
  getItemLayout = (data, index) => (
    { length: 3, offset: 3 * index, index }
  )
  scrollToItem = () => {
    let randomIndex = Math.floor(Math.random(Date.now()) * data.length);
    this.flatListRef.scrollToIndex({animated: true, index: "" + randomIndex});
  }


  render() {
    const { strings } = this.props;
    return (


      <View
        style={{
          flex: Platform.OS === "ios"
              ? 0.8
              : 1.1
        }}
      >

        {this.props.userPageStatus === "home" && (
          <View
            style={{
              flex: Platform.OS === "ios" ? 1.7 : 1.9,
              borderTopWidth: 0.6,
              borderTopColor: "#c2c6da"
            }}
          >





              <FlatList
                  ref={(ref) => { this.flatListRef = ref; }}
                  // scrollsToTop={false}
                  // onEndReached={this.onEndReached.bind(this)}
                  getItemLayout={this.getItemLayout}
                  data={data}
                  horizontal
                  extraData={this.props.selectedCategory}
                  showsHorizontalScrollIndicator={false}
                  // initialNumToRender={6}
                  // maxToRenderPerBatch={4}
                  // onScroll={this.flatListRef.scrollToOffset({ animated: true, offset: 0 })}
                  // onEndReached={this.onEndReached.bind(this)}
                  // onScroll={this.setState({scrollPosition: event.nativeEvent.contentOffset.y})}
                  keyExtractor={(item, index) => String(index)}
                  renderItem={({ item, index }) =>
                {
                return (
                <View key={item.name} style={styles.iconView}>
                <Item
                  onPress={() => this.categorieSelect(item.name)}
                  style={
                    this.props.selectedCategory === item.name
                      ? styles.activeIconItem
                      : styles.iconItem
                  }
                >
                  <MIcon
                    family={item.family}
                    name={item.Icon}
                    style={
                      this.props.selectedCategory === item.name
                        ? styles.activeIcon
                        : styles.icon
                    }
                  />
                </Item>
                <Text style={styles.categoryText}>
                  {strings[item.name]}
                </Text>
               </View>
                );
              }}>
            </FlatList>


          </View>
        )}
      </View>

    );
  }
}

CategoryAndSubCategory.propTypes = {
  SubCategorySelected: PropTypes.bool,
  setSubCategorySelected: PropTypes.func,
  setSelectedCategory: PropTypes.func,
  getTaskerList: PropTypes.func,
  taskerSelected: PropTypes.bool
};

function mapStateToProps(state) {
  return {
    userPageStatus: state.user.userPageStatus,
    selectedCategory: state.user.selectedCategory
  };
}

const bindActions = dispatch => ({
  setSelectedCategory: (cat) =>
    dispatch(UserActions.setSelectedCategory(cat)),
  setTaskerList: (category) =>
    dispatch(UserActions.setTaskerList(category))
});

export default connect(
  mapStateToProps,
  bindActions
)(CategoryAndSubCategory);
