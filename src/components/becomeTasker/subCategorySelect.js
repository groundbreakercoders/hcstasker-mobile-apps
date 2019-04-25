import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import RNGooglePlaces from "react-native-google-places";
import {
  Text,
  TouchableHighlight,
  Modal,
  FlatList,
  Keyboard
} from "react-native";
import {
  Item,
  Input,
  Button,
  Grid,
  Col,
  View,
  Spinner,
  Icon,
  ListItem
} from "native-base";
import PropTypes from "prop-types";
import _ from "lodash";
import ModalDropdown from "react-native-modal-dropdown";
import UserActions from "../../Redux/userstore";
import Header from "../common/header";
import MIcon from "../common/mIcon";
import RenderTag from "../common/renderSubCategories";
import commonColor from "../../../native-base-theme/variables/commonColor";
import styles from "./styles";
import data from "../../utils/data";


class SubCategorySelect extends Component {
  state = {
    modalVisible: false,
    searchInput: "",
    loading: false,
    selectedTags: [],
    subCats: [],
    tsubcats: [],
    createTagError: false
  };

  componentWillReceiveProps(nextprops) {
    if(this.props !==nextprops){
    const { cat } = nextprops;
    const cats = this.renderSubCats(cat);
    this.setState({ subCats: cats, tsubcats: cats ,selectedTags:[]});
    }
  }
  componentDidMount() {
    const { getReference } = this.props;
    getReference(this);
  }

  open = () => {
    this.setState({
      modalVisible: true
    });
  };

  renderCats() {
    const options = [];
    _.map(data, (data, ind) => options.push(data.name));
    return options;
  }

  close = () => {
    this.setState({
      modalVisible: false
    });
  };

  renderSubCats(cat) {
    if (cat) {
      const subCat = [];
      _.map(data, (data, ind) => {
        if (data.name === cat) {
          _.map(data.subCategories, (cat, inx) => subCat.push(cat));
        }
      });
      return subCat;
    }
    return null;
  }

  addInterest = interest => {
    const isPresent = _.find(
      this.state.selectedTags,
      o => o.name === interest.name
    );
    if (!isPresent) {
      Keyboard.dismiss();
      this.setState({
        selectedTags: this.state.selectedTags.concat([interest])
      });
    }
  };

  handleText = text => {
    let data = _.filter(this.state.subCats, (item, index) => {
      let regex = new RegExp("^" + text, "i");
      if (regex.test(item.name)) {
        return item;
      }
    });
    this.setState({ tsubcats: data });
  };

  renderItem = ({ item, index }) => {
    return (
      <ListItem key={index} onPress={() => this.addInterest(item)}>
        <Item style={styles.addIcon}>
          <MIcon family="FontAwesome" name="plus" style={styles.addIconStyle} />
        </Item>
        <Text style={styles.listText}>{item.name}</Text>
      </ListItem>
    );
  };

  render() {
    const { cat, onChange, strings } = this.props;
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.state.modalVisible}
        onRequestClose={() => this.close()}
      >
        <View style={{ padding: 20 }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontSize: 16, marginTop: 10 }}>
              {strings.SelectSubCategories}
            </Text>
            <Button
              transparent
              style={styles.doneButton}
              onPress={() => {
                onChange(this.state.selectedTags);
                this.close();
              }}
            >
              <Text uppercase={false} style={styles.doneText}>
                {strings.Done}
              </Text>
            </Button>
          </View>
          <RenderTag
            tags={this.state.selectedTags}
            remove={true}
            onSelectTag={tag =>
              this.setState({
                selectedTags: _.filter(
                  this.state.selectedTags,
                  o => o.name !== tag.name
                )
              })
            }
          />

          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <Item style={{ flex: 1, borderBottomWidth: 0 }}>
              <Icon
                name="ios-search"
                style={[styles.closeIcon, { marginLeft: 12 }]}
              />
              <Input
                maxLength={15}
                onChangeText={text => this.handleText(text)}
                placeholder={strings.Search}
                placeholderTextColor="#888"
                style={styles.input}
              />
            </Item>
          </View>
          <FlatList
            keyboardShouldPersistTaps="always"
            data={this.state.tsubcats}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => item.id}
          />
        </View>
      </Modal>
    );
  }
}
export default SubCategorySelect;
