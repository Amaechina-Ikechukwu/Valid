import { StyleSheet, View } from "react-native";

import EditScreenInfo from "../../components/EditScreenInfo";
import { CustomButton, CustomText, CustomView } from "../../components/Themed";
import { useAuth } from "../../context/AuthProvider";

export default function TabTwoScreen() {
  const { signOut } = useAuth();
  return (
    <CustomView style={styles.container}>
      <View style={{ width: "100%" }}>
        <CustomButton text="Sign Out" onPress={signOut} />
      </View>
    </CustomView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
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
