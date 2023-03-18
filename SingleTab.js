import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

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
      <Pressable
        onPress={props.onPress}
        style={{
          alignItems: "center",
          alignContent: "center",
          justifyContent: "center",
          width: "50%",
          height: "100%",
        }}
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
      </Pressable>
    </View>
  );
};

export default SingleTab;

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  icon: {
    marginBottom: 20,
    color: "#8F98A8",
    width: "100%",
    alignSelf: "center",
    textAlign: "center",
    alignContent: "center",
    alignItems: "center",
  },

  text: {
    position: "absolute",
    alignSelf: "center",
    textAlign: "center",
    alignItems: "center",
    width: "100%",
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
