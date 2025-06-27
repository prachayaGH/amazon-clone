import { useLocalSearchParams, router } from "expo-router";
import { YStack, Text } from "tamagui";
import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/supabase";
import { Product } from "@/types/product";
import { FlatList } from "react-native";
import { ProductCardResult } from "@/components/Screens/search/ProductCardResult";

export default function SearchScreen() {
  const { query } = useLocalSearchParams();
  const [products, setProducts] = useState<Product[]>([]);

  const getProducts = useCallback(async () => {
    if (!query) return setProducts([]);

    try {
      const { data = [] } = await supabase
        .from("products")
        .select("*")
        .ilike("name", `%${query}%`);
      setProducts(data as Product[]);
    } catch (error) {
      console.log("error", error);
    }
  }, [query]);

  const onProductPress = ({ id }: Product) => {
      router.push(`/product/${id}`)
    }

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <YStack f={1} bg={"white"}>
      <FlatList
      data={products}
      style={{ padding: 20}}
      keyExtractor={(item) => item.id.toString()}
      ItemSeparatorComponent={() => <YStack h={10}/>}
      ListEmptyComponent={<Text>No Products found</Text>}
      renderItem={({ item: product }) => (
        <ProductCardResult
        product={product}
        onPress={() => onProductPress(product)}
        />
      )}
      />
    </YStack>
  );
}
