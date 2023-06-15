import { View, Text } from 'react-native'
import React from 'react'

type Props = {
    leftButton?: React.JSX.Element
    title?: string
    rightButton?: React.JSX.Element
}

const Nav = ({ leftButton, title, rightButton }: Props) => {
    return (
        <View
        className='flex-row w-full items-end justify-between px-5 pb-3 z-50 bg-slate-50'
        style={{
            height: '9%',
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,
            elevation: 3,
        }}
        >
            <View className=''>
                    {leftButton}
            </View>
            <View>
                <Text className='text-center text-base text-purple-600'>{title}</Text>
            </View>
            <View className=''>
                <Text>
                    {rightButton}
                </Text>
            </View>
        </View>
    )
}

export default Nav