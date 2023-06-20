import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import IBook from '../models/interface/IBook'
import IEpisode from '../models/interface/IEpisode'
import RNFS from 'react-native-fs'

/**
 * =====
 * 하...캐싱....
 * 파일개수 확인해서 개수 다르면 다시 썸네일 다시 로드하고 아니면 있는거 쓰기
 * 키값은 폴더이름으로하고 어차피 중복은 안될테니
 */

const useEpisode = (book: IBook) => {

    const [episodes, setEpisodes] = useState<IEpisode[]|null>(null)
    const [thumbnails, setThumbnails] = useState<any>({})

    const getEpisodes = () => {
        RNFS.readDir(book.path)
        .then(async (result) => {
            let episodes: IEpisode[] = []
            for(let episode of result){
                if(episode.isDirectory()){
                    await getThumbnail(episode.path)
                    .then(thumbnail => {
                        episodes.push({
                            name: episode.name,
                            path: episode.path,
                            thumbnail: thumbnail.path
                        })
                    })
                }
            }

            const sortedArray = [...episodes].sort((a, b) => {
                const nameA = Number(a.name.match(/\d+/g))
                const nameB = Number(b.name.match(/\d+/g))
            
                if (nameA < nameB) {
                return -1 // a should be sorted before b
                } else if (nameA > nameB) {
                return 1 // a should be sorted after b
                } else {
                return 0 // names are equal, maintain original order
                }
            });
            
            setEpisodes(sortedArray)
        })
    }

    // const getEpisodes = () => {
    //     RNFS.readDir(book.path)
    //     .then((result) => {
    //         let episodes: IEpisode[] = []
    //         for(let episode of result){
    //             if(episode.isDirectory()){
    //                 episodes.push({
    //                     name: episode.name,
    //                     path: episode.path
    //                 })
    //                 getThumbnail(episode.path, episode.name.match(/\d+/g))
    //             }
    //         }

    //         const sortedArray = [...episodes].sort((a, b) => {
    //             const nameA: number = Number(a.name.match(/\d+/g))
    //             const nameB: number = Number(b.name.match(/\d+/g))
            
    //             return nameA - nameB
    //         });
            
    //         setEpisodes(sortedArray)
    //     })
    // }

    const getThumbnail = async (path: string) => {
        let thumbnails = await RNFS.readDir(path)
        const sortedArray = [...thumbnails].sort((a, b) => {
        const nameA = Number(a.name.match(/\d+/g))
        const nameB = Number(b.name.match(/\d+/g))
    
        if (nameA < nameB) {
        return -1 // a should be sorted before b
        } else if (nameA > nameB) {
        return 1 // a should be sorted after b
        } else {
        return 0 // names are equal, maintain original order
        }
    });
        return sortedArray[0]
    }

    // const getThumbnail = async (path: string, idx: string) => {
    //     let thumbnails = await RNFS.readDir(path)
    //     const sortedArray = [...thumbnails].sort((a, b) => {
    //         const nameA = Number(a.name.match(/\d+/g))
    //         const nameB = Number(b.name.match(/\d+/g))
        
    //         if (nameA < nameB) {
    //         return -1 // a should be sorted before b
    //         } else if (nameA > nameB) {
    //         return 1 // a should be sorted after b
    //         } else {
    //         return 0 // names are equal, maintain original order
    //         }
    //     });
    //     // return sortedArray[0]
    //     setThumbnails((val: any) => {
    //         let newVal = {...val}
    //         newVal[idx] = sortedArray[0].path
    //         return newVal
    //     })
    // }

    useEffect(() => {
        getEpisodes()
    }, [])

    return { episodes, thumbnails }
}

export default useEpisode