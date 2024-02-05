import { StatusBar } from 'react-native';
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';
import { Loading } from '@components/Loading';
import { NativeBaseProvider } from 'native-base';
import { THEME } from '@theme/index';
import { Routes } from '@routes/index';
import { Home } from '@screens/Home';


export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_700Bold, Roboto_400Regular });
  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        translucent
        barStyle={'light-content'}
        backgroundColor={'transparent'}
      />
      {fontsLoaded ? <Home/> : <Loading />}
    </NativeBaseProvider>
  );
}
