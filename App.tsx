import { StatusBar } from "expo-status-bar";
import { Text, View, StatusBar as sb } from "react-native";
import HomeScreen from "./src/screens/HomeScreen";
import StackNavigation from "./StackNavigation";
import {
  CartContext,
  CartContextProvider,
} from "./src/context/CartContextProvider";
import { useState } from "react";

export default function App() {
  return (
    <>
      <CartContextProvider>
        <StatusBar translucent={false} style="light" />
        <StackNavigation />
      </CartContextProvider>
    </>
  );
}
