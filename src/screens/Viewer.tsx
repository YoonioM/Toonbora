import { Dimensions, FlatList, Image, StatusBar, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Nav from "../components/Nav";
import { TouchableOpacity } from "react-native";
import { Text } from "react-native";
import { useEffect, useState } from "react";
import ViewerFooter from "../components/ViewerFooter";
import { useRecoilValue } from "recoil";
import orientationState from "../recoil/atom/orientationState";
import RNFS from 'react-native-fs';
import IParamList from "../models/interface/IParamList";
import { RouteProp, useRoute } from "@react-navigation/native";

interface IImgFile {
    id: number;
    fileName: string;
}

export default function Viewer() {
    const route = useRoute<RouteProp<IParamList, "Viewer">>();
    const dirPath = route.params.dirPath;
    const [navOpen, setNavOpen] = useState(true);
    const [imgs, setImgs] = useState<IImgFile[]>([]);
    const isLandscape = useRecoilValue(orientationState);
    const { width: deviceWidth } = Dimensions.get('window');

    useEffect(() => {
        RNFS.readDir(dirPath).then( result => {
            setImgs(result.map((file, i) => { return { id: i, fileName: file.name } }));
        })
        console.log(imgs);
    }, []);

    const imageItem = ({ item }: {item: IImgFile}) => {
        return <Image source={ { uri: `${dirPath}/${item.fileName}`} } style={ { width: deviceWidth, height: deviceWidth} } />
    }

    const leftButton = (
        <TouchableOpacity>
            <Text className='font-bold text-purple-600'>터치확인</Text>
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
                data={ imgs } renderItem={ imageItem } keyExtractor={(item) => item.id.toString()}
                className='bg-white h-full' style={ { paddingTop: StatusBar.currentHeight || 0 + 100, paddingBottom: 200 } }
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