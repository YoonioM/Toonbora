import React, { useEffect, useState } from 'react'
import { Alert } from 'react-native'
import DocumentPicker from 'react-native-document-picker'
import RNFS from 'react-native-fs'
import AsyncStorage from '@react-native-async-storage/async-storage'
import IBook from '../models/interface/IBook'
import { AsyncKey } from '../models/enums/AsyncKey'

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
                    uri: selectedPath as string,
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

    const deleteBook = () => {

    }

    useEffect(() => {
        // asyncstorage에서 북 리스트 가져오기
        getBooks()
    }, [])

    return {books, addBook}
} 

export default useBook