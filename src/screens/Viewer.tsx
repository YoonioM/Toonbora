import { Dimensions, FlatList, Image, StatusBar, View, ViewToken, ViewabilityConfigCallbackPairs } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Nav from "../components/Nav";
import { TouchableOpacity } from "react-native";
import { Text } from "react-native";
import { useEffect, useRef, useState } from "react";
import ViewerFooter from "../components/ViewerFooter";
import { useRecoilValue, useSetRecoilState } from "recoil";
import orientationState from "../recoil/atom/orientationState";
import RNFS from 'react-native-fs';
import IParamList from "../models/interface/IParamList";
import { NavigationProp, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import { currentPageState, totalPageState } from "../recoil/atom/viewerState";

interface IImgFile {
    id: number;
    fileName?: string;
    paddingItem?: boolean;
}

export default function Viewer() {
    const route = useRoute<RouteProp<IParamList, "Viewer">>();
    const dirPath = route.params ? route.params.dirPath : RNFS.DocumentDirectoryPath + '/manwa';
    const navigation = useNavigation<NavigationProp<IParamList>>();
    const setTotalPage = useSetRecoilState(totalPageState);
    const [navOpen, setNavOpen] = useState(true);
    const [imgs, setImgs] = useState<IImgFile[]>([]);
    const isLandscape = useRecoilValue(orientationState);
    const { width: deviceWidth } = Dimensions.get('window');
    const setCurrentPage = useSetRecoilState(currentPageState);

    const onViewableItemsChanged = ({ viewableItems }: { viewableItems: Array<ViewToken>}) => {
        if (viewableItems.length < 1) return;
        const currentKey = viewableItems[0].item.id as number;
        setCurrentPage(currentKey || 1);
    };

    const viewabilityConfigCallbackPairs = useRef<ViewabilityConfigCallbackPairs>([
        { 
            viewabilityConfig: { viewAreaCoveragePercentThreshold: 95 },
            onViewableItemsChanged: onViewableItemsChanged 
        },
    ]);

    useEffect(() => {
        const allowedExtensions = new Set(['.jpg', '.jpeg', '.png', '.bmp', '.webp']);
        RNFS.readDir(dirPath).then( result => {
            const newImgs: IImgFile[] = [{ id: 0, paddingItem: true }];
            result
                .filter(file => {
                    const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLocaleLowerCase();
                    return allowedExtensions.has(fileExtension);
                })
                .forEach((file, i) => newImgs.push({ id: i + 1, fileName: file.name }));
            newImgs.push({ id: newImgs.length, paddingItem: true });
            setImgs(newImgs);
            setTotalPage(newImgs.length - 2);
        });
    }, [route]);

    const imageItem = ({ item }: {item: IImgFile}) => {
        return item.paddingItem
        ? <View style={{ width: '100%', height: StatusBar.currentHeight || 0 + 100 }}/>
        : <Image source={ { uri: `${dirPath}/${item.fileName}`} } style={ { width: deviceWidth, height: deviceWidth} } />
    }

    const leftButton = (
        <TouchableOpacity onPress={() => {
            navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Home');
        }}>
            <Icon name='chevron-left' size={20} color='#9333ea'></Icon>
        </TouchableOpacity>
    );

    const rightButton = (
        <TouchableOpacity onPress={() => {
            setNavOpen(false);
            setTimeout(() => setNavOpen(true), 2000)
        }}>
            <Text className='font-bold text-purple-600'>숨기기</Text>
        </TouchableOpacity>
    );

    return (
        <>
            <FlatList
                data={ imgs } 
                renderItem={ imageItem } 
                keyExtractor={(item) => item.id.toString()} showsHorizontalScrollIndicator={false}
                viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
                className='bg-white h-full'
            />
            { navOpen && (
                <>
                    <SafeAreaView className='absolute w-full h-0 bg-slate-50'>
                        <View><Nav leftButton={leftButton} title={'이름'} rightButton={rightButton}/></View>
                    </SafeAreaView>
                    <SafeAreaView className='absolute bottom-0 w-full h-0 bg-slate-50'>
                        <View className={`w-full ${isLandscape ? '-translate-y-10' : 'absolute bottom-100'}`}><ViewerFooter/></View>
                    </SafeAreaView>
                </>
            )}
        </>
    )
}