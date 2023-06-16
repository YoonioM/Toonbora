import { Alert, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/Ionicons'
import IParamList from "../models/interface/IParamList";
import Nav from "../components/Nav";
import RNFS from 'react-native-fs'
import DocumentPicker from 'react-native-document-picker'


const dummy = [
    "", "", "", "", "", "", "",
]

/**
 * 
 * ===== TODO =====
 * scrollview flatlist로 바꾸기
 * 
 */

export default function Home({ navigation }: { navigation: NavigationProp<IParamList> }) {

    const leftButton = 
            <TouchableOpacity
            onPress={() => {
                DocumentPicker.pickDirectory()
                .then(result => {
                    console.log(result.uri)
                    RNFS.readDir(result.uri)
                    .then(res => console.log(res))
                })
                .catch(error => {
                    Alert.alert(`${error}`)
                })
            }}>
                <Icon name='ios-add' size={25} color='#9333ea'/>
            </TouchableOpacity>

    const rightButton = 
            <TouchableOpacity
            onPress={() => {

            }}>
                <Icon name='ellipsis-vertical-outline' size={20} color='#9333ea'/>
            </TouchableOpacity>

    return (
        <View className='bg-slate-50'>
            <Nav title="서재" leftButton={leftButton} rightButton={rightButton}/>
                <ScrollView contentContainerStyle={{flexDirection: 'row', flexWrap: "wrap", justifyContent: 'center'}}>
                    {dummy.map((item: any, idx: number) => (
                    <View key={idx} className="flex w-36 h-52 m-5 bg-slate-400"
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
                        <Text>스켈레톤</Text>
                    </View>
                    ))}
                </ScrollView>
        </View>
    )
}