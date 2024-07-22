import { View, Text, Pressable } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

export default function FilterType() {
  return (
    <View className="mx-1 flex-row justify-between mt-5">
      <Pressable className="flex-row border border-gray-400 p-1 px-4 rounded-2xl items-center space-x-2 ">
        <Text className="text-sm">Filter</Text>
        <Ionicons name="filter" size={24} color="black" />
      </Pressable>
      <Pressable className="flex-row border border-gray-400 p-1 px-4 rounded-2xl items-center space-x-2 ">
        <Text className="text-sm">Sort by Rating</Text>
      </Pressable>
      <Pressable className="flex-row border border-gray-400 p-1 px-4 rounded-2xl items-center space-x-2 ">
        <Text className="text-sm">Sort by Price</Text>
      </Pressable>
    </View>
  );
}
