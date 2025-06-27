import { ScrollView, YStack, Text, Image, Spinner, Sheet, Button, XStack, Avatar } from "tamagui";
import React, { useEffect, useState } from "react";
import DefaultButton from "@/components/DefaultButton";
import { router, useNavigation } from "expo-router";
import ProfileUnauthedBanner from "@/components/Screens/profile/ProfileUnauthedBanner";
import AmazonLogo from "@/assets/amazon-logo.png"
import { useAuth } from "@/context/AuthProvider";
import { supabase } from "@/supabase";
import { Pressable } from "react-native";
import Icon from "@expo/vector-icons/Ionicons"

export default function Profile() {
  const { session, isLoading } = useAuth();
  const navigation = useNavigation();
  const [sheetOpen, setSheetOpen] = useState(false)

  const onClickAuth = () => router.push("/login");

  const signOut = async() => {
    await supabase.auth.signOut()
    setSheetOpen(false)
    router.replace("/(tabs)")
  }

  useEffect(() => {
    navigation.setOptions({
      headerSearchShow: Boolean(session),
      headerLeft: !session ? 
      () => <Image source={AmazonLogo} w={100} h={30} />
        : null
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation.setOptions, session, isLoading]);

  if (isLoading) {
      return (
        <YStack f={1} ai="center" jc="center">
          <Spinner size="large" />
        </YStack>
      );
    }

  return (
    <>
      <ScrollView bg={"white"}>
        {session ? (
          <XStack jc="space-between" p={20} gap={20}>
            <Pressable
              onPress={() => setSheetOpen(prev => !prev)}
            >
              <XStack jc="flex-start" ai={"center"} gap={10}>
                <Avatar circular size={30}>
                <Avatar.Fallback bg={"gray"}/>
                </Avatar>
                <Text fos={18}>
                  Helo, {session?.user.email}
                </Text>
                <Icon name="chevron-down" size={20} />
              </XStack>
            </Pressable>
            <XStack gap={25} jc="flex-end" ai={"center"}>
              <Icon name="settings-outline" size={20} />
              <Icon name="search-sharp" size={20} />
            </XStack>
          </XStack>
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

      <Sheet 
        open={sheetOpen}
        onOpenChange={(open: boolean) => setSheetOpen(open)}
        >
          <Sheet.Overlay opacity={20} bg="rgba(0, 0, 0, 0.27)"/>
          <Sheet.Handle bg="rgba(255, 255, 255, 0.66)"/>
          <Sheet.Frame p={20} gap={20}>
            <Text>{session?.user.email}</Text>
            <Button textProps={{ fos: 18 }} bg={"pink"} onPress={signOut}>
              Logout
            </Button>
          </Sheet.Frame>
      </Sheet>
    </>
  );
}
