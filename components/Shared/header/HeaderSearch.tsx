import Icon from "@expo/vector-icons/Ionicons";
import { router, useSegments } from "expo-router";
import { useRef, useState } from "react";
import { Pressable, View, TextInput } from "react-native";
import { Input, XStack } from "tamagui";
import { useDebouncedCallback } from "@/hooks/useDebouncedCallback";

export default function HeaderSearch() {
  const segments = useSegments();
  const [query, setQuery] = useState("");
  const ref = useRef<Input>(null);

  const onPressIn = () => {
    router.push("/(search)");
  };

  // TODO: When pressing back button, reset setQuery to empty string
  const onGoBack = () => {
    setQuery("");
    router.dismissAll();
  };
  // TODO: debounce the search products
  useDebouncedCallback(() => {
    if (query) router.setParams({ query });
    if (segments.length === 1 && segments[0] === "(search)") {
      ref.current?.focus();
    }
  }, [query], 500);

  return (
    <XStack px={20} jc={"center"} ai={"center"} gap={10}>
      {segments[0] === "(search)" && (
        <Pressable onPress={onGoBack}>
          <Icon name="arrow-back" color={"black"} size={24} />
        </Pressable>
      )}
      <View
        style={{
          backgroundColor: "white", // เปลี่ยนสีตรงนี้เพื่อทดสอบ
          flex: 9,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          borderWidth: 1,
          borderColor: "#a4a5a6",
          borderRadius: 8,
          paddingHorizontal: 12,
          shadowColor: "gray",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.4,
          shadowRadius: 4,
          elevation: 4,
        }}
      >
        <Icon name="search" color={"black"} size={24} />
        <TextInput
          ref={ref}
          value={query}
          onPressIn={onPressIn}
          onChangeText={setQuery}
          readOnly={segments[0] !== "(search)"}
          style={{
            flex: 1,
            backgroundColor: "transparent",
            fontWeight: "400",
            fontSize: 16,
            paddingHorizontal: 8,
            marginHorizontal: 8,
            color: "black",
          }}
          placeholder="Search Amazon"
          placeholderTextColor="#a4a5a6"
        />
        {segments[0] !== "(search)" && (
          <Pressable
            onPress={onPressIn}
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 1,
            }}
          />
        )}
        <Icon name="scan" color={"black"} size={24} />
      </View>
    </XStack>
  );
}
