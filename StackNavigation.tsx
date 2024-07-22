import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./src/screens/HomeScreen";
import MenuScreen from "./src/screens/MenuScreen";
import CartScreen from "./src/screens/CartScreen";
import LoadingScreen from "./src/screens/LoadingScreen";
import OrderScreen from "./src/screens/OrderScreen";

export type RootStackParams = {
  home: any;
  menu: {
    id: string | number;
    name: string;
    address: string;
    rating: number;
    cost_for_two: number;
    time: string;
    cuisines: string[];
    menu: any;
  };
  cart: {
    name: string;
  };
  loading: any;
  order: any;
};
const Stack = createNativeStackNavigator<RootStackParams>();

export default function StackNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="home"
      >
        <Stack.Screen name="home" component={HomeScreen} />
        <Stack.Screen name="menu" component={MenuScreen} />
        <Stack.Screen name="cart" component={CartScreen} />
        <Stack.Screen name="loading" component={LoadingScreen} />
        <Stack.Screen name="order" component={OrderScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
