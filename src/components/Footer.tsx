import { Text, View } from 'react-native';

export default function Footer() {
    return (
        <View
        className='justify-center px-2'
        style={{
          height: 40,
          shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,

elevation: 5,
      }}
        >
            <Text>푸터</Text>
        </View>
    )
}