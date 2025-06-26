import { Text, XStack, YStack } from "tamagui";
import { Tabs } from "expo-router";
import MCIcon from "@expo/vector-icons/MaterialCommunityIcons";
import Header from "@/components/Shared/header/Header";

interface Tab {
  name: string;
  icon: "home-outline" | "account-outline" | "cart-check";
}

export default function TabsLayout() {
  const tabs: Tab[] = [
    {
      name: "index",
      icon: "home-outline",
    },
    {
      name: "profile",
      icon: "account-outline",
    },
    {
      name: "cart",
      icon: "cart-check",
    },
  ];

  return (
    <Tabs>
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            tabBarStyle: {
              borderTopWidth: 1,
              borderTopColor: "Lightgray",
            },
            // TODO: custome header
            header: (props) => <Header {...props} />,
            tabBarLabel: () => null,
            tabBarIcon: ({ focused }: { focused: boolean }) => (
              <YStack
                style={{
                  flex: 1,
                  marginTop: -5,
                  gap: 10,
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <XStack
                  w={50}
                  h={4}
                  style={{
                    borderRadius: 20,
                    backgroundColor: focused ? "#238db0" : "$colorTransparent",
                  }}
                />
                {/* TODO: Add icon */}
                <MCIcon
                  type="MaterialCommunityIcons"
                  name={tab.icon}
                  size={30}
                  color={focused ? "#238db0" : "$black"}
                />
                {/* TODO: Items.length */}
                {tab.name === "cart" && (
                  <Text
                    px={4}
                    style={{
                      borderRadius: 10,
                      position: "absolute",
                      top: 11,
                      fontWeight: "bold",
                      fontSize: 12,
                      color: focused ? "#238db0" : "black",
                    }}
                    bg={"white"}
                  >
                    3
                  </Text>
                )}
              </YStack>
            ),
          }}
        ></Tabs.Screen>
      ))}
    </Tabs>
  );
}
