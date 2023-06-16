import { Alert, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/Ionicons'
import IParamList from "../models/interface/IParamList";
import Nav from "../components/Nav";
import RNFS from 'react-native-fs'
import DocumentPicker from 'react-native-document-picker'


const dummy = [
    "1화",
    "2화",
    "",
    "",
    "",
    "",
    "",
]

type dummyob = {
    name: string
    uri: string
}

/**
 * 
 * ===== TODO =====
 * scrollview flatlist로 바꾸기
 * 
 */

export default function BookList({ navigation }: { navigation: NavigationProp<IParamList> }) {

    const leftButton = 
            <TouchableOpacity
            onPress={() => {
                if(navigation.canGoBack()){
                    navigation.goBack()
                }
            }}>
                <Icon name='chevron-back' size={25} color='#9333ea'/>
            </TouchableOpacity>

    const rightButton = 
            <TouchableOpacity
            onPress={() => {

            }}>
                <Icon name='bookmark-outline' size={20} color='#9333ea'/>
            </TouchableOpacity>

    return (
        <View className='h-full bg-slate-50'>
            <Nav title="서재" leftButton={leftButton}/>
                <ScrollView contentContainerStyle={{ flexWrap: "wrap", justifyContent: 'center'}}>
                    {dummy.map((item: any, idx: number) => (
                        <TouchableOpacity key={idx} className="w-full">
                            <View className="flex-row items-center">
                                <View className="flex w-10 h-16 m-5 bg-slate-400"
                                style={{
                                    shadowColor: "#000",
                                    shadowOffset: {
                                        width: 0,
                                        height: 1,
                                    },
                                    shadowOpacity: 0.22,
                                    shadowRadius: 2.22,

                                    elevation: 3,
                                }}>
                                </View>
                                <Text className="ml-5 text-base">{item}</Text>
                                <View className="ml-auto mr-5">
                                    <Icon name='bookmark-outline' size={30} color='#9333ea'/>
                                </View>
                            </View>
                            <View className="w-11/12 m-auto border-b border-slate-300"></View>
                        </TouchableOpacity>
                    
                    ))}
                </ScrollView>
        </View>
    )
}