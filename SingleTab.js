import React from "react";
import { StyleSheet, Text, View } from "react-native";

const SingleTab = (props) => {
  return (
    <View
      style={[
        styles.tab,
        {
          width: parseInt(props.width),
        },
      ]}
    >
      <View
        style={[
          props.currentTab === props.index && styles.selectedView,
          styles.icon,
        ]}
      >
        {props.currentTab !== props.index && props.icon}
      </View>
      <Text
        style={[
          styles.text,
          props.currentTab !== props.index
            ? props.labelsStyle
            : [styles.selectedText, props.selectedLabelStyle],
        ]}
      >
        {props.label}
      </Text>
    </View>
  );
};

export default SingleTab;

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    paddingBottom: 20,
    color: "#8F98A8",
  },

  text: {
    position: "absolute",
    bottom: 0,
    fontSize: 12,
  },
  selectedText: {
    fontWeight: "bold",
    position: "absolute",
    bottom: 0,
    fontSize: 12,
  },
});
