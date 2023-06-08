import Nav from "./Nav/Nav";
import Footer from "./Footer/Footer";
import { View } from "react-native";
import { useRoute } from "@react-navigation/native";

export default function Layout({ children }: { children?: React.ReactNode}) {

    const route = useRoute();

    return (
        <View className="flex flex-1 bg-fuchsia-200">
            { route.name === 'Home' || !route ? <Nav/> : '' }
            <View className="justify-center flex-1 bg-slate-100">
                {children}
            </View>
            <Footer />
        </View>
    )
}