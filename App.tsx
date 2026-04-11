import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Screen } from './constants/Screen';
import { cardStyleInterpolator } from './utils/cardStyleInterpolator';
import BackgroundAppWrapper from './components/BackgroundAppWrapper';
import MainMenuScreen from './screens/MainMenuScreen';
import NewGameSizeScreen from './screens/NewGameSizeScreen';
import GameScreen from './screens/GameScreen';
import SettingsScreen from './screens/SettingsScreen';
import StatsScreen from './screens/StatsScreen';
import type { RootStackParamList } from './types/game';

SplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator<RootStackParamList>();

const transparentTheme = {
  ...DefaultTheme,
  colors: { ...DefaultTheme.colors, background: 'transparent' },
};

const App = () => {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <SafeAreaProvider>
      <BackgroundAppWrapper>
        <NavigationContainer theme={transparentTheme}>
          <Stack.Navigator
            initialRouteName={Screen.MAIN_MENU}
            detachInactiveScreens={true}
            screenOptions={{
              headerShown: false,
              cardStyle: {
                backgroundColor: 'transparent',
              },
              contentStyle: {
                backgroundColor: 'transparent',
              },
              detachPreviousScreen: true,
              gestureEnabled: false,
              cardStyleInterpolator,
            }}
          >
            <Stack.Screen name={Screen.MAIN_MENU} component={MainMenuScreen} />
            <Stack.Screen name={Screen.NEW_GAME_SIZE} component={NewGameSizeScreen} />
            <Stack.Screen name={Screen.GAME} component={GameScreen} />
            <Stack.Screen name={Screen.SETTINGS} component={SettingsScreen} />
            <Stack.Screen name={Screen.STATS} component={StatsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </BackgroundAppWrapper>
    </SafeAreaProvider>
  );
};

export default App;
