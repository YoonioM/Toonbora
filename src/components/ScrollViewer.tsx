import {
    FlatList,
    Image,
    StatusBar,
    TouchableOpacity,
    View,
    ViewToken,
    ViewabilityConfigCallbackPairs,
} from 'react-native';
import IImgFile from '../models/interface/IImgFile';
import { MutableRefObject, useCallback, useEffect, useRef } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentPageState, footerDragState, navOpenState } from '../recoil/atom/viewerState';
import FitImage from './FitImage';

interface IScrollViewerProp {
    imgs: IImgFile[];
    totalPageRef: MutableRefObject<number>;
    dirPath: string;
    next?: boolean;
}

export default function ScrollViewer({ imgs, totalPageRef, dirPath, next }: IScrollViewerProp) {
    const flatListRef = useRef<FlatList>(null);
    const [currentPage, setCurrentPage] = useRecoilState(currentPageState);
    const [isNavOpen, setNavOpen] = useRecoilState(navOpenState);
    const isFooterDrag = useRecoilValue(footerDragState);

    const onViewableItemsChanged = useCallback(({ viewableItems }: { viewableItems: Array<ViewToken> }) => {
        if (viewableItems.length < 1) return;
        const currentPageIdx = viewableItems[0].item.id as number;
        setCurrentPage(
            currentPageIdx < 1 ? 1 : currentPageIdx > totalPageRef.current ? totalPageRef.current : currentPageIdx,
        );
    }, []);

    const viewabilityConfigCallbackPairs = useRef<ViewabilityConfigCallbackPairs>([
        {
            viewabilityConfig: { viewAreaCoveragePercentThreshold: 95 },
            onViewableItemsChanged: onViewableItemsChanged,
        },
    ]);

    const imageItem = ({ item }: { item: IImgFile }) => {
        return item.paddingItem ? (
            <View
                style={{
                    width: '100%',
                    height: StatusBar.currentHeight || 0 + 100,
                }}
            />
        ) : (
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                    setNavOpen(!isNavOpen);
                }}
            >
                <FitImage source={{ uri: `${dirPath}/${item.fileName}` }} />
            </TouchableOpacity>
        );
    };

    useEffect(() => {
        flatListRef.current?.scrollToIndex({
            index: next ? 0 : currentPage,
            animated: false,
        });
    }, [dirPath]);

    useEffect(() => {
        if (!isFooterDrag) return;
        flatListRef.current?.scrollToIndex({
            index: currentPage,
            animated: false,
        });
    }, [currentPage]);

    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
                setNavOpen(!isNavOpen);
            }}
        >
            <FlatList
                data={imgs}
                renderItem={imageItem}
                keyExtractor={item => item.id.toString()}
                ref={flatListRef}
                showsHorizontalScrollIndicator={false}
                viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
                onScrollBeginDrag={() => {
                    setNavOpen(false);
                }}
                onScrollToIndexFailed={() => {
                    setTimeout(
                        () =>
                            flatListRef.current?.scrollToIndex({
                                index: next ? 0 : currentPage,
                                animated: false,
                            }),
                        100,
                    );
                }}
                className="bg-white h-full"
            />
        </TouchableOpacity>
    );
}
