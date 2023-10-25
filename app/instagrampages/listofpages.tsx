import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Animated,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import { CustomButton, CustomText, CustomView } from "../../components/Themed";
import Colors from "../../constants/Colors";
import { useAuth } from "../../context/AuthProvider";
import { useTheme } from "../../context/ThemeProvider";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAlert } from "../../context/AlertProvider";

import { router } from "expo-router";
import { GetListOfUsersPages } from "../../apis/Instagram/GetListOfUsersPages";
import { ConfirmPage } from "../../apis/Instagram/ConfirmPage";
import { RegisterUser } from "../../apis/Instagram/RegisterUser";

const AnimatedFlatList: React.FC = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const { user } = useAuth();
  const { color } = useTheme();
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(Boolean);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const { alert, showAlert } = useAlert();

  const getUserPages = async () => {
    try {
      const responseData = await GetListOfUsersPages(user);
      setData(responseData.data);
    } catch {
      showAlert("Couldn't fetch Pages at this time");
    }
  };

  const subscribeToUserPages = async () => {
    try {
      if (!selectedItem) {
        showAlert("Please select a Page");
      } else {
        setLoad(true);
        await RegisterUser(selectedItem, user);
        await ConfirmPage([selectedItem], user);

        showAlert("Connected Successfully....Redirecting");
        router.back();
        setLoad(false);
      }
    } catch {
      setLoad(false);
      showAlert("Error connecting the page to Valid");
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
    setSelectedItem(item === selectedItem ? null : item);
  };

  const renderItem = ({ item }: { item: any }) => {
    const isSelected = item === selectedItem;

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
          Which page is connected to your Instagram Business Or Creators Account
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
          disabled={load || !selectedItem}
          load={load}
          onPress={subscribeToUserPages}
        />
      </View>
    </CustomView>
  );
};

export default AnimatedFlatList;
