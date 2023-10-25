import { StyleSheet } from "react-native";
import { useAuth } from "../../context/AuthProvider";
import { CustomText, CustomView, CustomButton } from "../../components/Themed";
import { useEffect } from "react";
import { GetListOfFBPages } from "../../apis/Facebook/GetListOfFBPages";
import { GetListOfUserPages } from "../../apis/Facebook/GetListOfUsersPages";
import { router } from "expo-router";
import Colors from "../../constants/Colors";
import { useTheme } from "../../context/ThemeProvider";
export default function TabOneScreen() {
  const { user } = useAuth();
  const { color } = useTheme();

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <CustomView style={styles.container}>
      <CustomText style={styles.title}>Welcome To Valid</CustomText>
      {/* <CustomButton text="Retry" onPress={getUserPages} /> */}
      <CustomButton
        inverse={true}
        text="Confirm Pages"
        style={{ backgroundColor: Colors[color].accent }}
        onPress={() => router.push("/pageconfirmation/listofpages")}
      />
      <CustomButton
        inverse={true}
        text="Confirm Pages"
        style={{ backgroundColor: Colors[color].text }}
        onPress={() => router.push("/instagrampages/listofpages")}
      />
    </CustomView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
