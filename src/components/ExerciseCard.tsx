import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { HStack, Heading, Image, Text, VStack, Icon} from 'native-base';
import { Entypo } from '@expo/vector-icons';

type Props = TouchableOpacityProps & {};

export function ExerciseCard({ ...rest }: Props) {
  return (
    <TouchableOpacity {...rest}>
      <HStack
        p={2}
        pr={4}
        mb={3}
        bg="gray.500"
        rounded={'md'}
        alignItems={'center'}
      >
        <Image
          w={16}
          h={16}
          mr={4}
          rounded={'md'}
          resizeMode={'center'}
          alt="Imagem do exercício"
          source={{
            uri: 'https://www.treinus.com.br/blog/wp-content/uploads/2020/05/tipos-de-exercicios-f%C3%ADsicos.jpg',
          }}
        />

        <VStack flex={1}>
          <Heading fontSize={'lg'} color={'white'}>
            Remada unilateral
          </Heading>
          <Text fontSize={'sm'} color={'gray.200'} mt={1} numberOfLines={2}>
            3 séries x 12 repetições
          </Text>
        </VStack>
      
        <Icon 
          as={Entypo}
          name="chevron-thin-right"
          color="gray.300"
        />
      </HStack>
    </TouchableOpacity>
  );
}
