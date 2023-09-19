import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import IMenu from '../models/interface/Imenu';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { visibleMenuState } from '../recoil/atom/navState';
import Icon from 'react-native-vector-icons/Ionicons';
import orientationState from '../recoil/atom/orientationState';

const Menu = ({ menus }: { menus: IMenu[] }) => {
    const setVisibleMenu = useSetRecoilState(visibleMenuState);
    const orientation = useRecoilValue(orientationState);

    return (
        <>
            <View
                className={`absolute w-40 h-48 ${
                    orientation ? 'top-14 right-16' : 'top-24 right-5'
                } rounded-md bg-slate-50 z-20`}
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
            >
                {menus.map((item: IMenu, idx: number) => (
                    <TouchableOpacity
                        key={idx}
                        className='flex-row px-5 py-2 justify-between items-center'
                        onPress={() => {
                            item.onPress();
                            setVisibleMenu(false);
                        }}
                    >
                        <Icon name={item.icon} size={30} color={'#9333ea'} />
                        <Text className='text-purple-600'>{item.name}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <TouchableOpacity
                className='absolute top-20 w-full h-full z-10'
                onPress={() => {
                    setVisibleMenu(false);
                }}
            ></TouchableOpacity>
        </>
    );
};

export default Menu;
