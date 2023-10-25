import React, { useEffect, useState, useLayoutEffect } from "react";
import { View, Text, Image, ActivityIndicator } from "react-native";
import { useAuth } from "../../../context/AuthProvider";
import { CustomButton, CustomView } from "../../../components/Themed";
import { Tabs } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import AccountInsights from "../../../InstagramComponents/AccountInsights";
import ProfileHeader from "../../../InstagramComponents/ProfileHeader";
import MediaPreviewFlatlist from "../../../InstagramComponents/MediaPreviewFlatList";
import Colors from "../../../constants/Colors";
import { useTheme } from "../../../context/ThemeProvider";
import { GetUsersInstagramProfile } from "../../../apis/Instagram/GetUsersInstagramProfile";

interface UserInformation {
  name: string;
  profile_picture_url: string;
}

function TabBarIconImage({ uri }: { uri: string }) {
  if (!uri || uri.length === 0) {
    return (
      <View style={{ alignItems: "center" }}>
        <AntDesign name="instagram" size={24} color="black" />
      </View>
    );
  }

  return (
    <View style={{ alignItems: "center" }}>
      <Image source={{ uri }} style={{ width: 24, height: 24, borderRadius: 50 }} />
    </View>
  );
}

export default function Home() {
  const { user, checkIfInstagramIsConnected } = useAuth();
  const [userInformation, setUserInformation] = useState<UserInformation | null>(null);
  const [load, setLoad] = useState<boolean>(false);
  const { color } = useTheme();

  const getUsersInstagramProfile = async () => {
    try {
      setLoad(true);
      const responseData = await GetUsersInstagramProfile(user);
      setUserInformation(responseData.data);
      setLoad(false);
    } catch (error) {
      console.error("Error fetching Instagram profile:", error);
      setLoad(false);
    }
  }

  const check = async () => {
    const result = await checkIfInstagramIsConnected?.();

    if (result === true) {
      getUsersInstagramProfile();
    }
  }

  useLayoutEffect(() => {
    check();
  }, []);

  useEffect(() => {
    getUsersInstagramProfile();
  }, [userInformation]);

  if (!userInformation && load) {
    return (
      <CustomView>
        <ActivityIndicator color={Colors[color].accent} />
      </CustomView>
    );
  }
  if (!userInformation || Object.keys(userInformation).length === 0 && !load) {
    return (
      <CustomView>
        <CustomButton text="Retry" onPress={getUsersInstagramProfile} />
      </CustomView>
    );
  }
  return (
    <CustomView>
      <Tabs.Screen
        options={{
          tabBarLabel: userInformation?.name.split(" ")[0],
          tabBarIcon: ({ color }) => (
            <TabBarIconImage uri={userInformation?.profile_picture_url} />
          ),
        }}
      />
      <View style={{ flex: 1, marginTop: 14, gap: 25 }}>
        <ProfileHeader userInformation={userInformation} />
        <AccountInsights />
        <MediaPreviewFlatlist />
      </View>
    </CustomView>
  );
}
