import { Text, View } from "react-native";
import { useRecoilValue } from "recoil";
import viewerSelector from "../recoil/selector/viewerSelector";

export default function ViewerFooter() {

    const { currentPage, totalPage } = useRecoilValue(viewerSelector);

    return (
        <>
            <View className='flex flex-row justify-start z-20'>
                <View className='bg-purple-500 h-1 w-1/2' style={{ width: 12 }}/>
                <View className='flex-1 z-10 bg-slate-300'>
                    <View className='bg-purple-500 h-1 w-1/2 relative z-10' style={
                        { width: `${(currentPage - 1) / (totalPage - 1) * 100}%` }
                    }>
                        <View className='absolute right-0 top-0 transform 
                        bg-white border-2 border-purple-600 rounded-full'
                            style={[
                                { width: 24, height: 24},
                                { transform: [ { translateX: 12 }, { translateY: -10 } ] }
                            ]}
                        />
                    </View>
                </View>
                <View className='bg-gray-300 h-1' style={{ minWidth: 12 }}/>
            </View>
            <View className='bg-slate-50 w-full z-10' style={{ height: 50 }}>
                <Text className='text-lg'>뷰어 푸터 { currentPage } / { totalPage }</Text>
            </View>
        </>
    )
}