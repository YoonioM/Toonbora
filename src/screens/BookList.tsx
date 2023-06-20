import { Alert, SafeAreaView, ScrollView, Text, TouchableOpacity, View, Image, ActivityIndicator, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { NavigationProp, useRoute } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/Ionicons'
import IParamList from "../models/interface/IParamList";
import Nav from "../components/Nav";
import IBook from "../models/interface/IBook";
import useEpisode from "../hooks/useEpisode";
import IEpisode from "../models/interface/IEpisode";

/**
 * 
 * ===== TODO =====
 * scrollview flatlist로 바꾸기
 * 
 */

export default function BookList({ navigation }: { navigation: NavigationProp<IParamList>}) {

  const route = useRoute();
  const {book}: IBook = route.params;

  const {episodes, thumbnails} = useEpisode(book);

  const leftButton = 
          <TouchableOpacity
          onPress={() => {
              if(navigation.canGoBack()){
                  navigation.goBack();
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

  const renderItem = ({item}: any) => {
    return(
        <TouchableOpacity className="w-full">
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
                    {/* {thumbnails[item.name.match(/\d+/g)] && <Image className="w-full h-full" source={{uri: 'file://' + thumbnails[item.name.match(/\d+/g)]}}></Image>} */}
                    <Image className="w-full h-full" source={{uri: 'file://' + item.thumbnail}}></Image>
                </View>
                <Text className="ml-5 text-base">{item.name}</Text>
                <View className="ml-auto mr-5">
                <Icon name='bookmark-outline' size={30} color='#9333ea'/>
                </View>
            </View>
            <View className="w-11/12 m-auto border-b border-slate-300"></View>
        </TouchableOpacity>
    )
  }


  useEffect(() => {
      // console.log(route)
      
  }, [])

  return (
      <View className='h-full bg-slate-50'>
        <Nav title={book.name} leftButton={leftButton}/>
          { episodes 
              ?
              // <ScrollView contentContainerStyle={{ flexWrap: "wrap", justifyContent: 'center'}}>
              //     {episodes.map((item: any, idx: number) => (
              //         <TouchableOpacity key={idx} className="w-full">
              //             <View className="flex-row items-center">
              //                 <View className="flex w-10 h-16 m-5 bg-slate-400"
              //                 style={{
              //                     shadowColor: "#000",
              //                     shadowOffset: {
              //                         width: 0,
              //                         height: 1,
              //                     },
              //                     shadowOpacity: 0.22,
              //                     shadowRadius: 2.22,
              //                     elevation: 3,
              //                 }}>
              //                     <Image className="w-full h-full" source={{uri: 'file://' + thumbnails[item.name.match(/\d+/g)]}}></Image>
              //                 </View>
              //                 <Text className="ml-5 text-base">{item.name}</Text>
              //                 <View className="ml-auto mr-5">
              //                     <Icon name='bookmark-outline' size={30} color='#9333ea'/>
              //                 </View>
              //             </View>
              //             <View className="w-11/12 m-auto border-b border-slate-300"></View>
              //         </TouchableOpacity>
              //     ))
              // }
              // </ScrollView>
              <FlatList
                  data={episodes}
                  renderItem={renderItem}
                  keyExtractor={(item) => String(item.name)}
              />
              :
              <View className="h-full">
                  <ActivityIndicator color='9341F9' size='large' className="m-auto mt-14"/>
              </View>}
              
      </View>
  )
}