import { NavigationProp, useNavigation } from "@react-navigation/native";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import IParamList from "../models/interface/IParamList";
import Icon from "react-native-vector-icons/FontAwesome";
import { useRecoilState } from "recoil";
import Nav from "./Nav";
import ViewerFooter from "./ViewerFooter";
import { navOpenState } from "../recoil/atom/viewerState";

export default function ViewerMenu() {

    const navigation = useNavigation<NavigationProp<IParamList>>();
    const [navOpen, setNavOpen] = useRecoilState(navOpenState);

    const leftButton = (
        <TouchableOpacity onPress={() => {
            navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Home');
        }}>
            <Icon name='chevron-left' size={20} color='#9333ea'></Icon>
        </TouchableOpacity>
    );

    const rightButton = (
        <TouchableOpacity onPress={() => { setNavOpen(!navOpen) }}>
            <Text className='font-bold text-purple-600'>숨기기</Text>
        </TouchableOpacity>
    );

    return (
        <>
            <SafeAreaView pointerEvents={ navOpen ? 'auto' : 'none' }
                className={`absolute top-0 w-full bg-slate-50 border-b border-gray-200 ${navOpen ? '' : 'opacity-0'}`}
            >
                <View className="w-full relative">
                    <Nav leftButton={leftButton} title={'이름'} rightButton={rightButton}/>
                </View>
            </SafeAreaView>
            <SafeAreaView pointerEvents={ navOpen ? 'auto' : 'none' }
                className={`absolute bottom-0 w-full bg-slate-50 border-t border-gray-200 ${navOpen ? '' : 'opacity-0'}`}
            >
                <View className='w-full relative'>
                    <ViewerFooter/>
                </View>
            </SafeAreaView>
        </>
    );
}