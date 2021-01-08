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
                    <Stack.Screen name={Screen.MAIN_MENU} component={MainMenuScreen} />
                    <Stack.Screen name={Screen.NEW_GAME_SIZE} component={NewGameSizeScreen} />
                    <Stack.Screen name={Screen.GAME} component={GameScreen} />
                    <Stack.Screen name={Screen.SETTINGS} component={SettingsScreen} />
                    <Stack.Screen name={Screen.STATS} component={StatsScreen} />
                </Stack.Navigator>
            </GameSettingsProvider>
        </NavigationContainer>
    );
};

export default App;
