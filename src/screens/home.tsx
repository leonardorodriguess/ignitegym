import { useState } from 'react';
import { FlatList, HStack, Heading, Text, VStack } from 'native-base';

import { HomeHeader } from '@components/HomeHeader';
import { Group } from '@components/Group';
import { ExerciseCard } from '@components/ExerciseCard';

export function Home() {
  const [groups, setGroups] = useState([
    'Costas',
    'Bíceps',
    'Tríceps',
    'Ombro',
  ]);
  const [groupSelected, setGroupSelected] = useState('costas');

  return (
    <VStack flex={1}>
      <HomeHeader />

      <FlatList
        horizontal
        my={10}
        maxH={10}
        data={groups}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={item === groupSelected}
            onPress={() => setGroupSelected(item)}
          />
        )}
        _contentContainerStyle={{ px: 8 }}
      />

      <VStack flex={1} px={8}>
        <HStack justifyContent={"space-between"}>
          <Heading color="gray.200" fontSize={"md"}>
            Exercícios
          </Heading>

          <Text color="gray.200" fontSize="sm">
            4
          </Text>
        </HStack>

        <ExerciseCard/>
        <ExerciseCard/>
      </VStack>
    </VStack>
  );
}
