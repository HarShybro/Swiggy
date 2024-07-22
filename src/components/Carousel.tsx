import React, { useState, useRef } from "react";
import { View, Text, Image, useWindowDimensions } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";

interface CarouselItem {
  img: any;
}

const CarouselBar: React.FC = () => {
  const data: CarouselItem[] = [
    { img: require("../../assets/image/imgOne.jpg") },
    { img: require("../../assets/image/imgTwo.jpg") },
    { img: require("../../assets/image/imgThree.jpg") },
  ];

  const { width, height } = useWindowDimensions();
  const isCarousel = useRef<Carousel<any>>(null);
  const [index, setIndex] = useState<number>(0);

  return (
    <View>
      <Carousel
        layout="default"
        ref={isCarousel}
        data={data}
        renderItem={({ item }: { item: any }) => {
          return (
            <View>
              <Image
                source={item.img}
                style={{
                  width: 330,
                  height: 200,
                  borderRadius: 10,
                }}
                resizeMode="cover"
              />
            </View>
          );
        }}
        sliderWidth={width}
        itemWidth={330}
        onSnapToItem={(index) => setIndex(index)}
        vertical={false}
      />
      <Pagination
        dotsLength={data.length}
        activeDotIndex={index}
        carouselRef={isCarousel}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 0,
          backgroundColor: "orange",
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        tappableDots={true}
        animatedDuration={1}
        animatedTension={1}
      />
    </View>
  );
};

export default CarouselBar;
