import { CustomText, TextProps } from "./Themed";

export function MonoText(props: TextProps) {
  return (
    <CustomText {...props} style={[props.style, { fontFamily: "SpaceMono" }]} />
  );
}
