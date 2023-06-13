import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import Home from '../Screen/Home';

const Stack = createNativeStackNavigator();

export default function Navigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Home'>
            <Stack.Group screenOptions={{headerShown: false}}>
                <Stack.Screen name='Home' component={Home} />
            </Stack.Group>
            </Stack.Navigator>
        </NavigationContainer>
    )
}