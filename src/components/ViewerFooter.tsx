import { Text, View } from "react-native";

export default function ViewerFooter() {
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
                <Text>뷰어 푸터</Text>
            </View>
        </>
    )
}