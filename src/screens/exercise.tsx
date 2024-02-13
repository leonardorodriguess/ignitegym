import { HStack, Heading, Icon, Image, Text, VStack } from 'native-base';
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { AppNavigatorRoutesProps } from '@routes/app.routes';

import BodySvg from '@assets/body.svg';

export function Exercise() {
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <VStack flex={1}>
      <VStack px={8} bg="gray.600" pt={12}>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon as={Feather} name="arrow-left" color="green.500" size={6} />
        </TouchableOpacity>

        <HStack
          mt={4}
          mb={8}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <Heading color="gray.100" fontSize="lg" flexShrink={1}>
            Puxador frontal
          </Heading>

          <HStack alignItems={'center'}>
            <BodySvg />
            <Text color="gray.200" ml={1} textTransform={'capitalize'}>
              Costas
            </Text>
          </HStack>
        </HStack>
      </VStack>

      <VStack p={8}>
        <Image
          mb={3}
          w="full"
          h={80}
          rounded={"lg"}
          overflow={"hidden"}
          resizeMode={'cover'}
          source={{
            uri: 'https://www.treinus.com.br/blog/wp-content/uploads/2020/05/tipos-de-exercicios-f%C3%ADsicos.jpg',
          }}
          alt="Nome do exercício"
        />
      </VStack>
    </VStack>
  );
}
