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
        <SafeAreaView>
            <Nav backButtonText="응애"/>
                <ScrollView contentContainerStyle={{flexDirection: 'row', flexWrap: "wrap", justifyContent: 'center'}}>
                    {dummy.map((item: any, idx: number) => (
                    <View key={idx} className="flex w-36 h-52 m-5 bg-slate-400">
                        <Text>스켈레톤</Text>
                    </View>
                    ))}
                </ScrollView>
        </SafeAreaView>
    )
}