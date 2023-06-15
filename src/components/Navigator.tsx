import { useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import Home from '../screens/Home';
import { Dimensions, useWindowDimensions } from 'react-native';
import { useSetRecoilState } from 'recoil';
import orientationState from '../recoil/atom/orientationState';
import Viewer from '../screens/Viewer';

const Stack = createNativeStackNavigator();

export default function Navigator() {
    const setOrientation = useSetRecoilState(orientationState);
    const windowHeight = useWindowDimensions().height;
    useEffect(() => {
        const { width, height } = Dimensions.get('window');
        setOrientation(width > height);
    }, [windowHeight]);

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Home'>
            <Stack.Group screenOptions={{headerShown: false}}>
                <Stack.Screen name='Home' component={Home} />
                <Stack.Screen name='Viewer' component={Viewer} />
            </Stack.Group>
            </Stack.Navigator>
        </NavigationContainer>
    )
}