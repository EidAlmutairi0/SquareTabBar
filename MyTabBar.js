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

const MyTabBar = (props) => {
  let tabWidth = (Dimensions.get("screen").width - 20) / props.tabs.length;

  const [currentTab, setCurrentTab] = useState(props.default);

  const handleTabPressed = (index) => {
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
        duration: 1000,
      }).start(),
    ]);
  };

  const changeTab = useRef(new Animated.Value(currentTab)).current;
  const scaleIcon = useRef(new Animated.Value(0)).current;

  return (
    <SafeAreaView style={styles.tabBar}>
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
            style={{
              width: 48,
              height: 48,
              borderRadius: 10,
              backgroundColor: "rgb(0 160 138)",
              alignContent: "center",
              alignItems: "center",

              top: -15,
              zIndex: 200,
              justifyContent: "center",
            }}
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
                size={22}
              ></Icon>
            </Animated.View>
          </View>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

export default MyTabBar;

const styles = StyleSheet.create({
  tabBar: {
    flex: 1,
    color: "white",
    overflow: "visible",
    width: Dimensions.get("screen").width,
    backgroundColor: "white",
    height: 90,
    bottom: 0,
    zIndex: 10,
    position: "absolute",
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
