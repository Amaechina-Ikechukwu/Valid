import React, { useEffect, useRef } from "react";
import { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Animated,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { GetListOfFBPages } from "../../apis/Facebook/GetListOfFBPages";
import { CustomButton, CustomText, CustomView } from "../../components/Themed";
import Colors from "../../constants/Colors";
import { useAuth } from "../../context/AuthProvider";
import { useTheme } from "../../context/ThemeProvider";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAlert } from "../../context/AlertProvider";
import { SubscribeUserPages } from "../../apis/Facebook/SubscribeToUsersPages";
import { router } from "expo-router";
const AnimatedFlatList: React.FC = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const { user } = useAuth();
  const { color } = useTheme();
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(Boolean);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const { alert, showAlert } = useAlert();
  const getUserPages = async () => {
    try {
      const responseData = await GetListOfFBPages(user);
      setData(responseData.data);
      console.log(responseData);
    } catch {
      showAlert("Couldn't fetch Pages at this time");
    }
  };
  const subscribeToUserPages = async () => {
    try {
      if (selectedItems.length === 0) {
        showAlert("Please select at least one Page");
      } else {
        setLoad(true);
        // const selectedPageIds = selectedItems.map((item) => item.id);
        await SubscribeUserPages(selectedItems, user);

        showAlert("Connected Successfully....Redirecting");
        router.back();
        setLoad(false);
      }
    } catch {
      setLoad(false);
      showAlert("Error connecting page to Valid");
    }
  };

  useEffect(() => {
    getUserPages();
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const toggleSelect = (item: any) => {
    if (selectedItems.some((selected) => selected.id === item.id)) {
      // Remove item from selectedItems
      setSelectedItems(
        selectedItems.filter((selected) => selected.id !== item.id)
      );
    } else {
      // Add item to selectedItems
      setSelectedItems([...selectedItems, item]);
    }
  };

  const renderItem = ({ item }: { item: any }) => {
    const isSelected = selectedItems.some(
      (selected) => selected.id === item.id
    );

    return (
      <TouchableOpacity
        onPress={() => toggleSelect(item)}
        style={{
          opacity: fadeAnim,
          backgroundColor: isSelected
            ? Colors[color].accent
            : Colors[color].background,
          width: "100%",
          padding: 10,
          borderRadius: 3,
          height: 50,
          alignItems: "center",
          flexDirection: "row",
          gap: 4,
        }}
      >
        {isSelected ? (
          <AntDesign name="checksquare" size={20} color="black" />
        ) : (
          <MaterialCommunityIcons
            name="checkbox-blank-outline"
            size={20}
            color="black"
          />
        )}
        <CustomText style={{ fontSize: 18 }}>{item.name}</CustomText>
      </TouchableOpacity>
    );
  };

  return (
    <CustomView>
      <View style={{ width: "100%", justifyContent: "center", gap: 25 }}>
        <CustomText style={{ fontSize: 28, lineHeight: 40 }}>
          Which page would you like to connect to Valid
        </CustomText>
        <FlatList
          ListEmptyComponent={
            <ActivityIndicator color={Colors[color].accent} />
          }
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            gap: 4,
            width: "100%",
            justifyContent: "center",
          }}
        />
      </View>
      <View style={{ position: "absolute", bottom: 10, width: "100%" }}>
        <CustomButton
          text="Confirm Pages"
          disabled={load || selectedItems.length === 0}
          load={load}
          onPress={subscribeToUserPages}
        />
      </View>
    </CustomView>
  );
};

export default AnimatedFlatList;
