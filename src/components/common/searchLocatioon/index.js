import React, { Component } from "react";
import { View, Item, Icon, Input, Text, Button } from "native-base";
import PropTypes from "prop-types";
import { TouchableOpacity, Dimensions, Alert } from "react-native";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import commonColor from "../../../../native-base-theme/variables/commonColor";
import * as _ from "lodash";
// import UserActions from "../../Redux/userstore";
import UserActions from "../../../Redux/userstore";


const { height, width } = Dimensions.get("window");

const styles = {
  inputText: {
    margin: 2
  },
  inputTextActive: {
    margin: 2
  }
};

 class SearchLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  backHomepage(){
    this.props.setUserPageStatus("home")
    this.props.setSubCategorySelected(false, null)
  }
  render() {
    // console.log(this.props,"Props@@@@@@@@@@@@@@@@@@@@@")
    const { currentLocation, page, onpress } = this.props;
    const value = currentLocation.value || currentLocation.placeholder;
    return (
      <View
        style={{
          flex: page === "bookingpage" ? 1.5 : 1.5,
          flexDirection: page === "bookingpage" ? "column" : null,
          justifyContent: page === "bookingpage" ? "space-between" : "center",
          padding: 20,
          paddingTop: 30
        }}
      >
        {page === "bookingpage" ? (
          <Button
            style={{ paddingLeft: 0, alignSelf: "flex-start", marginTop: -10 }}
            transparent
            onPress={() => this.backHomepage()}
          >
            <Icon
              name="ios-arrow-back"
              style={{
                fontSize: 35,
                marginLeft: 0,
                color: "#43496a"
              }}
            />
          </Button>
        ) : null}
        <Item
          rounded
          onPress={() => currentLocation.onPress("origin")}
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            width: width - 60,
            height: 50,
            borderWidth: 0,
            marginTop: page === "bookingpage" ? -10 : 10,
            alignSelf: "center",
            borderColor: "transparent",
            backgroundColor: "#f4f4f6"
          }}
        >
          <Icon
            name="ios-search"
            style={{
              color: commonColor.brandPrimary,
              fontWeight: "bold",
              paddingLeft: 15
            }}
          />
          <Text numberOfLines={1} style={{ color: "#44466B", flex: 1 }}>
            {value}
          </Text>
        </Item>
      </View>
    );
  }
}

SearchLocation.propTypes = {
  currentLocation: PropTypes.object.isRequired
};
const bindActions = dispatch => ({
  setUserPageStatus: page => dispatch(UserActions.setUserPageStatus(page)),
  setSubCategorySelected: setSubCategorySelected => dispatch(UserActions.setSubCategorySelected(setSubCategorySelected))
});
const mapStateToProps = state => ({
  
  userPageStatus: state.user,
  
});
SearchLocation.defaultProps = {};
export default connect(
  mapStateToProps,
  bindActions
)(SearchLocation);

