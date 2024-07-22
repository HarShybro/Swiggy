import { View, Text, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import MenuComponent from "./MenuComponent";

export type menuItemProps = {
  id: string;
  name: string;
  items: {
    id: string;
    name: string;
    price: number;
    description: string;
    rating: number;
    image: any;
    quantity: number;
  }[];
};

export default function MenuItem({ name, items, id }: menuItemProps) {
  const [select, setSelect] = useState<string[]>([]);
  const [toggle, setToggle] = useState(true);

  const handleItemSelect = (name: string) => {
    setToggle(!toggle);
    const itemSelected = select.find((c) => c === name);

    if (itemSelected) {
      setSelect(select.filter((sel) => sel !== name));
      console.log("1", select);
    } else {
      setSelect([...select, name]);
      console.log("2", select);
    }
  };

  return (
    <>
      <Pressable
        key={id}
        className="flex-row items-center px-3 py-1 my-2"
        onPress={() => handleItemSelect(name)}
      >
        <Text className="flex-1 text-xl font-semibold">
          {name} ({items.length})
        </Text>

        {toggle ? (
          <Entypo name="chevron-down" size={24} color="black" />
        ) : (
          <Entypo name="chevron-up" size={24} color="black" />
        )}
      </Pressable>
      {select.includes(name)
        ? items.map((food, index) => <MenuComponent foodItem={food} id={id} />)
        : null}
    </>
  );
}
