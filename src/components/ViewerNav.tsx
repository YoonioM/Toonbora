import { Text, View, StatusBar, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { useRecoilState, useRecoilValue } from 'recoil';
import orientationState from '../recoil/atom/orientationState';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import IParamList from "../models/interface/IParamList";
import { MenuView } from '@react-native-menu/menu';
import { scrollModeState } from '../recoil/atom/viewerState';

export default function ViewerNav() {

    const isLandscape = useRecoilValue(orientationState);
    const navigation = useNavigation<NavigationProp<IParamList>>();
    const navPadding = isLandscape ? 10 : StatusBar.currentHeight || 10;
    const [scrollMode, setScrollMode] = useRecoilState(scrollModeState);

    return (
        <View className='bg-slate-300 flex flex-row justify-between px-5' style={{ paddingTop: navPadding, paddingBottom: 10 }}>
            <TouchableOpacity activeOpacity={0.7} onPress={() => {
                navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Home');
            }}>
                <Icon name="chevron-left" size={25} color={'#9341f9'} />
            </TouchableOpacity>
            <View>
                <Text style={styles.text}>타이틀 이름</Text>
            </View>
            <MenuView title='뷰어 옵션' onPressAction={ ({ nativeEvent }) => {
                nativeEvent.event === 'scrollModeToggle' && setScrollMode(!scrollMode);
            }} actions={[
                {
                    id: 'scrollModeToggle',
                    title: scrollMode ? '좌우로 넘기기' : '상하로 넘기기',
                }
            ]}>
                <TouchableOpacity activeOpacity={0.7}>
                    <Icon name="gear" size={25} color={'#9341f9'} />
                </TouchableOpacity>
            </MenuView>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        color: '#9341f9',
        fontWeight: '500',
        fontSize: 20
    },
});