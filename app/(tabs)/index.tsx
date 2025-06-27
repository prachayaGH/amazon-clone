import { router, useNavigation } from "expo-router";
import { ScrollView, YStack, XStack, Text, Spinner } from "tamagui";
import React, { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";
import { HeaderTabsProps } from "@/components/Shared/header/HeaderTabs";
import { DeliveryLocation } from "@/components/Shared/DeliveryLocation";
import { HomeCarousel } from "@/components/Screens/home/HomeCarousel";
import { HomeSuggestions } from "@/components/Screens/home/HomeSuggestions";
import DefaultButton from "@/components/DefaultButton";
import { useAuth } from "@/context/AuthProvider";
import { supabase } from "@/supabase";
import { ProductDealCard } from "@/components/Screens/home/ProductDealsCard";
import { Product } from "@/types/product";

export default function Home() {
  const { session, isLoading } = useAuth();
  const navigation = useNavigation();
  
  const [deals, setDeals] = useState<Product[]>([])

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
      active: false,
    },
    {
      title: "Video",
      onPress: () => Alert.alert("Video"),
      active: false,
    },
  ];

  const onProductPress = ({ id }: Product) => {
    router.push(`/product/${id}`)
  }

  const getDeals = useCallback(async() => {
    try {
      const { data = [] } = await supabase.from("products").select("*")
      setDeals(data as Product[]);
    } catch (error) {
      console.log('error', error)
    }
  }, [])

  useEffect(() => {
    if (navigation) {
    navigation.setOptions({
      headerSearchShow: true,
      headerTabsProps: {
        tabs,
      },
    });
  }

  getDeals();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation.setOptions, isLoading]);

  if (isLoading) {
    return (
      <YStack f={1} ai="center" jc="center">
        <Spinner size="large" />
      </YStack>
    );
  }

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
            {session ? "Deals for you" : "Sign in for your best experience"}
          </Text>
            {session ? (
              <>
              {/* TODO: Lists of Deals */}
              <XStack gap={30} jc={"space-between"} fw={"wrap"}>
                {deals.map((product) => (
                  <ProductDealCard 
                  key={product.id}
                  product={product}
                  onPress={() => onProductPress(product)}
                  />
                ))}
              </XStack>
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
