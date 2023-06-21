import { Alert, FlatList, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/Ionicons'
import IParamList from "../models/interface/IParamList";
import Nav from "../components/Nav";

import IBook from "../models/interface/IBook";
import useBook from "../hooks/useBook";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { visibleMenuState } from "../recoil/atom/navState";
import IMenu from "../models/interface/Imenu";
import Footer from "../components/Footer";
import Book from "../components/Book";

/**
 * 
 * ===== TODO =====
 * scrollview flatlist로 바꾸기
 * 
 */

export default function Home({ navigation }: { navigation: NavigationProp<IParamList> }) {

  const {books, addBook, deleteBook} = useBook()
  const [isDelete, setIsDelete] = useState(false)
  const [selectedBookNumbers, setSelectedBookNumbers] = useState<number[]>([])

  const setVisibleMenu = useSetRecoilState(visibleMenuState)

  const leftButton = 
    <TouchableOpacity
    onPress={() => {addBook()}}>
      <Icon name='ios-add' size={25} color='#9333ea'/>
    </TouchableOpacity>

  const rightButton = 
    <TouchableOpacity
    onPress={() => {
      setVisibleMenu(val => !val)
    }}>
      <Icon name='ellipsis-vertical-outline' size={20} color='#9333ea'/>
    </TouchableOpacity>

  const deleteLeftButton = 
  <TouchableOpacity
  onPress={() => {
    Alert.alert(
      '선택한 책을 지우시겠습니까?',
      '목록에서 삭제되며 파일이 지워지지 않습니다.',
      [
        {
          text: '삭제', style: 'destructive',
          onPress: () => {
            deleteBook(selectedBookNumbers)
            .then(() => {
              setSelectedBookNumbers([]);
              setIsDelete(false);
            })
          }
        },
        {
          text: '취소', style: 'cancel'
        }
      ]
    )
    }}>
    <Text className="text-center text-base text-red-500">삭제</Text>
  </TouchableOpacity>

const deleteRightButton = 
<TouchableOpacity
onPress={() => {
    setSelectedBookNumbers([])
    setIsDelete(false)
  }}>
  <Text className="text-center text-base text-blue-500">취소</Text>
</TouchableOpacity>

const menus: IMenu[] = [
  {
    name: '편집',
    icon: 'remove-circle-outline',
    onPress: () => {
      setIsDelete(true)
    }
  }
]

const renderItem = ({item, index}: any) => {
  return(
    <Book book={item} idx={index} isDelete={isDelete} setSelectedBookNumbers={setSelectedBookNumbers}/>
  )
}

  return (
    // <View className='h-full bg-slate-50'>
    <SafeAreaView className='h-full bg-slate-50'>
      {isDelete
      // 편집버튼 클릭 시
      ?
      <Nav title="책을 선택하세요" leftButton={deleteLeftButton} rightButton={deleteRightButton}/>
      :
      <Nav title="서재" leftButton={leftButton} rightButton={rightButton} menus={menus}/>
      }
      {/* <ScrollView contentContainerStyle={{flexDirection: 'row', flexWrap: "wrap", justifyContent: 'center' }}>
        {books.map((book: IBook, idx: number) => (
          <Book book={book} idx={idx} isDelete={isDelete} setSelectedBookNumbers={setSelectedBookNumbers}/>
        ))} */}
      {/* </ScrollView> */}
      <FlatList
        contentContainerStyle={{flexDirection: 'row'}}
        columnWrapperStyle={{ flexWrap: "wrap", justifyContent: 'center'}}
        data={books}
        renderItem={renderItem}
        keyExtractor={(item, index) => String(index)}
        numColumns={10}
      />
    </SafeAreaView>
  )
}