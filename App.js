import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { GameSettingsProvider } from './contexts/GameSettingsContext';
import { SCREEN } from './constants/Constants';
import MainMenuScreen from './screens/MainMenuScreen';
import NewGameSizeScreen from './screens/NewGameSizeScreen';
import GameScreen from './screens/GameScreen';

const Stack = createStackNavigator();

const App = () => (
    <NavigationContainer>
        <GameSettingsProvider>
            <Stack.Navigator
                initialRouteName={SCREEN.MAIN_MENU}
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name={SCREEN.MAIN_MENU} component={MainMenuScreen} />
                <Stack.Screen name={SCREEN.NEW_GAME_SIZE} component={NewGameSizeScreen} />
                <Stack.Screen name={SCREEN.GAME} component={GameScreen} />
            </Stack.Navigator>
        </GameSettingsProvider>
    </NavigationContainer>
);

export default App;
