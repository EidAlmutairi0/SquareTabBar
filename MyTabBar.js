import React, { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import SingleTab from "./SingleTab";

const SquareTabBar = (props) => {
  let tabWidth = (Dimensions.get("screen").width - 20) / props.tabs.length;

  if (props.defaultTab > props.tabs.length) {
    throw new Error("Default value is larger than tabs length");
  }

  const [currentTab, setCurrentTab] = useState(
    props.defaultTab ? props.defaultTab : 1
  );

  const handleTabPressed = (index) => {
    if (index !== currentTab) {
      scaleIcon.setValue(0);
      setCurrentTab(index);
      Animated.sequence([
        Animated.spring(changeTab, {
          toValue: index * tabWidth,
          useNativeDriver: true,
        }).start(),
        Animated.spring(scaleIcon, {
          toValue: 1,
          useNativeDriver: true,
          bounciness: true,
          duration: 100000,
        }).start(),
      ]);
    }
  };

  const changeTab = useRef(new Animated.Value(currentTab * tabWidth)).current;
  const scaleIcon = useRef(new Animated.Value(1)).current;

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          flex: 1,
        }}
      >
        {props.tabs[currentTab].screen}
      </View>
      <SafeAreaView style={[styles.tabBar, props.tabBarStyle]}>
        <View
          style={{
            flex: 1,
          }}
        >
          <FlatList
            horizontal={true}
            scrollEnabled={false}
            style={styles.tabs}
            data={props.tabs}
            renderItem={(item) => (
              <Pressable
                onPress={() => {
                  handleTabPressed(item.index);
                }}
              >
                <SingleTab
                  width={tabWidth.toFixed()}
                  icon={item.item.icon}
                  labelsStyle={props.labelsStyle}
                  selectedLabelStyle={props.selectedLabelStyle}
                  iconsStyle={props.iconsStyle}
                  iconsSize={props.iconsSize ? props.iconsSize : 22}
                  label={item.item.label}
                  currentTab={currentTab}
                  index={item.index}
                ></SingleTab>
              </Pressable>
            )}
          ></FlatList>
        </View>
        <View
          style={{
            flex: 1,
            position: "absolute",

            width: Dimensions.get("screen").width - 20,
            alignSelf: "center",
            zIndex: 200,
          }}
        >
          <Animated.View
            style={{
              position: "absolute",
              width: tabWidth,
              transform: [
                {
                  translateX: changeTab,
                },
              ],

              alignItems: "center",
            }}
          >
            <View
              style={[
                {
                  width: 48,
                  height: 48,
                  borderRadius: 10,
                  backgroundColor: "rgb(0 160 138)",
                  alignContent: "center",
                  alignItems: "center",

                  top: -15,
                  zIndex: 200,
                  justifyContent: "center",
                },
                props.selectedTabStyle,
              ]}
            >
              <Animated.View
                style={{
                  transform: [
                    {
                      scale: scaleIcon,
                    },
                  ],
                }}
              >
                <Icon
                  style={{ color: "white" }}
                  name={props.tabs[currentTab].icon}
                  size={props.selectedIconSize ? props.selectedIconSize : 22}
                ></Icon>
              </Animated.View>
            </View>
          </Animated.View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default SquareTabBar;

const styles = StyleSheet.create({
  tabBar: {
    color: "white",
    overflow: "visible",
    width: Dimensions.get("screen").width,
    backgroundColor: "white",
    height: 90,
    position: "relative",
    zIndex: 10,

    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  tabs: {
    flex: 1,
    overflow: "visible",
    alignSelf: "center",
  },
});
