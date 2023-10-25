import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { GetAccountInsights } from "../apis/Instagram/GetAccountInsights";
import { useAuth } from "../context/AuthProvider";
import { CustomText } from "../components/Themed";
import Colors from "../constants/Colors";
import { useTheme } from "../context/ThemeProvider";

export default function AccountInsights() {
  const { user } = useAuth();
  const { color } = useTheme();
  const [insightsData, setInsightsData] = useState([]);

  const getAccountInsight = async () => {
    try {
      const result = await GetAccountInsights(user);
      setInsightsData(result.data);
    } catch (error) {
      console.error("Error fetching account insights:", error);
    }
  };

  useEffect(() => {
    getAccountInsight();
  }, []);

  return (
    <View
      style={{
        backgroundColor: Colors[color].tabIconDefault,
        padding: 15,
        borderRadius: 5,
        gap: 10,
      }}
    >
      <CustomText>Latest Insights Today</CustomText>
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        {insightsData.map((insight: any) => (
          <View style={{ alignItems: "center" }} key={insight.id}>
            <CustomText>{insight.title}</CustomText>

            <CustomText></CustomText>
            <CustomText>{insight.values[1].value}</CustomText>
          </View>
        ))}
      </View>
    </View>
  );
}
