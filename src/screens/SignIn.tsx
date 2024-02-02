import { VStack, Image } from "@gluestack-ui/themed";
import BackgroundImg from "@assets/background.png";

export function SignIn() {
  return (
    <VStack flex={1} bg="$coolGray100">
      <Image
        source={BackgroundImg}
        alt="Pessoas treinando"
        resizeMode="contain"
        size="full"

      />
    </VStack>
  );
}