import { useState } from 'react';
import { Center, ScrollView, Skeleton, Text, VStack } from 'native-base';

import { ScreenHeader } from '@components/ScreenHeader';
import { UserPhoto } from '@components/UserPhoto';
import { TouchableOpacity } from 'react-native';

const PHOTO_SIZE = 33;

export function Profile() {
  const [photoIsLoading, setPhotoIsLoading] = useState(false);

  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />

      <ScrollView>
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

          <TouchableOpacity>
            <Text color="green.500" fontWeight={"bold"} fontSize={"md"} mt={2} mb={8}>
              Alterar foto
            </Text>
          </TouchableOpacity>
        </Center>
      </ScrollView>
    </VStack>
  );
}
