import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'

type Props = {
    backButtonText?: string
    title?: string
    navigation?: any
}

const Nav = (props: Props) => {
    return (
        <View
        className='justify-center px-2 shadow-xl bg-red-200'
        style={{height: '5%'}}
        >
            <View
                className='flex-row'>
                <TouchableOpacity
                onPress={() => {
                    if(props.navigation){
                        props.navigation.pop()
                    }
                    }}>
                    <Icon name='chevron-back-outline' size={25}/>
                </TouchableOpacity>
                <Text
                className='mx-1 text-lg'
                >
                {props.backButtonText}
                </Text>
            </View>
        </View>
    )
}

export default Nav