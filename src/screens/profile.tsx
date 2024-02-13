import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import {
  Center,
  Heading,
  ScrollView,
  Skeleton,
  Text,
  VStack,
} from 'native-base';

import { ScreenHeader } from '@components/ScreenHeader';
import { UserPhoto } from '@components/UserPhoto';
import { TouchableOpacity } from 'react-native';
import { Input } from '@components/Input';
import { Button } from '@components/Button';

const PHOTO_SIZE = 33;

export function Profile() {
  const [photoIsLoading, setPhotoIsLoading] = useState(false);

  async function handleUserPhotoSelect () { 
    await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      aspect: [4,4],
      allowsEditing: true,
    });
  }

  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />

      <ScrollView contentContainerStyle={{ paddingBottom: 36}}>
        <Center mt={6} px={10}>
          {photoIsLoading ? (
            <Skeleton
              w={PHOTO_SIZE}
              h={PHOTO_SIZE}
              rounded={'full'}
              endColor={'gray.400'}
              startColor={'gray.500'}
            />
          ) : (
            <UserPhoto
              size={PHOTO_SIZE}
              alt="Imagem do usuário"
              source={{ uri: 'http://github.com/leonardorodriguess.png' }}
            />
          )}

          <TouchableOpacity onPress={handleUserPhotoSelect}>
            <Text
              color="green.500"
              fontWeight={'bold'}
              fontSize={'md'}
              mt={2}
              mb={8}
            >
              Alterar foto
            </Text>
          </TouchableOpacity>

          <Input bg={'gray.600'} placeholder="Nome" />
          <Input
            bg={'gray.600'}
            placeholder="E-mail"
            isDisabled
            value="leo-feitosa@live.com "
          />
        </Center>

        <VStack px={10} mt={12} mb={9}>
          <Heading color={'gray.200'} fontSize={'md'} mb={2}>
            Alterar senha
          </Heading>

          <Input bg="gray.600" placeholder="Senha antiga" secureTextEntry />
          <Input bg="gray.600" placeholder="Nova senha" secureTextEntry />
          <Input bg="gray.600" placeholder="Confirme nova senha" secureTextEntry />    

          <Button 
            title="Atualizar"
            mt={4}
          />      
        </VStack>
      </ScrollView>
    </VStack>
  );
}
