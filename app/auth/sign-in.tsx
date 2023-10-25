import React, { useEffect } from "react";
import * as WebBrowser from "expo-web-browser";

import Colors from "../../constants/Colors";
import * as Linking from "expo-linking";

import { useAuth } from "../../context/AuthProvider";
import { CustomButton, CustomText, CustomView } from "../../components/Themed";
import { useRouter } from "expo-router";
import { useAlert } from "../../context/AlertProvider";
import { useTheme } from "../../context/ThemeProvider";
import { View as Box, FlatList, Dimensions, StyleSheet } from "react-native";
WebBrowser.maybeCompleteAuthSession();

const data = [
  {
    text: "A suitable developer portfolio display platform",
  },
  {
    text: "A platform to host all your projects",
  },
  {
    text: "Project so awesome,meant for the world to see",
  },
];
const GoogleSignIn = () => {
  const { signIn } = useAuth();
  const router = useRouter();
  const { showAlert } = useAlert();
  useEffect(() => {
    Linking.addEventListener("url", handleDeepLink);
    return () => {};
    // Cleanup function to remove the event listener when the component unmounts
  }, []); // Empty dependency array ensures the effect only runs once during mount

  // ... Your imports and component definition ...
  const handleDeepLink = async (event: any) => {
    console.log(event);
    const accessParam = "token=";

    if (event.url.includes(accessParam)) {
      showAlert("Logging in,please wait");
      const token = event.url.split(accessParam)[1].split("&")[0];
      await signIn(token);
      showAlert("Logged In");
    }
    //   // Now 'access_token', 'id_token', and 'codeId' contain the extracted values

    return;
    // Close the in-app browser
    // Note: WebBrowser.dismissBrowser(); may not work in some cases
  };

  const appurl = Linking.createURL("");
  const handleLogin = async () => {
    const authEndpoint =
      process.env.EXPO_PUBLIC_VALIDSERVER + "/app/auth?auth=" + appurl;
    WebBrowser.openAuthSessionAsync(authEndpoint);
  };

  const theme = useTheme();
  const { width } = Dimensions.get("window");
  const colorSchemeAsKey = theme.colorScheme as keyof typeof Colors;
  const backgroundColors = ["#7f1d1d", "#0c4a6e", "#059669"]; // Example colors
  const textColors = ["#fca5a5", "#7dd3fc", "#86efac"]; // Example colors

  const renderItem = ({ item, index }: { item: string; index: number }) => (
    <Box
      style={{
        backgroundColor: backgroundColors[index % backgroundColors.length], // Use modulo to cycle through colors if there are more items than colors
        padding: 20,
        margin: 5,
        borderRadius: 15,
        height: 200,
        justifyContent: "flex-end",
        width: width * 0.85,
      }}
    >
      <CustomText
        style={{
          color: textColors[index % textColors.length],
          fontSize: 34,
        }}
      >
        {item}
      </CustomText>
    </Box>
  );
  const dataArray = data.map((item) => item.text);

  return (
    <CustomView
      lightColor="white"
      darkColor="black"
      style={{ flex: 1, gap: 24 }}
    >
      <Box style={{ width: "100%" }}>
        <FlatList
          horizontal
          data={dataArray}
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item} // Assuming URIs are unique
        />
      </Box>

      <CustomButton
        onPress={() => handleLogin()}
        inverse
        style={{
          backgroundColor: Colors[colorSchemeAsKey].text,
          width: "100%",
          paddingHorizontal: 30,
        }}
        text={"Sign In To Valid"}
      />
    </CustomView>
  );
};

export default GoogleSignIn;
