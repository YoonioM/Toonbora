import { Alert, FlatList, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import IParamList from '../models/interface/IParamList';
import Nav from '../components/Nav';
import SplashScreen from 'react-native-splash-screen';

import useBook from '../hooks/useBook';
import { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { currentMenuState, visibleMenuState } from '../recoil/atom/navState';
import IMenu from '../models/interface/Imenu';
import Book from '../components/Book';
import IMenuButton from '../models/interface/IMenuButton';

/**
 *
 * ===== TODO =====
 * scrollview flatlist로 바꾸기
 *
 */

export default function Home({ navigation }: { navigation: NavigationProp<IParamList> }) {
    const { books, addBook, deleteBook, changeThumbnail } = useBook();
    const [currentMenu, setCurrentMenu] = useRecoilState(currentMenuState);
    const [selectedBookNumbers, setSelectedBookNumbers] = useState<number[]>([]);

    const setVisibleMenu = useSetRecoilState(visibleMenuState);

    // default: 기본 delete: 편집
    const leftButtons: IMenuButton = {
        default: (
            <TouchableOpacity
                onPress={() => {
                    addBook();
                }}
            >
                <Icon name="ios-add" size={25} color="#9333ea" />
            </TouchableOpacity>
        ),

        delete: (
            <TouchableOpacity
                onPress={() => {
                    setSelectedBookNumbers([]);
                    setCurrentMenu('default');
                }}
            >
                <Text className="text-center text-base text-blue-500">완료</Text>
            </TouchableOpacity>
        ),

        change_thumbnail: (
            <TouchableOpacity
                onPress={() => {
                    setCurrentMenu('default');
                }}
            >
                <Text className="text-center text-base text-blue-500">완료</Text>
            </TouchableOpacity>
        ),
    };

    const rightButtons: IMenuButton = {
        default: (
            <TouchableOpacity
                onPress={() => {
                    setVisibleMenu(val => !val);
                }}
            >
                <Icon name="ellipsis-vertical-outline" size={20} color="#9333ea" />
            </TouchableOpacity>
        ),

        delete: (
            <TouchableOpacity
                onPress={() => {
                    if (selectedBookNumbers.length > 0) {
                        Alert.alert('선택한 책을 지우시겠습니까?', '목록에서 삭제되며 파일이 지워지지 않습니다.', [
                            {
                                text: '취소',
                                style: 'cancel',
                            },
                            {
                                text: '삭제',
                                style: 'destructive',
                                onPress: () => {
                                    deleteBook(selectedBookNumbers).then(() => {
                                        setSelectedBookNumbers([]);
                                        setCurrentMenu('default');
                                    });
                                },
                            },
                        ]);
                    } else {
                        setCurrentMenu('default');
                    }
                }}
            >
                <Text className="text-center text-base text-red-500">삭제</Text>
            </TouchableOpacity>
        ),

        change_thumbnail: (
            <TouchableOpacity
                onPress={() => {
                    setVisibleMenu(val => !val);
                }}
            >
                <Icon name="ellipsis-vertical-outline" size={20} color="#9333ea" />
            </TouchableOpacity>
        ),
    };

    const menus: IMenu[] = [
        {
            name: '편집',
            icon: 'remove-circle-outline',
            onPress: () => {
                setCurrentMenu('delete');
            },
        },
        {
            name: '표지 변경',
            icon: 'md-journal-outline',
            onPress: () => {
                setCurrentMenu('change_thumbnail');
            },
        },
    ];

    const navTitles: {
        default: string;
        delete: string;
        change_thumbnail: string;
    } = {
        default: '서재',
        delete: '책을 선택하세요',
        change_thumbnail: '책을 선택하세요',
    };

    const renderItem = ({ item, index }: any) => {
        return (
            <Book
                book={item}
                idx={index}
                setSelectedBookNumbers={setSelectedBookNumbers}
                changeThumbnail={changeThumbnail}
            />
        );
    };

    return (
        <SafeAreaView className="h-full bg-slate-50">
            <Nav
                title={navTitles[currentMenu as keyof typeof navTitles]}
                leftButton={leftButtons[currentMenu as keyof IMenuButton]}
                rightButton={rightButtons[currentMenu as keyof IMenuButton]}
                menus={menus}
            />
            <FlatList
                contentContainerStyle={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                }}
                columnWrapperStyle={{
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                }}
                data={books}
                renderItem={renderItem}
                keyExtractor={(item, index) => String(index)}
                numColumns={1000}
            />
        </SafeAreaView>
    );
}
