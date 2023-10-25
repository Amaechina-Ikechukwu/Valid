import React, { useState, useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { CustomButton, CustomText } from "../components/Themed";
import Colors from "./Colors";
import { useTheme } from "../context/ThemeProvider";

export default function NormalLoader({ onRetry, delay = 7000, data, loading, type }: { onRetry: () => void; delay?: number; data?: any[] | null, loading?: boolean, type?: string }) {
    const [showRetryButton, setShowRetryButton] = useState(loading);
    const { color } = useTheme();

    const tryAgain = () => {
        setShowRetryButton(true);
        onRetry?.();
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowRetryButton(false);
        }, delay);

        return () => clearTimeout(timer);
    }, [delay, showRetryButton]);

    return (
        < View style={{ backgroundColor: Colors[color].background }}>
            {!showRetryButton ? (
                <View style={{ backgroundColor: Colors[color].background, flex: 1, alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                    {data && data.length === 0 ? (
                        <CustomText style={{ color: Colors[color].tabIconDefault }}>{`No ${type}`}</CustomText>
                    ) : (
                        <CustomButton text="Retry" onPress={tryAgain} />
                    )}
                </View>
            ) : (
                <CustomText style={{ color: Colors[color].tabIconDefault }}>Loading...</CustomText>
            )}
        </View>
    );
}
