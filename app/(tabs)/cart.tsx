import { DeliveryLocation } from "@/components/Shared/DeliveryLocation";
import { ScrollView, Text, YStack, Image } from "tamagui";
import React, { useEffect } from "react";
import { router, useNavigation } from "expo-router";
import { HeaderTabsProps } from "@/components/Shared/header/HeaderTabs";
import { Alert } from "react-native";
import DefaultButton from "@/components/DefaultButton";

export default function Cart() {
  const navigation = useNavigation();
  const IS_LOGGED_IN = false;
  const onClickAuth = () => router.push("/login");

  const tabs: HeaderTabsProps["tabs"] = [
    {
      active: true,
      title: "Basket",
      onPress: () => Alert.alert("Basket"),
    },
  ];

  useEffect(() => {
    navigation.setOptions({
      headerSearchShow: true,
      headerTabsProps: {
        tabs,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation.setOptions]);

  return (
    <ScrollView f={1} bg={"white"} contentContainerStyle={{ pb: 20 }}>
      <DeliveryLocation />
      <YStack f={1} jc={"center"} ai={"center"} gap={20} px={20}>
        <>
          <Image source={require("@/assets/empty-cart.png")} w={300} h={200} />
          <Text fow={"bold"} fos={26}>
            Your Amazon Cart is empty
          </Text>
          <Text col={"gray"} fos={18}>
            Good stuff goes here
          </Text>
        </>

        {!IS_LOGGED_IN && (
          <YStack w={"100%"} gap={15} mt={20}>
            <DefaultButton onPress={onClickAuth}>Sign In</DefaultButton>
            <DefaultButton onPress={onClickAuth} variant="secondary">
              Create Account
            </DefaultButton>
          </YStack>
        )}
      </YStack>
    </ScrollView>
  );
}
