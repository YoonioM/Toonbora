import Nav from "./Nav";
import Footer from "./Footer";
import { View } from "react-native";
import { useRoute } from "@react-navigation/native";
import ViewerNav from "./ViewerNav";
import ViewerFooter from "./ViewrFooter";

export default function Layout({ children }: { children?: React.ReactNode}) {

    const route = useRoute();

    return (
        <View className="flex flex-1 bg-fuchsia-200">
            { route.name === 'Home' || !route ? <Nav/> : '' }
            { route.name === 'Viewer' && <ViewerNav/> }
            <View className="justify-center flex-1 bg-slate-100">
                {children}
            </View>
            { route.name === 'Home' || !route ? <Footer/>  : '' }
            { route.name === 'Viewer' && <ViewerFooter/> }
        </View>
    )
}