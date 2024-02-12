import { createBottomTabNavigator, BottomTabNavigationProp  } from "@react-navigation/bottom-tabs"

import { Home } from "@screens/home";
import { Profile } from "@screens/profile";
import { History } from "@screens/history";
import { Exercise } from "@screens/exercise";

type AppRoutes = { 
  home: undefined;
  exercise: undefined;
  profile: undefined;
  history: undefined;
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{headerShown: false}}>
      <Screen name="home" component={Home} />
      <Screen name="history" component={History} />
      <Screen name="profile" component={Profile} />
      <Screen name="exercise" component={Exercise} />
    </Navigator>
  )
}