/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import {
  Text as DefaultText,
  useColorScheme,
  TouchableOpacity,
  View as DefaultView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

import Colors from "../constants/Colors";
import { useTheme } from "../context/ThemeProvider";
import { useEffect } from "react";

//  type TextProps = {
//   children: React.ReactNode;
//   style?: any; // Use 'any' type for style prop
//   variant?: "light" | "regular" | "semibold";
//   lightColor?: string;
//   darkColor?: string;
//   inverse?: boolean;
// }
type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
  inverse?: boolean
};

export type TextProps = ThemeProps & DefaultText["props"];
export type ViewProps = ThemeProps & DefaultView["props"];

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme() ?? "light";
  const colorFromProps = props[theme];
  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

export function CustomText(props: TextProps) {
  const { style, lightColor, darkColor, inverse, ...otherProps } = props;

  // Determine the text color based on the theme and the inverse prop
  const color = inverse
    ? useThemeColor({ light: darkColor, dark: lightColor }, "text")
    : useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return (
    <DefaultText style={[{ color }, style]} {...otherProps} />
  );
}


export function CustomView(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return (
    <DefaultView
      style={[
        {
          backgroundColor,
          padding: 20,
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        },
        style,
      ]}

      {...otherProps}
    />
  );
}
export function Logo() {
  return (
    <CustomText
      style={{
        // Valid - Color should be in quotes
        fontSize: 24, // Valid - Font size is a number
        fontFamily: "Josefin Sans", // Valid - Font family should be in quotes
        fontWeight: "400", // Valid - Font weight should be in quotes
        wordWrap: "break-word",
        textShadowColor: "white",
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 5,
      }}
    >
      Valid
    </CustomText>
  );
}
export function CustomButton({
  text,
  onPress,
  inverse,
  style,
  variant,
  load,
  disabled,
  icon, // Add the icon prop
  position = "start", // Add the position prop with a default value
}: {
  text?: string;
  onPress?: () => void;
  style?: any;
  inverse?: boolean;
  variant?: string;
  disabled?: boolean;
  load?: boolean;
  icon?: React.ReactNode; // Define the icon prop as a ReactNode
  position?: "start" | "end"; // Define the position prop with "start" or "end"
}) {
  const { isDarkMode, color } = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: Colors[color].text },
        style,
        // icon && { gap: 20 },
      ]}
      onPress={disabled ? undefined : onPress}
    >
      {load ? (
        <ActivityIndicator color={Colors[color].background} />
      ) : (
        <>
          {position === "start" && icon && icon}
          <DefaultText
            style={{ color: Colors[color].background, fontWeight: "500" }}
          >
            {text}
          </DefaultText>
          {position === "end" && icon && icon}
        </>
      )}
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  text: {
    fontFamily: "regular", // Default to regular variant
  },
  light: {
    fontFamily: "light",
  },
  regular: {
    fontFamily: "regular",
  },
  semibold: {
    fontFamily: "semibold",
  },

  button: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    width: "100%",
    fontSize: 20,
  },
  input: {
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    width: "100%",
  },
});
