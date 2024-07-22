import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  ImageBackground,
} from "react-native";
import React from "react";
import quickfood from "../quickFood";
import { MaterialIcons } from "@expo/vector-icons";

export default function QuickFood() {
  const data = quickfood;
  return (
    <View>
      <Text className="mt-5 mb-2 mx-2 text-xl text-gray-500 font-semibold">
        Get it Quickly
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {data.map((item) => (
          <Pressable key={item.id} className="px-1 ml-2">
            <ImageBackground
              imageStyle={{ borderRadius: 10 }}
              source={item.image}
              className="w-48 h-56 "
              resizeMode="cover"
            >
              <Text className="text-white font-bold text-2xl ml-1">
                {item.offer} OFF
              </Text>
            </ImageBackground>
            <Text className="text-base text-gray-500">{item.name}</Text>
            <View className="flex-row items-center space-x-2">
              <MaterialIcons name="stars" size={24} color="green" />
              <Text className="font-semibold">{item.rating}</Text>
              <Text>•</Text>
              <Text>{item.time} mins</Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}
