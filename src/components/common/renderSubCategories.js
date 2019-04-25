import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Icon, Button, Text, Item } from "native-base";
import PropTypes from "prop-types";
import _ from "lodash";
import MIcon from "./mIcon";
import commonColor from "../../../native-base-theme/variables/commonColor";

const RenderTags = ({
  tags,
  selectedTags,
  contentStyle,
  onSelectTag,
  remove,
  add
}) => (
  <ScrollView horizontal scrollEnabled showsHorizontalScrollIndicator={false}>
    {_.map(tags, (tag, index) => (
      <View style={styles.tagButton} key={index}>
        <Button onPress={() => onSelectTag(tag)} style={styles.button}>
          <Text style={{ color: commonColor.brandPrimary }}>{tag.name}</Text>
          {remove ? (
            <Item style={styles.IconView}>
              <MIcon
                family="FontAwesome"
                name="minus"
                style={{ fontSize: 12, color: "#fff", paddingRight: 0 }}
              />
            </Item>
          ) : add ? (
            <Item style={styles.IconView}>
              <MIcon
                family="FontAwesome"
                name="plus"
                style={{ fontSize: 12, color: "#fff", paddingRight: 0 }}
              />
            </Item>
          ) : null}
        </Button>
      </View>
    ))}
  </ScrollView>
);

RenderTags.propTypes = {
  tags: PropTypes.array.isRequired,
  selectedTags: PropTypes.array,
  onSelectTag: PropTypes.func
};
RenderTags.defaultProps = {
  selectedTags: [],
  onSelectTag: () => null
};

const styles = StyleSheet.create({
  tagButton: {
    height: 50,
    padding: 8,
    elevation: 0
  },
  button: {
    height: 30,
    backgroundColor: "transparent",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: commonColor.brandPrimary,
    flex: 1,
    flexDirection: "row",
    borderRadius: 18,
    paddingRight: 5,
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 0
  },
  IconView: {
    flex: 1,
    width: 20,
    height: 20,
    borderRadius: 10,
    borderBottomWidth: 0,
    backgroundColor: commonColor.brandPrimary,
    alignItems: "center",
    justifyContent: "center",
    elevation: 0
  }
});

export default RenderTags;
