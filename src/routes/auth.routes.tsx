import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { SignIn } from '@screens/singIn';
import { SignUp } from '@screens/singUp';

const { Navigator, Screen } = createNativeStackNavigator();

export function AuthRoutes() {
  return (
    <Navigator>
      <Screen name='SingIn' component={SignIn}/>
      <Screen name='SingUp' component={SignUp}/>
    </Navigator>
  )
}