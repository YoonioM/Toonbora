import { NavigationProp, useNavigation } from '@react-navigation/native';
import { SafeAreaView, TouchableOpacity, View } from 'react-native';
import IParamList from '../models/interface/IParamList';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useRecoilState, useRecoilValue } from 'recoil';
import Nav from './Nav';
import ViewerFooter from './ViewerFooter';
import { navOpenState, scrollModeState } from '../recoil/atom/viewerState';
import { MenuView } from '@react-native-menu/menu';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type TViewerMenuProp = Pick<IParamList['Viewer'], 'dirPathList' | 'dirIdx'>;

export default function ViewerMenu({ dirPathList, dirIdx }: TViewerMenuProp) {
    const navigation = useNavigation<NavigationProp<IParamList>>();
    const navOpen = useRecoilValue(navOpenState);
    const [isScrollMode, setScrollMode] = useRecoilState(scrollModeState);

    const leftButton = (
        <TouchableOpacity
            onPress={() => {
                navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Home');
            }}
        >
            <Icon name="chevron-left" size={20} color="#9333ea"></Icon>
        </TouchableOpacity>
    );

    useEffect(() => {
        AsyncStorage.getItem('scrollMode').then(val => {
            setScrollMode(val === 'T');
        });
    }, []);

    useEffect(() => {
        AsyncStorage.setItem('scrollMode', isScrollMode ? 'T' : 'F');
    }, [isScrollMode]);

    const rightButton = (
        <MenuView
            title="뷰어 옵션"
            onPressAction={({ nativeEvent }) => {
                nativeEvent.event === 'scrollModeToggle' && setScrollMode(!isScrollMode);
            }}
            actions={[
                {
                    id: 'scrollModeToggle',
                    title: isScrollMode ? '좌우로 넘기기' : '상하로 넘기기',
                },
            ]}
        >
            <TouchableOpacity activeOpacity={0.7}>
                <Icon name="gear" size={25} color={'#9341f9'} />
            </TouchableOpacity>
        </MenuView>
    );

    return (
        <>
            <SafeAreaView
                pointerEvents={navOpen ? 'auto' : 'none'}
                className={`absolute top-0 w-full bg-slate-50 border-b border-gray-200 ${navOpen ? '' : 'opacity-0'}`}
            >
                <View className="w-full relative">
                    <Nav
                        leftButton={leftButton}
                        title={dirPathList[dirIdx].split('/').at(-1)}
                        rightButton={rightButton}
                    />
                </View>
            </SafeAreaView>
            <SafeAreaView
                pointerEvents={navOpen ? 'auto' : 'none'}
                className={`absolute bottom-0 w-full bg-slate-50 border-t border-gray-200 ${
                    navOpen ? '' : 'opacity-0'
                }`}
            >
                <View className="w-full relative">
                    <ViewerFooter dirPathList={dirPathList} dirIdx={dirIdx} />
                </View>
            </SafeAreaView>
        </>
    );
}
