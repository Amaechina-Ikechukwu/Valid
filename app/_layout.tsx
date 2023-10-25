import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import { AlertProvider } from "../context/AlertProvider";
import { AuthProvider } from "../context/AuthProvider";
import { ThemeProvider as Themeful } from "../context/ThemeProvider";
import { ModalProvider } from "../context/ModalProvider";
import { BottomSheetProvider } from "../context/BottomSheetProvider";
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Themeful>
        <AuthProvider>
          <AlertProvider><ModalProvider><BottomSheetProvider><Stack screenOptions={{ headerShown: false, }}>

            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

            <Stack.Screen
              name="auth/sign-in"
              options={{ headerShown: false }}
            />
            {/* <Stack.Screen
                name="insight/[media_id]"
                options={{ headerShown: false }}
              /> */}

            <Stack.Screen name="modal" options={{ presentation: "modal" }} />
          </Stack></BottomSheetProvider></ModalProvider>


          </AlertProvider>
        </AuthProvider>
      </Themeful>
    </ThemeProvider>
  );
}
