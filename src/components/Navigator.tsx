import { useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import Home from '../screens/Home';
import { Dimensions, useWindowDimensions, Platform, StatusBar } from 'react-native';
import { useSetRecoilState } from 'recoil';
import orientationState from '../recoil/atom/orientationState';
import EpisodeList from '../screens/EpisodeList';
import Viewer from '../screens/Viewer';
import IParamList from '../models/interface/IParamList';

const Stack = createNativeStackNavigator<IParamList>();

export default function Navigator() {

    const setOrientation = useSetRecoilState(orientationState);
    const windowHeight = useWindowDimensions().height;
    useEffect(() => {
        const { width, height } = Dimensions.get('window');
        const isLandscape = width > height;
        Platform.OS === 'android' && StatusBar.setHidden(isLandscape);
        setOrientation(isLandscape);
    }, [windowHeight]);


    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Home'>
            <Stack.Group screenOptions={{headerShown: false}}>
                <Stack.Screen name='Home' component={Home} />
                <Stack.Screen name='EpisodeList' component={EpisodeList} />
                <Stack.Screen name='Viewer' component={Viewer} />
            </Stack.Group>
            </Stack.Navigator>
        </NavigationContainer>
    )
}