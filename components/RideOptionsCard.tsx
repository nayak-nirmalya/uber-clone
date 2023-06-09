import React, { useState } from "react";
import { FlatList, Text, TouchableOpacity, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Icon } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectTravelTimeInformation } from "../slices/navSlice";
import tw from "twrnc";

interface Data {
  id: string;
  title: string;
  multiple: number;
  image: string;
}

const data: Data[] = [
  {
    id: "Uber-X",
    title: "Uber X",
    multiple: 1,
    image: "https://links.papareact.com/3pn"
  },
  {
    id: "Uber-XL",
    title: "Uber XL",
    multiple: 1.2,
    image: "https://links.papareact.com/5w8"
  },
  {
    id: "Uber-LUX",
    title: "Uber LUX",
    multiple: 1.75,
    image: "https://links.papareact.com/7pf"
  }
];

const SURGE_CHARGE_RATE = 1.5;
const GBP_INR = 45;

const RideOptionsCard = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState<Data | null>(null);
  const travelTimeInfo = useSelector(selectTravelTimeInformation);

  return (
    <SafeAreaView style={tw`-pt-8 bg-white flex-grow`}>
      <View style={tw``}>
        <TouchableOpacity
          // @ts-ignore
          onPress={() => navigation.navigate("NavigateCard")}
          style={tw`absolute top-3 left-5 p-2 rounded-full z-50`}
        >
          <Icon name="chevron-left" type="fontawesome" />
        </TouchableOpacity>
        <Text style={tw`text-center py-5 text-xl`}>
          Select a Ride - {travelTimeInfo?.distance?.text}
        </Text>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item: { id, title, multiple, image }, item }) => (
          <TouchableOpacity
            onPress={() => setSelected(item)}
            style={tw`flex-row items-center justify-between px-10 ${
              id === selected?.id ? "bg-gray-200" : ""
            }`}
          >
            <Image
              source={{
                uri: image
              }}
              style={{
                width: 100,
                height: 100,
                resizeMode: "contain"
              }}
            />

            <View style={tw`-ml-6`}>
              <Text style={tw`text-xl font-semibold`}>{title}</Text>
              <Text style={tw``}>
                {travelTimeInfo?.duration?.text} Travel Time
              </Text>
            </View>
            <Text style={tw`text-xl`}>
              {travelTimeInfo &&
                new Intl.NumberFormat("en-in", {
                  style: "currency",
                  currency: "INR"
                }).format(
                  (travelTimeInfo?.duration?.value *
                    GBP_INR *
                    SURGE_CHARGE_RATE *
                    multiple) /
                    100
                )}
            </Text>
          </TouchableOpacity>
        )}
      />

      <View style={tw`mt-auto border-t border-gray-200`}>
        <TouchableOpacity
          disabled={!selected}
          style={tw`bg-black py-3 m-3 rounded-lg ${
            !selected ? "bg-gray-300" : ""
          }`}
        >
          <Text style={tw`text-center text-white text-xl`}>
            Choose {selected?.title}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RideOptionsCard;
