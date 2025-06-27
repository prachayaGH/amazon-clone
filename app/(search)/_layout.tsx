import { Stack } from "expo-router";
import Header, { StackHeaderProps } from "@/components/Shared/header/Header";

export default function SearchLayout() {
  return (
    <Stack
      screenOptions={{
        header: (props) => <Header {...props} />,
        headerSearchShow: true,
      } as StackHeaderProps["options"]}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="product/[id]/index" />
      <Stack.Screen name="product/3D" options={{ headerShown: false}}/>
      <Stack.Screen name="product/AR" options={{ headerShown: false}}/>
    </Stack>
  );
}
