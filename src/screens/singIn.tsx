import { useForm, Controller } from 'react-hook-form';
import {
  VStack,
  Image,
  Text,
  Center,
  Heading,
  ScrollView,
  useToast,
} from 'native-base';

import { AuthNavigatorRoutesProps } from '@routes/auth.routes';

import BackgroundImg from '@assets/background.png';
import LogoSvg from '@assets/logo.svg';

import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '@hooks/useAuth';
import { AppError } from '@utils/AppError';
import { useState } from 'react';

type FormData = {
  email: string;
  password: string;
};

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  
  const { singIn } = useAuth();
  const navigation = useNavigation<AuthNavigatorRoutesProps>();
  const toast = useToast();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  function handleNewAccount() {
    navigation.navigate('signUp');
  }

  async function handleSingIn({ email, password }: FormData) {
    try {
      setIsLoading(true);
      await singIn(email, password);
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError
        ? error.message
        : 'Não foi possível entrar. Tente novamente';

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} px={10}>
        <Image
          source={BackgroundImg}
          defaultSource={BackgroundImg}
          alt="Pessoas treinando"
          resizeMode="contain"
          position="absolute"
        />

        <Center my={24}>
          <LogoSvg />

          <Text color="gray.100" fontSize={'sm'}>
            Treine sua mente e o seu corpo
          </Text>
        </Center>

        <Center>
          <Heading
            color="gray.100"
            fontSize={'xl'}
            mb={6}
            fontFamily={'heading'}
          >
            Acesse sua conta
          </Heading>

          <Controller
            control={control}
            name="email"
            rules={{ required: 'Informe o e-mail' }}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Email"
                keyboardType="email-address"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.email?.message}
                autoCapitalize="none"
              />
            )}
          />

          <Controller
            control={control}
            name={'password'}
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                onChangeText={onChange}
                placeholder="Senha"
                errorMessage={errors.password?.message}
                secureTextEntry
              />
            )}
          />

          <Button title="Acessar" isLoading={isLoading} onPress={handleSubmit(handleSingIn)} />
        </Center>

        <Center mt={24}>
          <Text color="gray.100" fontSize={'sm'} mb={3} fontFamily={'body'}>
            Ainda não tem acesso?
          </Text>

          <Button
            title="Criar conta"
            variant={'outline'}
            onPress={handleNewAccount}
          />
        </Center>
      </VStack>
    </ScrollView>
  );
}
