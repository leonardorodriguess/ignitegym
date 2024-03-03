import { StatusBar } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';

import { Routes } from '@routes/index';

import { AuthContext, AuthContextProvider } from '@contexts/authContext';

import { THEME } from '@theme/index';
import { Loading } from '@components/Loading';


export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_700Bold, Roboto_400Regular });
  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        translucent
        barStyle={'light-content'}
        backgroundColor={'transparent'}
      />
      <AuthContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </AuthContextProvider>
    </NativeBaseProvider>
  );
}
