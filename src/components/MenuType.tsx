import { View, Text, Pressable, ImageBackground } from "react-native";
import React from "react";
import {
  AntDesign,
  MaterialIcons,
  FontAwesome,
  Ionicons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../StackNavigation";

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

interface MenuTypeProps {
  item: MenuItem;
}

export default function MenuType({ item }: MenuTypeProps) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  return (
    <View>
      <Pressable
        onPress={() =>
          navigation.navigate("menu", {
            id: item.id,
            name: item.name,
            address: item.adress,
            rating: item.rating,
            cost_for_two: item.cost_for_two,
            time: item.time,
            cuisines: item.cuisines,
            menu: item.menu,
          })
        }
        style={{
          flexDirection: "row",
          padding: 2,
          justifyContent: "space-between",
          margin: 2,
          marginTop: 5,
        }}
        key={item.id}
      >
        <ImageBackground
          source={item.image} // Assuming you have an image property
          imageStyle={{ borderRadius: 10 }}
          style={{ width: 160, height: 220 }}
        >
          <AntDesign
            name="hearto"
            size={26}
            color="white"
            style={{ textAlign: "right", padding: 10 }}
          />
        </ImageBackground>
        <View style={{ marginLeft: 1, flex: 1, gap: 2 }}>
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>{item.name}</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialIcons name="stars" size={24} color="green" />
            <Text style={{ fontWeight: "bold" }}>{item.rating}</Text>
            <Text>•</Text>
            <Text>{item.time} mins</Text>
          </View>
          <Text style={{ color: "gray", fontSize: 14 }}>{item.adress}</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <FontAwesome name="rupee" size={18} color="black" />
            <Text>{item.cost_for_two} for two</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="bicycle" size={24} color="black" />
            <Text>Free Delivery</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
}
