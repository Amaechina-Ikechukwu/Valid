import { View, Text, Image, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthProvider";
import { CustomText, CustomView } from "../../../components/Themed";
import { Tabs } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
function TabBarIconImage({ uri }: any) {
  if (uri.length == 0) {
    return (
      <View style={{ alignItems: "center" }}>
        <AntDesign name="instagram" size={24} color="black" />
      </View>
    );
  }
  return (
    <View style={{ alignItems: "center" }}>
      <Image
        source={{ uri }}
        style={{ width: 24, height: 24, borderRadius: 50 }}
      />
    </View>
  );
}
export default function Home() {
  const { user, userFacebookInformation } = useAuth();

  useEffect(() => {
    console.log({ user });
  }, []);
  if (!userFacebookInformation) {
    return (
      <CustomView>
        <ActivityIndicator />
      </CustomView>
    );
  }
  return (
    <CustomView>
      <Tabs.Screen
        options={{
          tabBarLabel: userFacebookInformation.name.split(" ")[0],
          tabBarIcon: ({ color }) => (
            <TabBarIconImage uri={userFacebookInformation.picture.data.url} />
          ),
        }}
      />
      <View
        style={{
          flex: 1,
          gap: 7,

          marginTop: 14,
        }}
      >
        <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
          {userFacebookInformation && (
            <Image
              source={{ uri: userFacebookInformation.picture.data.url }}
              style={{ width: 50, height: 50, borderRadius: 100 }} // Adjust the dimensions as needed
            />
          )}
          <CustomText style={{ fontSize: 20, fontWeight: "bold" }}>
            {userFacebookInformation?.name}
          </CustomText>
        </View>
      </View>
    </CustomView>
  );
}
