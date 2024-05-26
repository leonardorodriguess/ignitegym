import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { FlatList, HStack, Heading, Text, VStack, useToast } from 'native-base';

import { Group } from '@components/Group';
import { HomeHeader } from '@components/HomeHeader';
import { ExerciseCard } from '@components/ExerciseCard';
import { AppNavigatorRoutesProps } from '@routes/app.routes';
import { AppError } from '@utils/AppError';
import { api } from '@services/api';

export function Home() {
  const [groups, setGroups] = useState<string[]>([]);

  const [exercises, setExercises] = useState(['Puxada frontal', 'Remanda curvada', 'remada unilateral', 'levantamento terra'])
  const [groupSelected, setGroupSelected] = useState('Costas');

  const toast = useToast();
  const navigation = useNavigation<AppNavigatorRoutesProps>(); 

  function handleOpenExerciseDetails() {
    navigation.navigate('exercise');
  }

  async function fetchGroups () {
    try {
      const response = await api.get('/groups');
      setGroups(response.data);

    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message: 'Não foi possível carregaer os grupos musculares';
      
      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })
    }

  }

  useEffect(() => {
    fetchGroups();
  },[]);

  return (
    <VStack flex={1}>
      <HomeHeader />

      <FlatList
        horizontal
        my={10}
        maxH={10}
        minH={10}
        data={groups}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={item.toUpperCase() === groupSelected.toUpperCase()}
            onPress={() => setGroupSelected(item)}
          />
        )}
        _contentContainerStyle={{ px: 8 }}
      />

      <VStack flex={1} px={8}>
        <HStack justifyContent={"space-between"} mb={4}>
          <Heading color="gray.200" fontSize={"md"} fontFamily={"heading"}>
            Exercícios
          </Heading>

          <Text color="gray.200" fontSize="sm">
            {exercises.length}
          </Text>
        </HStack>

        <FlatList 
          data={exercises}
          keyExtractor={(item) => item}
          renderItem={({item}) => <ExerciseCard onPress={handleOpenExerciseDetails}/>}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ paddingBottom: 20 }}
        />

      </VStack>
    </VStack>
  );
}
