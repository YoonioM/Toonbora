import { Alert, SafeAreaView, ScrollView, Text, TouchableOpacity, View, Image } from "react-native";
import { useEffect, useState } from "react";
import { NavigationProp, useRoute } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/Ionicons'
import IParamList from "../models/interface/IParamList";
import Nav from "../components/Nav";
import RNFS from 'react-native-fs'
import IBook from "../models/interface/IBook";


const dummy = [
    "1화",
    "2화",
    "",
    "",
    "",
    "",
    "",
]

type episode = {
    episodeName: string
    uri: string
    thumbnail?: string
}

/**
 * 
 * ===== TODO =====
 * scrollview flatlist로 바꾸기
 * 
 */

export default function BookList({ navigation }: { navigation: NavigationProp<IParamList> }) {

    const route = useRoute()
    const {book}: IBook = route.params

    // const episodes: episode[] = [

    // ]

    const [episodes, setEpisodes] = useState([])

    const leftButton = 
            <TouchableOpacity
            onPress={() => {
                if(navigation.canGoBack()){
                    navigation.goBack()
                }
            }}>
                <Icon name='chevron-back' size={25} color='#9333ea'/>
            </TouchableOpacity>

    const rightButton = 
            <TouchableOpacity
            onPress={() => {

            }}>
                <Icon name='bookmark-outline' size={20} color='#9333ea'/>
            </TouchableOpacity>

    const getDir = () => {
        RNFS.readDir(book.uri) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
        .then(async (result) => {
            // console.log('GOT RESULT', result);
            let episodes: episode[] = []
            for(let episode of result){
                await getThumbnail(episode.path)
                .then(thumbnail => {
                    episodes.push({
                        episodeName: episode.name,
                        uri: episode.path,
                        thumbnail: thumbnail.path
                    })
                })
            }

            const sortedArray = [...episodes].sort((a, b) => {
                const nameA = Number(a.episodeName.match(/\d+/g))
                const nameB = Number(b.episodeName.match(/\d+/g))
            
                if (nameA < nameB) {
                return -1; // a should be sorted before b
                } else if (nameA > nameB) {
                return 1; // a should be sorted after b
                } else {
                return 0; // names are equal, maintain original order
                }
            });
            
            setEpisodes(sortedArray);
            // // stat the first file
            // // return Promise.all([RNFS.stat(result[0].path), result[0].path]);
        })
    }

    const getThumbnail = async (path: string) => {
        let thumbnails = await RNFS.readDir(path)
        const sortedArray = [...thumbnails].sort((a, b) => {
        const nameA = Number(a.name.match(/\d+/g))
        const nameB = Number(b.name.match(/\d+/g))
    
        if (nameA < nameB) {
        return -1; // a should be sorted before b
        } else if (nameA > nameB) {
        return 1; // a should be sorted after b
        } else {
        return 0; // names are equal, maintain original order
        }
    });
        return sortedArray[0]
    }

    useEffect(() => {
        // console.log(route.params)
        getDir()
    }, [])

    return (
        <View className='h-full bg-slate-50'>
            <Nav title={book.name} leftButton={leftButton}/>
                <ScrollView contentContainerStyle={{ flexWrap: "wrap", justifyContent: 'center'}}>
                    {episodes.map((item: any, idx: number) => (
                        <TouchableOpacity key={idx} className="w-full">
                            <View className="flex-row items-center">
                                <View className="flex w-10 h-16 m-5 bg-slate-400"
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
                                    {/* <Text>{item.thumbnail}</Text> */}
                                    <Image className="w-full h-full" source={{uri: 'file://' + item.thumbnail}}></Image>
                                    {/* <Image className="w-full h-full" source={{uri: 'https://i.namu.wiki/i/SYsU9-e9yBLM5Q0QnEm_xbNJCR-7DwI-oR3EDrwt55YkRPqfVDShLaXWZ0uKti_rwUU3a1shntG50ebnGYaZMg.webp'}}></Image> */}
                                </View>
                                <Text className="ml-5 text-base">{item.episodeName}</Text>
                                <View className="ml-auto mr-5">
                                    <Icon name='bookmark-outline' size={30} color='#9333ea'/>
                                </View>
                            </View>
                            <View className="w-11/12 m-auto border-b border-slate-300"></View>
                        </TouchableOpacity>
                    
                    ))}
                </ScrollView>
        </View>
    )
}