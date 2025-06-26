import { router, useNavigation } from "expo-router";
import { ScrollView, YStack, Text } from "tamagui";
import React, { useEffect } from "react";
import { Alert } from "react-native";
import { HeaderTabsProps } from "@/components/Shared/header/HeaderTabs";
import { DeliveryLocation } from "@/components/Shared/DeliveryLocation";
import { HomeCarousel } from "@/components/Screens/home/HomeCarousel";
import { HomeSuggestions } from "@/components/Screens/home/HomeSuggestions";
import DefaultButton from "@/components/DefaultButton";


export default function Home() {
  const navigation = useNavigation();
  const IS_LOGGED_IN = false;

  const onClickAuth = () => router.push("/login")

  const tabs: HeaderTabsProps["tabs"] = [
    {
      active: true,
      title: "Prachaya Lists",
      onPress: () => Alert.alert("Prachaya Lists"),
    },
    {
      title: "Prime",
      onPress: () => Alert.alert("Prime"),
    //   active: false,
    },
    {
      title: "Video",
      onPress: () => Alert.alert("Video"),
    //   active: false,
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
    <>
      <ScrollView 
      f={1}
      >
        <DeliveryLocation />
        <HomeCarousel />
        <HomeSuggestions />
        <YStack
          bg={"white"}
          w="100%"
          p={20}
          gap={20}
        >
          <Text als={"flex-start"} fos={20} fow={"bold"}>
            {IS_LOGGED_IN ? "Deals for you" : "Sign in for your best experience"}
          </Text>
            {IS_LOGGED_IN ? (
              <>
              {/* TODO: Lists of Deals */}
              </>
            ) : (
              <>
              {/* TODO: Lists of Deals */}
              <DefaultButton onPress={onClickAuth} >
                Sign in Securely
              </DefaultButton>
              </>
            )}
        </YStack>
      </ScrollView>
    </>
  );
}
