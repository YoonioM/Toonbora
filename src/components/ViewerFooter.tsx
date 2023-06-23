import { FlatList, PanResponder, PanResponderInstance, Text, View } from "react-native";
import { useRecoilValue, useSetRecoilState } from "recoil";
import viewerSelector from "../recoil/selector/viewerSelector";
import { useEffect, useRef } from "react";
import { currentPageState } from "../recoil/atom/viewerState";

interface IViewerFooterProp {
    flatListRef: React.RefObject<FlatList>;
}

interface IPageRef {
    currentPage: number;
    totalPage: number;
    changedPage: number;
    isMoving: boolean;
}

export default function ViewerFooter({ flatListRef }: IViewerFooterProp) {

    const { currentPage, totalPage } = useRecoilValue(viewerSelector);
    const setCurrentPage = useSetRecoilState(currentPageState);
    const container = useRef<View>(null);
    const pageRef = useRef<IPageRef>({
        currentPage: 1,
        totalPage: 1,
        changedPage: 0,
        isMoving: false
    });

    const panResponder = useRef<PanResponderInstance>(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                pageRef.current.changedPage = 0;
                pageRef.current.isMoving = true;
            },
            onPanResponderMove(e, gestureState) {
                container.current?.measure((x, y, w) => {
                    const { currentPage: current, totalPage: total, changedPage } = pageRef.current;
                    const onePageWidth = w / total;
                    const plusPage = Math.round(gestureState.dx / onePageWidth) - changedPage;
                    if (plusPage !== 0) { 
                        const toPage = current + plusPage;
                        setCurrentPage(toPage < 1 ? 1 : toPage > total ? total : toPage);
                        pageRef.current.changedPage += plusPage;
                    }
                })
            },
            onPanResponderEnd: () => {
                pageRef.current.isMoving = false;
            }
        })
    ).current;

    useEffect(() => {
        pageRef.current.currentPage = currentPage;
        pageRef.current.totalPage = totalPage;
        if (pageRef.current.isMoving && flatListRef.current) {
            flatListRef.current.scrollToIndex({ index: currentPage, animated: false });
        };
    }, [currentPage]);

    return (
        <>
            <View className='flex flex-row justify-start z-20'>
                <View className='bg-purple-500 h-1 w-1/2' style={{ width: 12 }}/>
                <View className='flex-1 z-10 bg-slate-300' ref={container}>
                    <View className='bg-purple-500 h-1 w-1/2 relative z-10' style={
                        { width: `${(currentPage - 1) / (totalPage - 1) * 100}%` }
                    }>
                        <View className='absolute right-0 top-0 transform 
                            bg-white border-2 border-purple-600 rounded-full'
                            style={[
                                { width: 24, height: 24},
                                { transform: [ { translateX: 12 }, { translateY: -10 } ] }
                            ]}
                            {...panResponder.panHandlers}
                        />
                    </View>
                </View>
                <View className='bg-gray-300 h-1' style={{ minWidth: 12 }}/>
            </View>
            <View className='bg-slate-50 w-full z-10' style={{ height: 50 }}>
                <Text className='text-lg'>뷰어 푸터 { currentPage } / { totalPage }</Text>
            </View>
        </>
    )
}