import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import { GameSettingsProvider } from './contexts/GameSettingsContext';
import MainMenuScreen from './screens/MainMenuScreen';
import NewGameSizeScreen from './screens/NewGameSizeScreen';
import GameScreen from './screens/GameScreen';
import SettingsScreen from './screens/SettingsScreen';
import StatsScreen from './screens/StatsScreen';
import { Screen } from "./constants/Screen";

const Stack = createStackNavigator();

const App = () => {
    useEffect(() => {
        SplashScreen.hide();
    }, []);

    return (
        <NavigationContainer>
            <GameSettingsProvider>
                <Stack.Navigator
                    initialRouteName={Screen.MAIN_MENU}
                    screenOptions={{
                        headerShown: false,
                    }}
                >
                    <Stack.Screen
                        name={Screen.MAIN_MENU}
                        component={MainMenuScreen}
                        gestureEnabled={false}
                    />
                    <Stack.Screen
                        name={Screen.NEW_GAME_SIZE}
                        component={NewGameSizeScreen}
                        gestureEnabled={false}
                    />
                    <Stack.Screen
                        name={Screen.GAME}
                        component={GameScreen}
                        gestureEnabled={false}
                    />
                    <Stack.Screen
                        name={Screen.SETTINGS}
                        component={SettingsScreen}
                        gestureEnabled={false}
                    />
                    <Stack.Screen
                        name={Screen.STATS}
                        component={StatsScreen}
                        gestureEnabled={false}
                    />
                </Stack.Navigator>
            </GameSettingsProvider>
        </NavigationContainer>
    );
};

export default App;
