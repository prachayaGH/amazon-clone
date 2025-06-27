import React from "react";
import { Product } from "@/types/product";
import { useCart } from "@/context/CartProvider";
import { XStack, YStack, Image, Text, Button } from "tamagui";
import PRIME from "@/assets/prime-label.png";
import MCIcon from "@expo/vector-icons/MaterialCommunityIcons";

interface Props {
  product: Product;
  quantity: number;
}

export default function ProductCart({ product, quantity }: Product) {
  const { addItem, removeItem } = useCart();

  return (
    <YStack gap={10}>
      <XStack bg={"#F5F5F5"} minHeight={200} minWidth="90%">
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
          </XStack>
        </YStack>
      </XStack>
      <XStack gap={20}>
        <Button
        w={100}
        br={50}
        bw={3}
        style={{ borderColor: "#FFD700" }}
        onPress={() => addItem(product)}
        >
            <Text mr={"auto"} fow={"bold"}>
                {quantity.toString()}
            </Text>
            <MCIcon name="plus" size={24}/>
        </Button>
        <Button
        br={50}
        bw={1}
        bg={"white"}
        style={{ borderColor: "gray" }}
        onPress={() => removeItem(product)}
        >
            Delete
        </Button>
      </XStack>
    </YStack>
  );
}
