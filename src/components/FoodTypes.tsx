import { View, Text, ScrollView, Image } from "react-native";
import React from "react";

export default function FoodTypes() {
  const types = [
    {
      id: 0,
      image: require("../../assets/image/biryani.png"),
      name: "Biriyani",
    },
    {
      id: 1,
      image: require("../../assets/image/burger.png"),
      name: "Burger",
    },
    {
      id: 2,
      image: require("../../assets/image/salad.png"),
      name: "Salad",
    },
    {
      id: 3,
      image: require("../../assets/image/sandwhich.png"),
      name: "Sandwhiches",
    },
    {
      id: 4,
      image: require("../../assets/image/sweets.png"),
      name: "Desserts",
    },
  ];
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {types.map((item, index) => {
        return (
          <View key={index}>
            <View className="rounded-full mx-4 p-2 bg-slate-200">
              <Image source={item.image} className="w-10 h-10 " />
            </View>
            <Text className="text-sm text-center text-gray-500">
              {item.name}
            </Text>
          </View>
        );
      })}
    </ScrollView>
  );
}
