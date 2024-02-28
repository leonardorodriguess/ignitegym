import { StatusBar } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';

import { Routes } from '@routes/index';

import { AuthContext } from '@contexts/authContext';

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
      <AuthContext.Provider value={{ id: '1', name: 'Leonardo'}}>
        {fontsLoaded ? <Routes/> : <Loading />}
      </AuthContext.Provider>
    </NativeBaseProvider>
  );
}
