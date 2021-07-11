import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Constants from "expo-constants";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { reducer } from "./reducers/reducer";
const store = createStore(reducer);

const Stack = createStackNavigator();

//screens imports
import Home from "./screens/Home";
import CreateEmployee from "./screens/CreateEmployee";
import Profile from "./screens/Profile";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ededed",
    marginTop: Constants.statusBarHeight,
  },
});

const headerOptions = {
  title: "Home Page",
  headerTintColor: "#fff",
  headerStyle: {
    backgroundColor: "#006aff",
  },
};
function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <View style={styles.container}>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={Home}
              options={headerOptions}
            />
            <Stack.Screen
              name="Create"
              component={CreateEmployee}
              options={{ ...headerOptions, title: "Create Employee" }}
            />
            <Stack.Screen
              name="Profile"
              component={Profile}
              options={{ ...headerOptions, title: "Profile Page " }}
            />
          </Stack.Navigator>
        </View>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
