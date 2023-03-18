import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import SingleTab from "./SingleTab";

const SquareTabBar = (props) => {
  const Tab = createBottomTabNavigator();

  const { routes } = props.state;
  const currentTabIcon =
    props.descriptors[routes[props.state.index].key].options.tabBarIcon;

  const tempTabs = [
    {
      name: "Profile",
      icon: "user",
      label: "Profile",
      screen: <View></View>,
    },
    {
      name: "Home",
      icon: "home",
      label: "Home",
      screen: <View></View>,
    },
    {
      name: "Map",
      icon: "map",
      label: "Map",
      screen: <View></View>,
    },
  ];

  const tabs = props.tabs ? props.tabs : tempTabs;
  let tabWidth = (Dimensions.get("screen").width - 20) / routes.length;

  if (props.defaultTab > tabs.length) {
    throw new Error("Default value is larger than tabs length");
  }

  const [currentTab, setCurrentTab] = useState(props.state.index);

  const handleTabPressed = (index, route) => {
    const isFocused = props.state.index === index;

    const event = props.navigation.emit({
      type: "tabPress",
      target: route.key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      props.navigation.navigate(route.name);
    }
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

  const content = routes.map((route, index) => {
    const { options } = props.descriptors[route.key];
    const label =
      options.tabBarLabel !== undefined
        ? options.tabBarLabel
        : options.title !== undefined
        ? options.title
        : route.name;

    const Icon = options?.tabBarIcon;

    const onPress = () => {
      handleTabPressed(index, route);
    };
    const tab = (
      <SingleTab
        key={index}
        onPress={onPress}
        width={tabWidth.toFixed()}
        icon={Icon}
        labelsStyle={props.labelsStyle}
        selectedLabelStyle={props.selectedLabelStyle}
        iconsStyle={props.iconsStyle}
        iconsSize={props.iconsSize ? props.iconsSize : 22}
        label={label}
        currentTab={currentTab}
        index={index}
      ></SingleTab>
    );
    return tab;
  });

  return (
    <View>
      <SafeAreaView style={[styles.tabBar, props.tabBarStyle]}>
        <View
          style={{
            flex: 1,
          }}
        >
          <View style={styles.tabs}>{content}</View>
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
              justifyContent: "center",
              alignContent: "center",
              transform: [
                {
                  translateX: changeTab,
                },
              ],

              alignItems: "center",
            }}
          >
            <View
              style={{
                width: "50%",
                alignItems: "center",
                alignSelf: "center",
                justifyContent: "center",
              }}
            >
              <Pressable
                onPress={() => {
                  handleTabPressed(currentTab, routes[currentTab].key);
                }}
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
                  <Text style={props.selectedIconStyle}>{currentTabIcon}</Text>
                </Animated.View>
              </Pressable>
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
    flexDirection: "row",
    width: Dimensions.get("screen").width - 20,
    alignSelf: "center",
  },
});
