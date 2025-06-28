import { supabase } from "@/supabase";
import { useLocalSearchParams, router } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  Image,
  XStack,
  Button,
  YStack,
  Dialog,
  View,
} from "tamagui";
import MCIcon from "@expo/vector-icons/MaterialCommunityIcons";
import { offPercentage } from "@/utils/number";
import PRIME from "@/assets/prime-label.png";
import { deliveryDate } from "@/utils/date";
import { Product } from "@/types/product";
import DefaultButton from "@/components/DefaultButton";
import { FlatList } from "react-native";
import { useCart } from "@/context/CartProvider";

export default function ProductScreen() {
  const { addItem } = useCart();
  const { id } = useLocalSearchParams();

  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectOpen, setSelectOpen] = useState(false);

  const fetchProducts = useCallback(async () => {
    try {
      const { data = null } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (!data) router.back();
      setProduct(data);
    } catch (error) {
      console.log("error", error);
    }
  }, [id]);

  const onViewType = (viewType: "3D" | "AR") => {
    router.push(`/product/${viewType}?modelUrl=${product?.model3DUrl}`);
  };

  const onSelectQuantity = (num: number) => {
    setQuantity(num);
    setSelectOpen(false);
  };

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (!product) return null;

  return (
    <>
      <ScrollView f={1} gap={20} bg={"white"} p={20}>
        <Text col={"gray"}>{product.name}</Text>
        <Image
          source={{ uri: product.imageUrl ?? "" }}
          h={300}
          objectFit="contain"
        />
        <XStack jc={"space-between"} my={20}>
          {product.model3DUrl && (
            <>
              {["3D", "AR"].map((viewType, index) => (
                <Button
                  key={viewType} // ใช้สตริง “3D” / “AR” ไม่ซ้ำแน่นอน
                  bw={1}
                  br={50}
                  style={{ borderColor: "#0e4db3" }}
                  variant="outlined"
                  textProps={{ col: "#0e4db3", fos: 13 }}
                  onPress={() => onViewType(viewType as "3D" | "AR")}
                >
                  <MCIcon
                    name="arrow-u-left-bottom"
                    size={20}
                    color="#0e4db3"
                  />
                  {viewType === "3D" ? "VIEW IN 3D" : "VIEW IN YOUR ROOM"}
                </Button>
              ))}
            </>
          )}
        </XStack>
        <XStack ai={"center"} gap={10}>
          {product.previousPrice > product.currentPrice && (
            <Text fos={30} col={"red"}>
              -{offPercentage(product.currentPrice, product.previousPrice)}%
            </Text>
          )}
          <Text fos={30}>
            <Text fos={20}>$</Text>
            {product.currentPrice}
          </Text>
        </XStack>
        <Text mb={20} col={"gray"} fos={14} textDecorationLine="line-through">
          RRP: ${product.previousPrice}
        </Text>
        {product.isAmazonChoice && <Image source={PRIME} h={30} w={70} />}
        <Text>
          The prices of products sold on Amazon include VAT. Depending on your
          delivery address, VAT may vary at the checkout. For more information
          click somewhere.
        </Text>
        <XStack my={20}>
          <Text>
            {product.deliveryPrice === 0 ? "FREE" : `$${product.deliveryPrice}`}
            {" Delivery "}
          </Text>
          <Text fow={"bold"}>{deliveryDate(product.deliveryInDays)}</Text>
        </XStack>
        <YStack gap={20} mb={30}>
          {product.amountInStock > 20 ? (
            <Text fos={20} col={"green"}>
              In Stock
            </Text>
          ) : (
            <Text fos={20} col={"red"}>
              {product.amountInStock} In Stock
            </Text>
          )}
          <Button onPress={() => setSelectOpen((prev) => !prev)}>
            <Text mr={"auto"}>Quantity: {quantity}</Text>
            <MCIcon name="chevron-down" size={20} />
          </Button>
          <DefaultButton
            onPress={() => {
              // TODO: Add to basket
              addItem(product, quantity);
            }}
          >
            Add to basket
          </DefaultButton>
          <DefaultButton
            bg={"#FF8C00"}
            onPress={() => {
              // TODO: Add to basket
            }}
          >
            Buy Now
          </DefaultButton>
        </YStack>
      </ScrollView>
      <Dialog open={selectOpen}>
        <Dialog.Portal key={"select-quantity"}>
          <Dialog.Overlay
            opacity={20}
            bg="rgba(0, 0, 0, 0.27)"
            onPress={() => setSelectOpen(false)}
          ></Dialog.Overlay>
          <Dialog.Content gap={10} w={"60%"}>
            <FlatList
              data={[1, 2, 3, 4, 5]}
              keyExtractor={(_, index) => index.toString()}
              ItemSeparatorComponent={() => <View h={10} />}
              renderItem={({ item: num }) => (
                <Button onPress={() => onSelectQuantity(num)}>
                  {num.toString()}
                </Button>
              )}
            />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog>
    </>
  );
}
