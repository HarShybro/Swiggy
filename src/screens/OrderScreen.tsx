import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  ScrollView,
  BackHandler,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import moment from "moment";
import MapView, { Marker, Polyline } from "react-native-maps";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { RootStackParams } from "../../StackNavigation";

export default function OrderScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [tip, setTip] = useState(0);
  const time = moment().format("LT");
  const mapView = useRef<any>();
  const [coordinates] = useState([
    {
      latitude: 28.639386,
      longitude: 77.103254,
    },
    {
      latitude: 28.393454,
      longitude: 77.262616,
    },
  ]);

  useEffect(() => {
    mapView.current.fitToCoordinates(coordinates, {
      edgePadding: {
        top: 50,
        bottom: 50,
        left: 50,
        right: 50,
      },
    });

    const backAction = () => {
      // Navigate to the screen you want when pressing the back button
      navigation.navigate("home");
      // Return true to prevent default behavior (going back)
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  });

  return (
    <ScrollView>
      <View className="bg-orange-400 p-5 flex-row justify-between items-center">
        <View>
          <Text className="text-base font-bold text-white">
            Delivery in 20 mins
          </Text>
          <Text className="text-base font-bold text-white">
            Order place at {time}
          </Text>
        </View>
        <Text className="text-base font-bold text-white">HELP</Text>
      </View>
      <MapView
        ref={mapView}
        style={{ width: "100%", height: 400 }}
        initialRegion={{
          longitude: 77.216721,
          latitude: 28.6448,
          longitudeDelta: 0.4,
          latitudeDelta: 0.3,
        }}
      >
        <Marker coordinate={coordinates[0]} />
        <Marker coordinate={coordinates[1]} />

        <Polyline
          coordinates={coordinates}
          strokeColor="black"
          lineDashPattern={[10]}
          strokeWidth={1}
        />
      </MapView>

      <View
        style={{
          height: 320,
          width: "100%",
          backgroundColor: "white",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
      >
        <View style={{ padding: 10 }}>
          <View>
            <Text
              style={{ fontWeight: "500", fontSize: 17, textAlign: "center" }}
            >
              Meghana Foods has accepted your order
            </Text>
            <View style={{ flexDirection: "row", marginTop: 20 }}>
              <FontAwesome5
                name="hand-holding-heart"
                size={28}
                color="#fc8019"
              />
              <View style={{ marginLeft: 10 }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "500",
                    paddingHorizontal: 2,
                    marginBottom: 6,
                  }}
                >
                  Tip your hunger Saviour
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    color: "#696969",
                    marginRight: 10,
                    paddingHorizontal: 2,
                  }}
                >
                  Thank your delivery partner for helping you stay safe
                  indoors.Support them through these tough times with a tip
                </Text>
                <Pressable
                  style={{
                    paddingTop: 20,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => setTip(30)}
                    style={{
                      backgroundColor: "#F5F5F5",
                      marginHorizontal: 10,
                      paddingHorizontal: 10,
                      borderRadius: 7,
                    }}
                  >
                    <Text
                      style={{
                        padding: 10,
                        color: "#002D62",
                        fontWeight: "bold",
                      }}
                    >
                      ₹30
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => setTip(50)}
                    style={{
                      alignItems: "center",
                      backgroundColor: "#F5F5F5",
                      marginHorizontal: 10,
                      borderRadius: 7,
                      // paddingHorizontal: 10,
                    }}
                  >
                    <Text
                      style={{
                        padding: 4,
                        color: "#002D62",
                        fontWeight: "bold",
                      }}
                    >
                      ₹50
                    </Text>
                    <Text
                      style={{
                        backgroundColor: "orange",
                        paddingHorizontal: 10,
                        fontSize: 14,
                        fontWeight: "bold",
                        color: "white",
                      }}
                    >
                      Most Tipped
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => setTip(70)}
                    style={{
                      backgroundColor: "#F5F5F5",
                      marginHorizontal: 10,
                      paddingHorizontal: 10,
                      borderRadius: 7,
                    }}
                  >
                    <Text
                      style={{
                        padding: 10,
                        color: "#002D62",
                        fontWeight: "bold",
                      }}
                    >
                      ₹70
                    </Text>
                  </TouchableOpacity>
                </Pressable>
              </View>
            </View>
            {tip ? (
              <View>
                <Text
                  style={{
                    color: "#fc8019",
                    padding: 10,
                    marginLeft: 10,
                    marginRight: 10,
                    fontSize: 16,
                    fontWeight: "600",
                  }}
                >
                  please pay {"₹"}
                  {tip} to your delivery agent at the time of delivery
                </Text>
                <TouchableOpacity
                  onPress={() => setTip(0)}
                  activeOpacity={0.7}
                  style={{
                    padding: 10,
                    marginLeft: 10,
                    marginRight: 10,
                    position: "absolute",
                    top: 40,

                    paddingBottom: 40,
                  }}
                >
                  <Text
                    style={{ color: "red", fontSize: 14, fontWeight: "700" }}
                  >
                    (Cancel)
                  </Text>
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
