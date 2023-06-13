import { ScrollView, Text, View } from "react-native";
import Layout from "../components/Layout";
import { NavigationProp } from "@react-navigation/native";
import IParamList from "../Models/Interface/IParamList";

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
    return (
        <Layout>
            <ScrollView contentContainerStyle={{flexDirection: 'row', flexWrap: "wrap", justifyContent: 'center'}}>
                {dummy.map(item => (
                <View className="flex w-36 h-52 m-5 bg-slate-400">
                    <Text>스켈레톤</Text>
                </View>
                ))}
            </ScrollView>
        </Layout>
    )
}