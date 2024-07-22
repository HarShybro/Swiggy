import { View, Text } from "react-native";
import React, { useEffect } from "react";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../StackNavigation";

export default function LoadingScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  useEffect(() => {
    setTimeout(() => {
      navigation.replace("order");
    }, 2000);
  });
  return (
    <View>
      <LottieView
        source={require("../../assets/image/sparkle.json")}
        style={{
          height: 260,
          width: 300,
          alignSelf: "center",
          marginTop: 40,
          justifyContent: "center",
        }}
        autoPlay
        loop={false}
        speed={0.7}
      />
      <Text className="mt-10 text-base font-semibold text-center">
        Your order Has been Received
      </Text>
      <LottieView
        source={require("../../assets/image/thumbs.json")}
        style={{
          height: 300,
          position: "absolute",
          top: 100,
          width: 300,
          alignSelf: "center",
        }}
        autoPlay
        loop={false}
        speed={0.7}
      />
    </View>
  );
}
