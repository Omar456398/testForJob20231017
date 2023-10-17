import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import Hometab from "./tabs/HomeTab";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetailsTab from "./tabs/DetailsTab";
import store from "./redux/store";

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Provider store={store}>
      <Stack.Navigator initialRouteName="Movies List">
        <Stack.Screen name="Movies List" component={Hometab} />
        <Stack.Screen name="Details" component={DetailsTab} />
      </Stack.Navigator></Provider>
        <StatusBar style="auto" />
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
});
