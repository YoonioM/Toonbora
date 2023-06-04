import { Text } from "react-native";
import Layout from "../Layout";
import { NavigationProp } from "@react-navigation/native";
import IParamList from "../../interface/IParamList";

export default function Home({ navigation }: { navigation: NavigationProp<IParamList> }) {
    return (
        <Layout>
            <Text>홈이요</Text>
        </Layout>
    )
}