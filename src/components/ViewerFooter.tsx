import { Alert, PanResponder, PanResponderInstance, Text, TouchableOpacity, View } from 'react-native';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import viewerSelector from '../recoil/selector/viewerSelector';
import { useEffect, useRef } from 'react';
import { currentPageState, footerDragState } from '../recoil/atom/viewerState';
import Icon from 'react-native-vector-icons/FontAwesome';
import IParamList from '../models/interface/IParamList';
import { NavigationProp, useNavigation } from '@react-navigation/native';

interface IPageRef {
    currentPage: number;
    totalPage: number;
    dragStartPage: number;
    delay: boolean;
    width: number;
}

type TViewerFooterProp = Pick<IParamList['Viewer'], 'dirPathList' | 'dirIdx'>;

export default function ViewerFooter({ dirPathList, dirIdx }: TViewerFooterProp) {
    const navigation = useNavigation<NavigationProp<IParamList>>();
    const { currentPage, totalPage } = useRecoilValue(viewerSelector);
    const setCurrentPage = useSetRecoilState(currentPageState);
    const setDrag = useSetRecoilState(footerDragState);
    const container = useRef<View>(null);
    const pageRef = useRef<IPageRef>({
        currentPage: 1,
        totalPage: 1,
        dragStartPage: 1,
        delay: true,
        width: 0,
    });

    const panResponder = useRef<PanResponderInstance>(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                container.current?.measure((x, y, w) => {
                    pageRef.current.width = w;
                    pageRef.current.dragStartPage = pageRef.current.currentPage;
                    setDrag(true);
                });
                setTimeout(() => {
                    pageRef.current.delay = false;
                }, 33);
            },
            onPanResponderMove(_, gestureState) {
                const { width, delay, totalPage: total, dragStartPage } = pageRef.current;
                if (delay || !width) return;
                pageRef.current.delay = true;
                const onePageWidth = width / total;
                const toPage = dragStartPage + Math.round(gestureState.dx / onePageWidth);
                if (toPage !== 0) {
                    setCurrentPage(toPage < 1 ? 1 : toPage > total ? total : toPage);
                }
                setTimeout(() => {
                    pageRef.current.delay = false;
                }, 33);
            },
            onPanResponderEnd: () => {
                pageRef.current.width = 0;
                pageRef.current.delay = true;
                setDrag(false);
            },
        }),
    ).current;

    useEffect(() => {
        pageRef.current.currentPage = currentPage;
        pageRef.current.totalPage = totalPage;
    }, [currentPage, totalPage]);

    return (
        <View>
            <View className="flex flex-row justify-start z-20">
                <View className="bg-purple-500 h-1 w-1/2" style={{ width: 12 }} />
                <View className="flex-1 z-10 bg-slate-300" ref={container}>
                    <View
                        className="bg-purple-500 h-1 w-1/2 relative z-10"
                        style={{
                            width: `${((currentPage - 1) / (totalPage - 1)) * 100}%`,
                        }}
                    >
                        <View
                            className="absolute right-0 top-0 transform 
                            bg-white border-2 border-purple-600 rounded-full"
                            style={[
                                { width: 24, height: 24 },
                                {
                                    transform: [{ translateX: 12 }, { translateY: -10 }],
                                },
                            ]}
                            {...panResponder.panHandlers}
                        />
                    </View>
                </View>
                <View className="bg-gray-300 h-1" style={{ minWidth: 12 }} />
            </View>
            <View className="bg-slate-50 w-full z-10 flex flex-row pt-1 px-5 justify-between" style={{ height: 50 }}>
                {dirPathList && dirPathList.length > 1 && (
                    <TouchableOpacity
                        className="pt-2 flex flex-row w-4/12 gap-2"
                        onPress={() => {
                            if (dirIdx < 1) {
                                Alert.alert('이전 화가 없습니다.');
                                return;
                            }
                            navigation.navigate('Viewer', {
                                dirPathList: dirPathList,
                                dirIdx: dirIdx - 1,
                                next: true,
                            });
                        }}
                    >
                        <Icon name="chevron-left" size={16} color="#9333ea"></Icon>
                        <Text>이전 화</Text>
                    </TouchableOpacity>
                )}
                <Text className="text-lg">
                    <Text className="text-purple-600">{currentPage}</Text> / {totalPage}
                </Text>
                {dirPathList && dirPathList.length > 1 && (
                    <TouchableOpacity
                        className="pt-2 flex flex-row w-4/12 justify-end gap-2"
                        onPress={() => {
                            if (dirIdx >= dirPathList.length - 1) {
                                Alert.alert('마지막 화입니다.');
                                return;
                            }
                            navigation.navigate('Viewer', {
                                dirPathList: dirPathList,
                                dirIdx: dirIdx + 1,
                                next: true,
                            });
                        }}
                    >
                        <Text>다음 화</Text>
                        <Icon name="chevron-right" size={20} color="#9333ea"></Icon>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}
