import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import IParamList from "../models/interface/IParamList";
import Nav from "../components/Nav";

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

    const leftButton = () => {
        return (
            <TouchableOpacity
            onPress={() => {

            }}>

            </TouchableOpacity>
        )
    }

    return (
        <View className='bg-slate-50'>
            <Nav title="서재"/>
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