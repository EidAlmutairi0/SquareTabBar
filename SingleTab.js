import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Feather";

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
      <View style={props.currentTab === props.index && styles.selectedView}>
        <Icon
          style={[
            props.style,
            props.currentTab !== props.index
              ? styles.icon
              : styles.selectedIcon,
          ]}
          name={props.icon}
          size={22}
        ></Icon>
      </View>
      <Text
        style={[
          props.style,
          props.currentTab !== props.index ? styles.text : styles.selectedText,
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
    margin: 10,

    paddingBottom: 20,
    color: "#8F98A8",
  },
  selectedIcon: {
    color: "white",
  },

  text: {
    color: "#8F98A8",
    position: "absolute",
    bottom: 0,
    fontSize: 12,
  },
  selectedText: {
    color: "black",
    fontWeight: "bold",
    position: "absolute",
    bottom: 0,
    fontSize: 12,
  },
});
