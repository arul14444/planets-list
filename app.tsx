import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import listPlanet from './app/(tabs)/PlanetList';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator>
        <Stack.Screen
            name = "List of Planets"
            component = {listPlanet}
            options={{title: 'Planets List'}}
        />
    </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;