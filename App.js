import { StyleSheet, View } from "react-native";
import MyTabBar from "./MyTabBar";

export default function App() {
  const tabs = [
    {
      icon: "grid",
      label: "Dashboard",
    },
    {
      icon: "flag",
      label: "Goals",
    },
    {
      icon: "tag",
      label: "Financial",
    },
    {
      icon: "star",
      label: "Transfer",
    },
  ];

  return (
    <View style={styles.container}>
      <MyTabBar
        tabs={tabs}
        default={0}
        tabBarStyle={{}}
        iconsStyle={{}}
        iconsSize={22}
        selectedIconSize={22}
        labelsStyle={{}}
        selectedLabelStyle={{}}
        selectedTabStyle={{}}
      ></MyTabBar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
