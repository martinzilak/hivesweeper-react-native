import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  Screen,
  cardStyleInterpolator,
  BackgroundAppWrapper,
  type RootStackParamList,
} from 'hivesweeper/shared';
import {
  GameScreen,
  MainMenuScreen,
  NewGameSizeScreen,
} from 'hivesweeper/board';
import { SettingsScreen } from 'hivesweeper/settings';
import { StatsScreen } from 'hivesweeper/stats';

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
        <NavigationContainer
          theme={transparentTheme}
          documentTitle={{ formatter: () => 'Hivesweeper' }}>
          <Stack.Navigator
            initialRouteName={Screen.MAIN_MENU}
            screenOptions={{
              headerShown: false,
              cardStyle: {
                backgroundColor: 'transparent',
              },
              detachPreviousScreen: true,
              gestureEnabled: false,
              cardStyleInterpolator,
            }}>
            <Stack.Screen name={Screen.MAIN_MENU} component={MainMenuScreen} />
            <Stack.Screen
              name={Screen.NEW_GAME_SIZE}
              component={NewGameSizeScreen}
            />
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
