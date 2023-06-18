import { Text, View } from "react-native";
import { useRecoilValue } from "recoil";
import viewerSelecor from "../recoil/selector/viewerSelector";

export default function ViewerFooter() {

    const viewerState = useRecoilValue(viewerSelecor);

    return (
        <>
            <View className='w-full h-1 bg-slate-50' style={{
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 1,
                },
                shadowOpacity: 0.20,
                shadowRadius: 2,
            }}/>
            <View className='bg-slate-50 w-full z-50' style={{ height: 50 }}>
                <Text className='text-lg'>뷰어 푸터 { viewerState.currentPage } / { viewerState.totalPage }</Text>
            </View>
        </>
    )
}