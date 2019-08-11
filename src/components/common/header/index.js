import React from "react";
import { StyleSheet, Platform, Image, TouchableOpacity } from "react-native";
import { Header, Left, Button, Text, Right, Icon, Body } from "native-base";
import { Actions } from "react-native-router-flux";
import PropTypes from "prop-types";

const PageHeader = ({
  main,
  backButton,
  title,
  onPressBack,
  onPressHeader,
  right,
  borderBottom
}) => (
  <Header
    style={{
      flexDirection:'row',
      justifyContent:'center',
      alignContent:'center',
      backgroundColor: "#6495ed",
      //borderBottomWidth: borderBottom ? 1 : 0,
      borderBottomColor: "#C2C5DB",
      marginTop: 0,
      height:75
    }}
  >
    {backButton ? (
      <Left style={{ flex: Platform.OS === "ios" ? 0.08 : 0.3 }}>
        <Button onPress={() => Actions.pop()} transparent>
          <Icon name="ios-arrow-back" style={styles.arrowIcon} />
        </Button>
      </Left>
    ) : null}
    <Body style={{ flex: Platform.OS === "ios" ? 1 : 0.7 }}>
      <Text style={{ marginTop:10,
        marginRight: 10,
        //justifyContent:'center',alignContent:'center',
        fontSize: 28,
        fontWeight: "bold",
        color: "white"
        }}>
        {title}
      </Text>
    </Body>
  </Header>
);

PageHeader.defaultProps = {
  onPressHeader: () => null,
  onPressBack: () => null
};

PageHeader.propTypes = {
  backButton: PropTypes.bool
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#fff",
    borderBottomWidth: 5,
    borderBottomColor: "#C2C5DB"
  },
  noheader: {
    backgroundColor: "#fff"
  },
  headerText: {
    fontSize: Platform.OS === "ios" ? 22 : 20,
    color: "#44466B",
    marginLeft: Platform.OS === "ios" ? -20 : 0,
    flexDirection:'row',
    marginRight:0,
  },
  arrowIcon: {
    fontSize: 35,
    marginLeft: 0,
    color: "#43496a"
  }
});

export default PageHeader;
