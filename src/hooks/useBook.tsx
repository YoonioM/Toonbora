import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import RNFS, { DocumentDirectoryPath } from 'react-native-fs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IBook from '../models/interface/IBook';
import { AsyncKey } from '../models/enums/AsyncKey';
import axios from 'axios';
import { KAKAO_REST_API_KEY } from '@env';

/**
 * 중복방지?
 *
 */
const useBook = () => {
    const [books, setBooks] = useState<IBook[]>([]);

    const getBooks = async () => {
        console.log(DocumentDirectoryPath);
        console.log(KAKAO_REST_API_KEY);
        const localBooks = await AsyncStorage.getItem(AsyncKey.Books);
        if (localBooks != null) {
            setBooks(JSON.parse(localBooks));
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
    };

    const saveBooks = async (book: string) => {
        AsyncStorage.setItem(AsyncKey.Books, book).catch((err) =>
            console.error(err)
        );
    };

    const addBook = () => {
        DocumentPicker.pickDirectory()
            .then(async (result) => {
                console.log(result);
                const selectedPath = decodeURIComponent(
                    result?.uri.substring(7, result.uri.length) as string
                );
                let pathNameList = selectedPath!.split('/');
                let pathName = decodeURIComponent(
                    pathNameList![pathNameList!.length - 2]
                );
                const thumbnail = await searchThumbnail(pathName);
                setBooks((val) => {
                    let newVal = [...val];
                    newVal.push({
                        name: pathName as string,
                        path: selectedPath as string,
                        progress: undefined,
                        thumbnail,
                    });
                    saveBooks(JSON.stringify(newVal));
                    return newVal;
                });
            })
            .catch((error) => {
                Alert.alert(`${error}`);
            });
    };

    const deleteBook = async (bookNumbers: number[]) => {
        setBooks((val) => {
            const newVal = val.filter(
                (_, index) => !bookNumbers.includes(index)
            );
            saveBooks(JSON.stringify(newVal));
            return newVal;
        });
        return '';
    };

    const searchThumbnail = async (query: string) => {
        const { data } = await axios.get(
            'https://dapi.kakao.com/v2/search/image',
            {
                headers: { Authorization: `KakaoAK ${KAKAO_REST_API_KEY}` },
                params: {
                    query,
                    page: 1,
                    size: 1,
                },
            }
        );

        if (data.documents[0]) {
            return data.documents[0].image_url;
        } else {
            return null;
        }
    };

    const changeThumbnail = (idx: number) => {
        console.log(idx);
        Alert.prompt(
            '표지를 찾을 검색어를 입력해 주세요.',
            '',
            [
                {
                    text: '취소',
                    style: 'cancel',
                },
                {
                    text: '찾기',
                    style: 'default',
                    onPress: async (text) => {
                        if (text != null && text.length > 0) {
                            console.log(text);
                            const thumbnail = await searchThumbnail(text);
                            setBooks((val) => {
                                const newVal = [...val];
                                const newObj = { ...newVal[idx] };
                                newObj.thumbnail = thumbnail;
                                newVal[idx] = newObj;
                                // newVal.splice(idx, 0, newObj);
                                saveBooks(JSON.stringify(newVal));
                                return newVal;
                            });
                        } else {
                            Alert.alert('검색어는 빈칸으로 할 수 없습니다.');
                        }
                    },
                },
            ],
            'plain-text', // Optional input type: 'plain-text', 'secure-text', or 'numeric'
            '', // Optional default value
            'default' // Optional cancel button title)
        );
    };

    useEffect(() => {
        // asyncstorage에서 북 리스트 가져오기
        getBooks();
    }, []);

    return { books, addBook, deleteBook, changeThumbnail };
};

export default useBook;
