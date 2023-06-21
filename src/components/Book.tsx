import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import IBook from '../models/interface/IBook';
import Icon from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native';

type Props = {
  book: IBook;
  idx: number;
  isDelete: boolean;
  setSelectedBookNumbers: Function;
}

const Book = ({book, idx, isDelete, setSelectedBookNumbers}: Props) => {

  const [isSelected, setIsSelected] = useState<boolean>(false)
  const navigation = useNavigation()

  useEffect(() => {
    if(isSelected){
      setSelectedBookNumbers((val: number[]) => {
        const newVal = [...val];
        newVal.push(idx);
        return newVal;
      })
    }else{
      setSelectedBookNumbers((val: number[]) => {
        const newVal = [...val];
        const arrIdx = newVal.indexOf(idx);
        if(idx > -1){
          newVal.splice(arrIdx, 1);
        }
        return newVal;
      })
    }
  }, [isSelected])

  useEffect(() => {
    setIsSelected(false)
  }, [isDelete])

  return (
    <TouchableOpacity
      className="flex w-36 h-52 m-5 bg-slate-400"
      style={{
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
      }}
      onPress = {() => {
        if(isDelete){
          setIsSelected(val => !val)
        }else{
          navigation.navigate('EpisodeList', {book})
        }
      }}
      activeOpacity={0.8}
      >
        {book.thumbnail && <Image className="w-full h-full" source={{uri: book.thumbnail}}></Image>}
        <Text>{book.name}</Text>
        {isDelete && <CheckBox isSelected={isSelected}/>}
    </TouchableOpacity>
  )
}

const CheckBox = ({isSelected}: {selected: boolean}) => {
  return(
    <View>
      {isSelected 
      ?
        <Icon name='ios-checkmark-circle' size={30}/>
      :
        <Icon name='ios-checkmark-circle-outline' size={30}/>
      }
      
    </View>
  )
}

export default Book