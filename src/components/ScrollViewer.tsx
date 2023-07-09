import { FlatList, Image, StatusBar, TouchableOpacity, View, ViewToken, ViewabilityConfigCallbackPairs } from "react-native";
import IImgFile from "../models/interface/IImgFile";
import { MutableRefObject, useCallback, useEffect, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentPageState, footerDragState, navOpenState } from "../recoil/atom/viewerState";

interface IScrollViewerProp {
    imgs: IImgFile[];
    totalPageRef: MutableRefObject<number>;
    dirPath: string;
}

export default function ScrollViewer({ imgs, totalPageRef, dirPath }: IScrollViewerProp) {
    const flatListRef = useRef<FlatList>(null);
    const [currentPage, setCurrentPage] = useRecoilState(currentPageState);
    const [isNavOpen, setNavOpen] = useRecoilState(navOpenState);
    const isFooterDrag = useRecoilValue(footerDragState);

    const onViewableItemsChanged = useCallback(({ viewableItems }: { viewableItems: Array<ViewToken>}) => {
        if (viewableItems.length < 1) return;
        const currentPageIdx = viewableItems[0].item.id as number;
        setCurrentPage(currentPageIdx < 1 ? 1 : currentPageIdx > totalPageRef.current ? totalPageRef.current : currentPageIdx);
    }, []);

    const viewabilityConfigCallbackPairs = useRef<ViewabilityConfigCallbackPairs>([
        { 
            viewabilityConfig: { viewAreaCoveragePercentThreshold: 95 },
            onViewableItemsChanged: onViewableItemsChanged 
        },
    ]);

    const imageItem = ({ item }: { item: IImgFile }) => {
        return item.paddingItem
        ? <View style={{ width: '100%', height: StatusBar.currentHeight || 0 + 100 }}/>
        : <TouchableOpacity activeOpacity={1} onPress={() => { setNavOpen(!isNavOpen) }}>
            <Image source={ { uri: `${dirPath}/${item.fileName}`} }
                style={{ width: '100%', aspectRatio: 1, resizeMode: 'cover' }}
            />
        </TouchableOpacity>
    };

    useEffect(() => {
        if (!isFooterDrag) return;
        flatListRef.current?.scrollToIndex({ index: currentPage, animated: false });
    }, [currentPage]);

    return (
        <TouchableOpacity activeOpacity={1} onPress={() => { setNavOpen(!isNavOpen); }}>
            <FlatList
                data={ imgs }
                renderItem={ imageItem }
                keyExtractor={(item) => item.id.toString()}
                ref={flatListRef}
                showsHorizontalScrollIndicator={false}
                viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
                onScrollBeginDrag={() => { setNavOpen(false); }}
                initialScrollIndex={currentPage}
                onScrollToIndexFailed={() => {
                    setTimeout(() => flatListRef.current?.scrollToIndex({ index: currentPage, animated: false }), 500);
                }}
                className='bg-white h-full'
            />
        </TouchableOpacity>
    );
}