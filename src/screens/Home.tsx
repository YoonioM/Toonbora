import { Alert, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/Ionicons'
import IParamList from "../models/interface/IParamList";
import Nav from "../components/Nav";

import IBook from "../models/interface/IBook";
import useBook from "../hooks/useBook";


const dummy: IBook[]= [
    {
        name: 'asd',
        uri: 'asd'
    },
    {
        name: 'asd',
        uri: 'asd'
    },
    {
        name: 'asd',
        uri: 'asd'
    },
    {
        name: 'asd',
        uri: 'asd'
    },
    {
        name: 'asd',
        uri: 'asd'
    },
    {
        name: 'asd',
        uri: 'asd'
    },
    {
        name: 'asd',
        uri: 'asd'
    }
]

/**
 * 
 * ===== TODO =====
 * scrollview flatlist로 바꾸기
 * 
 */

export default function Home({ navigation }: { navigation: NavigationProp<IParamList> }) {

    const {books, addBook} = useBook()

    const leftButton = 
            <TouchableOpacity
            onPress={() => addBook()}>
                <Icon name='ios-add' size={25} color='#9333ea'/>
            </TouchableOpacity>

    const rightButton = 
            <TouchableOpacity
            onPress={() => {

            }}>
                <Icon name='ellipsis-vertical-outline' size={20} color='#9333ea'/>
            </TouchableOpacity>

    return (
        <View className='h-full bg-slate-50'>
            <Nav title="서재" leftButton={leftButton} rightButton={rightButton}/>
                <ScrollView contentContainerStyle={{flexDirection: 'row', flexWrap: "wrap", justifyContent: 'center' }}>
                    {books.map((book: IBook, idx: number) => (
                    <TouchableOpacity
                    key={idx} className="flex w-36 h-52 m-5 bg-slate-400"
                    style={{
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 1,
                        },
                        shadowOpacity: 0.22,
                        shadowRadius: 2.22,

                        elevation: 3,
                    }}
                    onPress = {() => {
                        navigation.navigate('BookList', {book})
                    }}>
                        <Text>{book.name}</Text>
                    </TouchableOpacity>
                    ))}
                </ScrollView>
        </View>
    )
}