import { View, Text, Pressable, Image } from "react-native";
import React, { useContext, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import {
  CartContext,
  CartContextProvider,
} from "../context/CartContextProvider";

export type Food = {
  name: string;
  id: string;
  price: number;
  description: string;
  rating: number;
  image: any;
  quantity: number;
};

interface MenuComponentProps {
  foodItem: Food;
  id: string;
}

export default function MenuComponent({ foodItem }: MenuComponentProps) {
  const { addToCart, incrementQuantity, removeFromCart, decrementQuantity } =
    useContext(CartContext);
  const [additems, setAddItems] = useState(0);
  const [selected, setSelected] = useState(false);
  return (
    <Pressable className="flex-row mt-1 px-4">
      <View className="flex-1">
        <Text className="text-xl font-normal">{foodItem.name}</Text>
        <Text className="text-base">Rs: {foodItem.price}</Text>
        <Text className="mt-2">
          {[0, 0, 0, 0, 0].map((_, index) => (
            <FontAwesome
              name={index < Math.floor(foodItem.rating) ? "star" : "star-o"}
              size={18}
              color="orange"
            />
          ))}
        </Text>
        <Text className="w-44">
          {foodItem.description.length > 30
            ? foodItem.description.substring(0, 30) + "..."
            : foodItem.description}
        </Text>
      </View>
      <Pressable className="relative flex items-center">
        <Image
          source={foodItem.image}
          style={{
            width: 160,
            height: 180,
            backgroundColor: "gray",
            borderRadius: 10,
          }}
        />
        {selected ? (
          <Pressable className="absolute bottom-1  flex-row px-[10px] py-[5px] justify-center items-center bg-white border-r-[5px]">
            <Pressable
              onPress={() => {
                if (additems === 1) {
                  removeFromCart(foodItem);
                  setSelected(false);
                  setAddItems(0);
                } else {
                  decrementQuantity(foodItem);
                  setAddItems((c) => c - 1);
                }
              }}
            >
              <Text className="text-[25px] text-green-500 px-[6px]">-</Text>
            </Pressable>

            <Pressable>
              <Text className="text-[20px] text-green-500 px-[6px]">
                {additems}
              </Text>
            </Pressable>

            <Pressable
              onPress={() => {
                setAddItems((c) => c + 1);
                incrementQuantity(foodItem);
              }}
            >
              <Text className="text-[20px] text-green-500 px-[6px]">+</Text>
            </Pressable>
          </Pressable>
        ) : (
          <Pressable
            onPress={() => {
              setSelected(true);
              if (additems === 0) {
                setAddItems((c) => c + 1);
              }
              addToCart(foodItem);
            }}
            className="absolute bottom-1 bg-white px-3 py-1 rounded"
          >
            <Text className="text-center text-2xl font-semibold text-green-300">
              ADD
            </Text>
          </Pressable>
        )}
      </Pressable>
    </Pressable>
  );
}
