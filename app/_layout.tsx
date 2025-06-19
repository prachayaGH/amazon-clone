import React from "react";
import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import { TamaguiProvider } from "tamagui";
import { tamaguiConfig } from "../tamagui.config";
import "react-native-reanimated";
import Header from "../components/Shared/header/Header";

export default function RootLayout() {
  return (
    <TamaguiProvider config={tamaguiConfig}>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)"/>
        <Stack.Screen  name="login"
          options={{
            headerShown: true,
            header: (props) => <Header {...props} />,
            presentation: "fullScreenModal",
          }}
        />
      </Stack>
    </TamaguiProvider>
  );
}

