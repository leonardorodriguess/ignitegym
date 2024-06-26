import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { VStack, Image, Text, Center, Heading, ScrollView, useToast } from 'native-base';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { api } from '@services/api';
import { useAuth } from '@hooks/useAuth';

import LogoSvg from '@assets/logo.svg';
import BackgroundImg from '@assets/background.png';

import { Input } from '@components/Input';
import { Button } from '@components/Button';

type FormDataProps = {
  name: string;
  email: string;
  password: string;
  password_confirm: string;
};

const signUpSchema = yup.object({
  name: yup.string().required('Informe o nome.'),
  email: yup.string().required('Informe o email').email('E-mail invalido.'),
  password: yup
    .string()
    .required('Informe a senha')
    .min(6, 'A senha deve ter pelo menos 6 digitos.'),
  password_confirm: yup
    .string()
    .required('confirme a senha.')
    .oneOf([yup.ref('password'), ''], 'A confirmação da senha não confere'),
});

export function SignUp() {
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();
  const { singIn } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({ resolver: yupResolver(signUpSchema) });
  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack();
  }

  async function handleSingUp({name, email, password}: FormDataProps) {
    try {
      await api.post('/users', { name, email, password });
      await singIn(email, password);


    } catch (error) {
      const isAppError = error instanceof Error;
      console.log(isAppError);
      const title = isAppError ? error.message : 'Não foi possível criar a conta. Tente novamente mais tarde';

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      });
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
            Crie sua conta
          </Heading>

          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Nome"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.name?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Email"
                errorMessage={errors.email?.message}
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={onChange}
                value={value}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Senha"
                secureTextEntry
                onChangeText={onChange}
                value={value}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password_confirm"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Confirme a Senha"
                secureTextEntry
                onChangeText={onChange}
                value={value}
                onSubmitEditing={handleSubmit(handleSingUp)}
                errorMessage={errors.password_confirm?.message}
                returnKeyType="send"
              />
            )}
          />

          <Button
            title="Criar e acessar"
            onPress={handleSubmit(handleSingUp)}
            isLoading={isLoading}
          />
        </Center>
        <Button
          title="Voltar para o login"
          variant={'outline'}
          mt={12}
          onPress={handleGoBack}
        />
      </VStack>
    </ScrollView>
  );
}
