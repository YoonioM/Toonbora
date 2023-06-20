import React, { useEffect, useState } from 'react'
import { Alert } from 'react-native'
import DocumentPicker from 'react-native-document-picker'
import RNFS, { DocumentDirectoryPath } from 'react-native-fs'
import AsyncStorage from '@react-native-async-storage/async-storage'
import IBook from '../models/interface/IBook'
import { AsyncKey } from '../models/enums/AsyncKey'
import axios from 'axios'

/**
 * =====
 * {
 *  name: string
 *  uri: string
 * }
 * 
 * 
 */

/**
 * 
 * @returns 
 */
const useBook = () => {
    const [books, setBooks] = useState<IBook[]>([])

    const getBooks = async () => {
        const localBooks = await AsyncStorage.getItem(AsyncKey.Books)
        if(localBooks != null){
            setBooks(JSON.parse(localBooks))
        }

        // // 원하는 폴더인지 구분하는 로직 추가해야됨.
        // RNFS.readDir(DocumentDirectoryPath)
        // .then(result => {
        //     const pushBooks: IBook[] = []
        //     console.log(result)
        //     for(let book of result){
        //         if(book.isDirectory()){
        //             pushBooks.push({
        //                 name: book.name,
        //                 path: book.path
        //             })
        //         }
        //     }
        //     setBooks(pushBooks)
        // })
    }

    const getThumbnail = () => {
        axios.get('https://dapi.kakao.com/v2/search/image')
    }

    const saveBooks = async (book: string) => {
        await AsyncStorage.setItem(AsyncKey.Books, book)
    }

    const addBook = () => {
        DocumentPicker.pickDirectory()
        .then(result => {
            const selectedPath = decodeURIComponent(result?.uri.substring(7, result.uri.length) as string)
            let pathNameList = selectedPath!.split('/')
            let pathName = decodeURIComponent(pathNameList![pathNameList!.length-2])
            setBooks(val => {
                let newVal = [...val]
                newVal.push({
                    name: pathName as string,
                    path: selectedPath as string,
                    progress: undefined
                })
                saveBooks(JSON.stringify(newVal))
                return newVal
            })
        })
        .catch(error => {
            Alert.alert(`${error}`)
        })
    }

    const deleteBook = (bookNumbers: number[]) => {
      setBooks(val => {
        const newVal = val.filter((_, index) => !bookNumbers.includes(index));
        saveBooks(JSON.stringify(newVal))
        return newVal
      })
    }

    useEffect(() => {
        // asyncstorage에서 북 리스트 가져오기
        getBooks()
    }, [])

    return {books, addBook, deleteBook}
} 

export default useBook