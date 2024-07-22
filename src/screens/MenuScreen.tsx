import {
  View,
  Text,
  ScrollView,
  Pressable,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { MaterialIcons, AntDesign, FontAwesome5 } from "@expo/vector-icons";
import MenuItem from "../components/MenuItem";
import { RootStackParams } from "../../StackNavigation";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

type Props = NativeStackScreenProps<RootStackParams, "menu">;

import { menuItemProps } from "../components/MenuItem";
import Modal from "react-native-modal";
import { CartContext } from "../context/CartContextProvider";

export type cartItem = {
  id: string;
  name: string;
};

export default function MenuScreen({ route }: Props) {
  const { cart } = useContext(CartContext);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [menu, setMenu] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const total = cart
    .map((item) => item.price * item.quantity)
    .reduce((curr, prev) => curr + prev, 0);
  console.log(total);

  useEffect(() => {
    const fetch = () => setMenu(route.params.menu);

    console.log(cart);

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        return false;
      }
    );

    fetch();

    return () => backHandler.remove();
  }, []);

  return (
    <View className="flex-1">
      <ScrollView>
        <View className="w-full h-72 border-l rounded-b-3xl bg-orange-300 flex  p-2">
          <View className="flex-row justify-between">
            <MaterialIcons
              name="arrow-back"
              size={32}
              color="gray"
              onPress={() => navigation.goBack()}
            />
            <View className="flex-row">
              <MaterialIcons name="search" size={32} color="gray" />
              <Text className="text-xl text-gray-900">Search</Text>
            </View>
          </View>
          <View className="w-100  flex-1 bg-white m-2 mb-4 rounded-xl p-2 space-y-1">
            <View className="flex-row flex">
              <Text className="flex-1 text-xl font-bold">
                {route.params.name}
              </Text>
              <View className="flex-row space-x-2">
                <MaterialIcons name="share" size={24} color="black" />
                <AntDesign name="hearto" size={24} color="black" />
              </View>
            </View>
            <View className="flex-row items-center space-x-2">
              <AntDesign name="star" size={24} color="green" />
              <Text className="text-base font-semibold">
                {route.params.rating}
              </Text>
              <Text>•</Text>
              <Text className="text-base font-semibold">
                {route.params.time} mins
              </Text>
            </View>
            <Text className="text-base text-gray-500">
              {route.params.cuisines}
            </Text>
            <View className="flex-row mb-8">
              <Text className="text-base font-semibold">Outlet: </Text>
              <Text className="text-base">{route.params.address}</Text>
            </View>
            <Text className="w-full h-[10px] border-t-2 border-gray-500 " />
            <View className=" flex-row items-center space-x-3">
              <FontAwesome5 name="bicycle" size={24} color="orange" />
              <Text className="font-semibold">0-3 kms |</Text>
              <Text className="font-semibold">35 Delivery Fee will apply</Text>
            </View>
          </View>
        </View>

        <Text className="text-2xl font-light text-center p-2">Menu</Text>
        <Text className="w-full h-[10px] border-t border-gray-500" />
        {route.params.menu.map((item: menuItemProps, index: number) => (
          <MenuItem name={item.name} items={item.items} id={item.id} />
        ))}
      </ScrollView>

      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(!modalVisible)}
        onBackButtonPress={() => setModalVisible(false)}
      >
        <View className="w-full h-44 absolute bg-black bottom-0 ">
          <TouchableOpacity
            onPress={() => setModalVisible(!modalVisible)}
            className="self-end p-2"
          >
            <Entypo name="circle-with-cross" size={30} color="white" />
          </TouchableOpacity>
          {route.params.menu.map((item: menuItemProps) => {
            return (
              <View className="flex-row px-3 py-1 ">
                <Text className="text-white text-base font-semibold flex-1">
                  {item.name}
                </Text>
                <Text className="text-white text-base font-semibold ">
                  {item.items.length}
                </Text>
              </View>
            );
          })}
        </View>
      </Modal>
      {total === 0 ? (
        <TouchableOpacity
          onPress={() => setModalVisible(!modalVisible)}
          className="absolute bottom-4 right-6"
        >
          <View className="bg-black w-20 h-20 flex items-center justify-center rounded-full">
            <Ionicons name="book" size={30} color="white" />
            <Text className="text-white">Menu</Text>
          </View>
        </TouchableOpacity>
      ) : (
        <Pressable
          className="bg-green-600 
         w-[96%]   "
        >
          <View className="flex-row justify-between p-2 items-center">
            <View>
              <Text className="text-base font-bold text-white">
                {cart.length} items | {total}
              </Text>
              <Text className="font-semibold text-small text-white">
                Extra Charges may Apply!
              </Text>
            </View>
            <Pressable
              onPress={() =>
                navigation.navigate("cart", { name: route.params.name })
              }
            >
              <Text className="text-base text-white">View Cart</Text>
            </Pressable>
          </View>
        </Pressable>
      )}
    </View>
  );
}
