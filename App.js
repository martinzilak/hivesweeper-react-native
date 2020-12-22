import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { GameSizeProvider } from './contexts/GameSizeContext';
import GameScreen from './screens/GameScreen';
import { HIVE_SIZE } from './constants/constants';

const Stack = createStackNavigator();

const App = () => (
    <NavigationContainer>
        <GameSizeProvider value={HIVE_SIZE.SMALL}>
            <Stack.Navigator>
                {/*<Stack.Screen name="" component={MainMenuScreen} />*/}
                {/*<Stack.Screen name="NewGameSize" component={NewGameSizeScreen} />*/}
                <Stack.Screen name="Game" component={GameScreen} />
                {/*<Stack.Screen name="PauseMenu" component={PauseMenuScreen} />*/}
            </Stack.Navigator>
        </GameSizeProvider>
    </NavigationContainer>
);

export default App;
