import React from "react";
import FloatingBackButton from "@/components/Shared/FloatingBackButton";
import { router, useLocalSearchParams } from "expo-router";
// import { ViroARSceneNavigator } from "@reactvision/react-viro"

// ViroMaterials.createMaterials({

// })

// function Scene({ modelUrl }: { modelUrl: string }) {
//     return (
//     <ViroARScene>
//         <ViroAmbientLight color="white" />
//         <ViroQuad 
//         position={[0,0,0]}
//         width={1}
//         height={1}
//         rotation={[-90,0,0]}

//         />
//     </ViroARScene>
//     )
// }

export default function ProductARScreen() {
  const { modelUrl } = useLocalSearchParams<{ modelUrl: string }>();

  return (
    <>
      <FloatingBackButton onPress={router.back} />
      {/* <ViroARSceneNavigator initialScence={{ scene: () => <Scene modelUrl={modelUrl} /> }} /> */}
    </>
  );
}
