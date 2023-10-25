import { View, Image } from "react-native";
import React from "react";

import { CustomText } from "../components/Themed";

import { AntDesign } from "@expo/vector-icons";

export default function ProfileHeader({ userInformation }: any) {
  return (
    <View style={{ alignItems: "center", gap: 7 }}>
      {userInformation && (
        <Image
          source={{ uri: userInformation.profile_picture_url }}
          style={{ width: 100, height: 100, borderRadius: 100 }} // Adjust the dimensions as needed
        />
      )}
      <CustomText style={{ fontSize: 20, fontWeight: "bold" }}>
        {userInformation?.name}
      </CustomText>
      <CustomText style={{ fontSize: 14 }}>
        {userInformation?.biography}
      </CustomText>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          width: "100%",
        }}
      >
        <View style={{ alignItems: "center" }}>
          <CustomText style={{ fontSize: 14, fontWeight: "bold" }}>
            Followers
          </CustomText>
          <CustomText style={{ fontSize: 18 }}>
            {userInformation?.followers_count}
          </CustomText>
        </View>
        <View style={{ alignItems: "center" }}>
          <CustomText style={{ fontSize: 14, fontWeight: "bold" }}>
            Following
          </CustomText>
          <CustomText style={{ fontSize: 18 }}>
            {userInformation?.follows_count}
          </CustomText>
        </View>
        <View style={{ alignItems: "center" }}>
          <CustomText style={{ fontSize: 14, fontWeight: "bold" }}>
            Post
          </CustomText>
          <CustomText style={{ fontSize: 18 }}>
            {userInformation?.media_count}
          </CustomText>
        </View>
      </View>
    </View>
  );
}
