import { ScrollView, YStack, Text, Image } from "tamagui";
import React, { useEffect } from "react";
import DefaultButton from "@/components/DefaultButton";
import { router, useNavigation } from "expo-router";
import ProfileUnauthedBanner from "@/components/Screens/profile/ProfileUnauthedBanner";
import AmazonLogo from "@/assets/amazon-logo.png"

export default function Profile() {
  const navigation = useNavigation();
  const IS_LOGGED_IN = false;
  const onClickAuth = () => router.push("/login");

  useEffect(() => {
    navigation.setOptions({
      headerSearchShow: IS_LOGGED_IN,
      headerLeft: () => (
        !IS_LOGGED_IN ?
        <Image source={AmazonLogo} w={100} h={30} />
        : null
      )
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation.setOptions]);

  return (
    <>
      <ScrollView bg={"white"}>
        {IS_LOGGED_IN ? (
          <>{/* TODO: */}</>
        ) : (
          <YStack f={1} pt={40} ai={"center"} gap={45}>
            <YStack w={"100%"} jc={"center"} ai={"center"} gap={40}>
              <Text ta={"center"} fos={24}>
                Sign in for optimal experience
              </Text>
              <YStack w={"90%"} gap={15}>
                <DefaultButton onPress={onClickAuth}>Sign In</DefaultButton>
                <DefaultButton onPress={onClickAuth} variant="secondary">
                  Create Account
                </DefaultButton>
              </YStack>
            </YStack>
            <ProfileUnauthedBanner />
          </YStack>
        )}
      </ScrollView>
    </>
  );
}
