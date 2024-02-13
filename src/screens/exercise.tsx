import {
  Box,
  HStack,
  Heading,
  Icon,
  Image,
  Text,
  VStack,
  ScrollView,
} from 'native-base';
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { AppNavigatorRoutesProps } from '@routes/app.routes';

import BodySvg from '@assets/body.svg';
import SeriesSvg from '@assets/series.svg';
import RepetitionsSvg from 'assets/repetitions.svg';
import { Button } from '@components/Button';

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
          <Heading color="gray.100" fontSize="lg" flexShrink={1} fontFamily={"heading"}>
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

      <ScrollView>
        <VStack p={8}>
          <Image
            mb={3}
            w="full"
            h={80}
            rounded={'lg'}
            overflow={'hidden'}
            resizeMode={'cover'}
            source={{
              uri: 'https://www.treinus.com.br/blog/wp-content/uploads/2020/05/tipos-de-exercicios-f%C3%ADsicos.jpg',
            }}
            alt="Nome do exercício"
          />

          <Box bg={'gray.600'} rounded={'md'} pb={4} px={4}>
            <HStack
              alignItems={'center'}
              justifyContent={'space-around'}
              mb={6}
              mt={5}
            >
              <HStack>
                <SeriesSvg />
                <Text color="gray.200" ml="2">
                  3 séries
                </Text>
              </HStack>

              <HStack>
                <SeriesSvg />
                <Text color="gray.200" ml="2">
                  12 repetições
                </Text>
              </HStack>
            </HStack>

            <Button title="Marcar como realizado" />
          </Box>
        </VStack>
      </ScrollView>
    </VStack>
  );
}
