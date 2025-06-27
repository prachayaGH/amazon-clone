import { Pressable } from "react-native";
import { XStack, Image, YStack, Text } from "tamagui";
import PRIME from "@/assets/prime-label.png";
import { deliveryDate } from "@/utils/date";
import DefaultButton from "@/components/DefaultButton";
import { useCart } from "@/context/CartProvider";
import React from "react";

interface Props {
  product: any;
  onPress: VoidFunction;
}

export function ProductCardResult({ product, onPress }: Props) {
  const { addItem } = useCart()
  return (
    <Pressable onPress={onPress}>
      <XStack h={300} br={6} bw={1} style={{ borderColor: "#E0E0E0" }}>
        <Image
          src={product.imageUrl ?? ""}
          objectFit="contain"
          w={"35%"}
          h={"100%"}
          bg={"#E5E5E5"}
          bblr={5}
          btlr={5}
          p={10}
        />
        <YStack w={"65%"} p={20} gap={10}>
          <Text numberOfLines={4} ellipsizeMode="tail">
            {product.name}
          </Text>
          <Text fos={24}>${product.currentPrice}</Text>
          {product.isAmazonChoice && <Image source={PRIME} h={30} w={70} />}
          <XStack>
            <Text>
              {product.deliveryPrice === 0
                ? "FREE"
                : `$${product.deliveryPrice}`}
              {" Delivery "}
            </Text>
            <Text fow={"bold"}>{deliveryDate(product.deliveryInDays)}</Text>
          </XStack>
          <DefaultButton
            mt={"auto"}
            h={40}
            textProps={{ fos: 14 }}
            onPress={() => {
                addItem(product)
            }}
          >
            Add to basket
          </DefaultButton>
        </YStack>
      </XStack>
    </Pressable>
  );
}
