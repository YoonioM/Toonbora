import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import IBook from '../models/interface/IBook';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { currentMenuState } from '../recoil/atom/navState';
import { useRecoilValue } from 'recoil';
import useBook from '../hooks/useBook';

type Props = {
    book: IBook;
    idx: number;
    setSelectedBookNumbers: Function;
    changeThumbnail: Function;
};

const Book = ({ book, idx, setSelectedBookNumbers, changeThumbnail }: Props) => {
    const [isSelected, setIsSelected] = useState<boolean>(false);
    const currentMenu = useRecoilValue(currentMenuState);
    const navigation = useNavigation();

    useEffect(() => {
        if (isSelected) {
            setSelectedBookNumbers((val: number[]) => {
                const newVal = [...val];
                newVal.push(idx);
                return newVal;
            });
        } else {
            setSelectedBookNumbers((val: number[]) => {
                const newVal = [...val];
                const arrIdx = newVal.indexOf(idx);
                if (idx > -1) {
                    newVal.splice(arrIdx, 1);
                }
                return newVal;
            });
        }
    }, [isSelected]);

    useEffect(() => {
        setIsSelected(false);
    }, [currentMenu]);

    return (
        <>
            <TouchableOpacity
                className="flex w-36 h-52 m-5 bg-slate-400"
                style={{
                    shadowColor: '#000',
                    shadowOffset: {
                        width: 0,
                        height: 1,
                    },
                    shadowOpacity: 0.22,
                    shadowRadius: 2.22,

                    elevation: 3,
                }}
                onPress={() => {
                    switch (currentMenu) {
                        case 'default':
                            navigation.navigate('EpisodeList', { book });
                            break;

                        case 'delete':
                            setIsSelected(val => !val);
                            break;

                        case 'change_thumbnail':
                            changeThumbnail(idx);
                            break;
                    }
                }}
                activeOpacity={0.8}
            >
                {isSelected && <View className="absolute w-full h-full bg-slate-400 opacity-50 z-10"></View>}
                {book.thumbnail ? (
                    <Image className="w-full h-full" source={{ uri: book.thumbnail }} resizeMode="stretch"></Image>
                ) : (
                    <Text>{book.name}</Text>
                )}

                {currentMenu === 'delete' && <CheckBox isSelected={isSelected} />}
            </TouchableOpacity>
        </>
    );
};

const CheckBox = ({ isSelected }: { selected: boolean }) => {
    return (
        <View className="absolute top-1/2 left-11 z-20">
            {isSelected ? (
                <Icon name="ios-checkmark-circle" size={60} color="#9333ea" />
            ) : (
                <Icon name="ios-checkmark-circle-outline" size={60} color="#9333ea" />
            )}
        </View>
    );
};

export default Book;
