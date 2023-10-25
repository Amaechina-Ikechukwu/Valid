import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Image, Pressable, useColorScheme, View } from "react-native";
import { CustomText, Logo } from "../../components/Themed";
import { AntDesign } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  color: string;
}) {
  return (
    <MaterialCommunityIcons size={28} style={{ marginBottom: -3 }} {...props} />
  );
}
export function TabBarIconImage(props: any) {
  return (
    <View style={{ alignItems: "center" }}>
      <AntDesign name="instagram" size={24} color={props.color} />
    </View>
  );
}
export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].text,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "Home", // Replace with your desired tab label text
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="home-roof" color={color} />
          ),
          // tabBarButton: (props) => (
          //   <Pressable
          //     onPress={() => {
          //       // Handle tab press if needed
          //     }}
          //     {...props}
          //   >
          //     <CustomText>Home</CustomText>
          //   </Pressable>
          // ),
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[colorScheme ?? "light"].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
          headerLeft: () => <Logo />,
        }}
      />

      <Tabs.Screen
        name="facebook/home"
        options={{
          tabBarLabel: "Facebook",
          tabBarIcon: ({ color }) => (
            <EvilIcons name="sc-facebook" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="instagram/home"
        options={{
          tabBarLabel: "Instgram",
          tabBarIcon: ({ color }) => <TabBarIconImage color={color} />,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ color }) => (
            <Feather name="settings" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
