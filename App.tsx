import { Text, View, StatusBar } from 'react-native';
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';
import { Loading } from '@components/Loading';
import { StyledProvider, styled } from '@gluestack-style/react';
import { GluestackUIProvider } from '@gluestack-ui/themed';
// import { config } from '@gluestack-ui/config';
import { config } from './config/gluestack-ui.config';


export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_700Bold, Roboto_400Regular });
  return (
    <StyledProvider config={config }>
      <StatusBar
        translucent
        barStyle={'light-content'}
        backgroundColor={'transparent'}
      />
      <Loading />
    </StyledProvider>
  );
}
