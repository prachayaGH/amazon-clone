import { Form, Label, Text, YStack, XStack, Input, Checkbox } from "tamagui";
import { router, useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { Dimensions, Pressable } from "react-native";
import Icon from "@expo/vector-icons/Ionicons";
import DefaultButton from "@/components/DefaultButton";

enum Step {
  "EMAIL" = 1,
  "PASSWORD" = 2,
}

export default function Login() {
  const navigation = useNavigation();

  const [step, setStep] = useState(Step.EMAIL);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const onGoBack = () => router.back();

  function register() {}
  function login() {}

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Pressable onPress={onGoBack}>
          <Text fos={18}>Back</Text>
        </Pressable>
      ),
      headerTitle: () => (
        <Text fos={18} fow="bold">
          Amazon.com
        </Text>
      ),
    });
  }, [navigation.setOptions]);

  return (
    <YStack f={1} ai={"center"} p={20} gap={20} bg={"white"}>
      <Text als={"flex-start"} fos={20} fow={"bold"}>
        Sign in {step === Step.EMAIL && "or create an account"}
      </Text>

      <Form w={"100%"} gap={20}>
        {step === Step.EMAIL ? (
          <Label als={"flex-start"} fos={16} fow={"bold"}>
            Enter Email
          </Label>
        ) : (
          <XStack gap={10} ai={"center"}>
            <Text fow={"bold"} fos={16}>
              {email}
            </Text>
            <Pressable onPress={() => setStep(Step.EMAIL)}>
              <Text fos={16} textDecorationLine="underline" col={"#146eb4"}>
                Change
              </Text>
            </Pressable>
          </XStack>
        )}
        {step === Step.EMAIL ? (
          <Input
            value={email}
            onChangeText={setEmail}
            br={4}
            bc={"#D3D3D3"}
            placeholder="Email"
            autoCapitalize="none"
            autoCorrect={false}
          />
        ) : (
          <>
            <Input
              value={password}
              onChangeText={setPassword}
              br={4}
              bc={"#D3D3D3"}
              placeholder="Password"
              secureTextEntry={!showPassword}
            />
            <XStack ai={"center"} gap={10}>
              <Checkbox
                checked={showPassword}
                bc={"#D3D3D3"}
                onCheckedChange={(checked) => {
                  if (typeof checked === "boolean") {
                    setShowPassword(checked);
                  }
                }}
              >
                {showPassword && (
                  <Checkbox.Indicator>
                    <Icon name="checkmark" color={"orange"} />
                  </Checkbox.Indicator>
                )}
              </Checkbox>
              <Text>Show Password</Text>
            </XStack>
          </>
        )}
      </Form>

      <DefaultButton
        w={"100%"}
        disabled={email.length < 5}
        disabledStyle={{ opacity: 0.5 }}
        onPress={() => {
          if (step === Step.EMAIL) {
            setStep(Step.PASSWORD);
          } else login();
        }}
      >
        {step === Step.EMAIL ? "countinue" : "Sign In"}
      </DefaultButton>

      <XStack w={"100%"} ai={"center"} jc={"center"}>
        <Text>By countinuing, you agree to Amazon's </Text>
        <Text textDecorationLine="underline" col={"#146eb4"}>
          Conditions
        </Text>
      </XStack>

      <XStack mt={10} h={3} bg={"#D3D3D3"} w={Dimensions.get("window").width} />

      <YStack gap={20}>
        <XStack gap={20}>
          {["Conditions of use", "Priacy Notice", "Help"].map((link,index) => (
            <Text
              key={index}
              fos={16}
              textDecorationLine="underline"
              col={"#146eb4"}
            >{link}</Text>
          ))}
        </XStack>
        <Text fos={14}>
         ©️ 1996-2021, Amazon.com, Inc. or its affiliates.
        </Text>
      </YStack>
    </YStack>
  );
}
