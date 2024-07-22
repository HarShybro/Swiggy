import { View, Text, StatusBar, Pressable, ScrollView } from "react-native";
import React, { useContext } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { RootStackParams } from "../../StackNavigation";
import { AntDesign } from "@expo/vector-icons";
import { CartContext } from "../context/CartContextProvider";
import { FontAwesome5 } from "@expo/vector-icons";

type Props = NativeStackScreenProps<RootStackParams, "cart">;

export default function CartScreen({ route }: Props) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const {
    cart,
    removeFromCart,
    decrementQuantity,
    addToCart,
    incrementQuantity,
    clearCart,
  } = useContext(CartContext);

  const total = cart
    .map((item) => item.price * item.quantity)
    .reduce((curr, prev) => curr + prev, 0);
  console.log(total);

  const instructions = [
    { id: "0", name: "Avoid Ringing", iconName: "bell" },
    { id: "1", name: "Leave at the door", iconName: "door-open" },
    { id: "2", name: "directions to reach", iconName: "directions" },
    { id: "3", name: "Avoid Calling", iconName: "phone-alt" },
  ];
  return (
    <>
      <ScrollView>
        {total > 0 ? (
          <>
            <View className="flex-row items-center space-x-2 p-1">
              <AntDesign
                onPress={() => navigation.goBack()}
                name="arrowleft"
                size={28}
                color="black"
              />
              <Text className="text-2xl font-semibold">
                {route.params?.name}
              </Text>
            </View>

            <View className="flex-row justify-between px-3 py-2 bg-gray-200 m-2 rounded items-center">
              <Text className="py-1">Order for Something else?</Text>
              <Text className="text-red-500 font-bold ">Add Details</Text>
            </View>

            <View className="m-2">
              {cart.map((item, index) => {
                return (
                  <View
                    key={index}
                    className="flex-row  bg-slate-200 py-2 px-2 justify-between items-center "
                  >
                    <Text className="text-base w-28">{item.name}</Text>

                    <Pressable className="flex-row border border-gray-400 px-2 space-x-3 rounded items-center ">
                      <Pressable
                        onPress={() => {
                          if (item.quantity === 1) {
                            removeFromCart(item);
                          } else {
                            decrementQuantity(item);
                          }
                        }}
                      >
                        <Text className="text-green-700 text-2xl p-1"> - </Text>
                      </Pressable>
                      <Pressable>
                        <Text className="text-green-700 text-2xl">
                          {item.quantity}
                        </Text>
                      </Pressable>
                      <Pressable
                        onPress={() => {
                          incrementQuantity(item);
                        }}
                      >
                        <Text className="text-green-700 text-2xl"> + </Text>
                      </Pressable>
                    </Pressable>

                    <Text className="text-sm">
                      ₹ {item.quantity * item.price}
                    </Text>
                  </View>
                );
              })}
            </View>

            <View className="m-2">
              <Text className=" font-semibold">Delivery Instructions</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {instructions.map((item) => {
                  return (
                    <Pressable className="py-5 px-1 bg-gray-300 m-1 rounded">
                      <View className="justify-center flex items-center space-y-2 w-20 ">
                        <FontAwesome5
                          name={item.iconName}
                          size={22}
                          color="black"
                        />
                        <Text className="text-center">{item.name}</Text>
                      </View>
                    </Pressable>
                  );
                })}
              </ScrollView>
            </View>

            <View className="m-2">
              <Text className="mb-2 font-semibold text-base rounded">
                Billing Details
              </Text>
              <View className="bg-gray-300 rounded p-1">
                <View className="flex-row justify-between m-1">
                  <Text className=" font-medium text-gray-600">
                    Item Total{" "}
                  </Text>
                  <Text className="font-medium text-gray-600">₹{total}</Text>
                </View>
                <View className="flex-row justify-between m-1">
                  <Text className="font-medium text-gray-600">
                    Delivery Fee | 1.2 KM
                  </Text>
                  <Text className="text-red-600">FREE</Text>
                </View>
                <View className="flex-row justify-between m-1">
                  <Text className=" font-medium text-gray-600">
                    Free Delivery on Your order
                  </Text>
                </View>
                <View className="border-t-2 border-gray-500 m-1" />
                <View className="flex-row justify-between m-1">
                  <Text className="font-medium text-gray-600">
                    Delivery To Tip
                  </Text>
                  <Text className="text-red-600">ADD TRIP</Text>
                </View>
                <View className="flex-row justify-between m-1">
                  <Text className="font-medium text-gray-600">
                    Taxes and Charges
                  </Text>
                  <Text className="text-red-600">95</Text>
                </View>
                <View className="border-t-2 border-gray-500 m-1" />
                <View className="flex-row justify-between m-1">
                  <Text className="font-bold text-black">To Pay</Text>
                  <Text className="text-black">{total + 95}</Text>
                </View>
              </View>
            </View>
          </>
        ) : (
          <View>
            <Text className="text-center pt-2 font-semibold text-2xl">
              Your Cart is Empty
            </Text>
          </View>
        )}
      </ScrollView>
      {total === 0 ? null : (
        <Pressable className="flex-row justify-between p-2 items-center">
          <View className="pl-2">
            <Text className="text-gray-600">{total + 95}</Text>
            <Text className="text-gray-600">View Detail Bill</Text>
          </View>
          <Pressable
            className="bg-green-500 p-3 rounded"
            onPress={() => {
              clearCart();
              navigation.navigate("loading");
            }}
          >
            <Text className="w-40 text-center">Proceed to pay</Text>
          </Pressable>
        </Pressable>
      )}
    </>
  );
}
