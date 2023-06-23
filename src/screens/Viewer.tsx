import { FlatList, Image, StatusBar , TouchableOpacity, View, ViewToken, ViewabilityConfigCallbackPairs } from "react-native";
import { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import RNFS from 'react-native-fs';
import IParamList from "../models/interface/IParamList";
import { RouteProp, useRoute } from "@react-navigation/native";
import { currentPageState, footerDragState, navOpenState, totalPageState } from "../recoil/atom/viewerState";
import ViewerMenu from "../components/ViewerMenu";

interface IImgFile {
    id: number;
    fileName?: string;
    paddingItem?: boolean;
}

export default function Viewer() {
    const route = useRoute<RouteProp<IParamList, "Viewer">>();
    const dirPath = route.params ? route.params.dirPathList[route.params.dirIdx] : RNFS.DocumentDirectoryPath + '/manwa';
    const setTotalPage = useSetRecoilState(totalPageState);
    const [navOpen, setNavOpen] = useRecoilState(navOpenState);
    const [imgs, setImgs] = useState<IImgFile[]>([]);
    const isFooterDrag = useRecoilValue(footerDragState);
    const totalPageRef = useRef<number>(0);
    const flatListRef = useRef<FlatList>(null);
    const [currentPage, setCurrentPage] = useRecoilState(currentPageState);

    const onViewableItemsChanged = ({ viewableItems }: { viewableItems: Array<ViewToken>}) => {
        if (viewableItems.length < 1) return;
        const currentPage = viewableItems[0].item.id as number;
        setCurrentPage(currentPage < 1 ? 1 : currentPage > totalPageRef.current ? totalPageRef.current : currentPage);
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
            totalPageRef.current = newImgs.length - 2;
        });
    }, [route]);
    
    useEffect(() => {
        if (isFooterDrag && flatListRef.current) {
            flatListRef.current.scrollToIndex({ index: currentPage, animated: false });
        };
    }, [currentPage]);

    const imageItem = ({ item }: { item: IImgFile }) => {
        return item.paddingItem
        ? <View style={{ width: '100%', height: StatusBar.currentHeight || 0 + 100 }}/>
        : <TouchableOpacity activeOpacity={1} onPress={() => { setNavOpen(!navOpen) }}>
            <Image source={ { uri: `${dirPath}/${item.fileName}`} }
                style={{ width: '100%', aspectRatio: 1, resizeMode: 'cover' }}
            />
        </TouchableOpacity>
    };

    return (
        <>
            <TouchableOpacity activeOpacity={1} onPress={() => { setNavOpen(!navOpen); }}>
                <FlatList
                    data={ imgs } 
                    renderItem={ imageItem } 
                    keyExtractor={(item) => item.id.toString()}
                    ref={flatListRef}
                    showsHorizontalScrollIndicator={false}
                    viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
                    onScrollBeginDrag={() => { setNavOpen(false); }}
                    className='bg-white h-full'
                />
            </TouchableOpacity>
            {/* <View className='h-full w-full absolute top-0 left-0' onResponderMove={scrollHandler}>
                
            </View> */}
            <ViewerMenu/>
        </>
    )
}