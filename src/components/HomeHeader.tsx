import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { HStack, Heading, Icon, Text, VStack } from 'native-base';

import { useAuth } from '@hooks/useAuth';

import defaultUserPhotoImg from '@assets/userPhotoDefault.png';

import { UserPhoto } from './UserPhoto';

export function HomeHeader() {
  const { user, singOut } = useAuth();
  
  return (
    <HStack bg={'gray.400'} pt={16} pb={5} px={8} alignItems={'center'}>
      <UserPhoto
        mr={4}
        size={16}
        alt="Imagem do usuário"
        source={user.avatar ? { uri : user.avatar} : defaultUserPhotoImg}
      />

      <VStack flex={1}>
        <Text color="gray.100" fontSize={'md'}>
          Olá,
        </Text>

        <Heading color="gray.100" fontSize={'md'} fontFamily={"heading"}>
          {user.name}
        </Heading>
      </VStack>

      <TouchableOpacity onPress={singOut}>
        <Icon 
          size={7}
          name='logout'
          color='gray.200'
          as={MaterialIcons}
        />
      </TouchableOpacity>
    </HStack>
  );
}
