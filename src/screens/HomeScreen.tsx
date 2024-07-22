import { View, Text, TextInput, ScrollView } from "react-native";
import React, { useContext } from "react";

import { EvilIcons } from "@expo/vector-icons";
import CarouselBar from "../components/Carousel";
import FoodTypes from "../components/FoodTypes";
import QuickFood from "../components/QuickFood";
import FilterType from "../components/FilterType";
import hotelData from "../../hotelData";
import MenuType from "../components/MenuType";
import { CartContext } from "../context/CartContextProvider";

interface MenuItem {
  id: string | number;
  name: string;
  adress: string;
  rating: number;
  cost_for_two: number;
  time: string;
  cuisines: string[];
  menu: any;
  image: any;
}

export default function HomeScreen() {
  const data = hotelData;
  return (
    <ScrollView>
      {/*Search Bar  */}
      <View className="flex-row justify-between border-2 rounded-lg py-3 px-3 m-2 border-gray-400">
        <TextInput
          placeholder="Search for Restaurant item or more... "
          className="text-base font-semibold"
        />
        <EvilIcons name="search" size={34} color={"red"} />
      </View>
      {/* Image Slider */}
      <CarouselBar />
      {/* Food Types */}
      <FoodTypes />
      {/* QuickFood Panel */}
      <QuickFood />
      {/* Filter button */}
      <FilterType />

      {/* Menu */}
      {data.map((item: any) => (
        <MenuType item={item} />
      ))}
    </ScrollView>
  );
}
