import { useEffect, useRef, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import RNFS from 'react-native-fs';
import IParamList from "../models/interface/IParamList";
import { RouteProp, useRoute } from "@react-navigation/native";
import { scrollModeState, totalPageState } from "../recoil/atom/viewerState";
import ViewerMenu from "../components/ViewerMenu";
import IImgFile from "../models/interface/IImgFile";
import ScrollViewer from "../components/ScrollViewer";
import TouchViewer from "../components/TouchViewer";

export default function Viewer() {
    const route = useRoute<RouteProp<IParamList, "Viewer">>();
    const dirPath = route.params ? route.params.dirPathList[route.params.dirIdx] : RNFS.DocumentDirectoryPath + '/manwa';
    const setTotalPage = useSetRecoilState(totalPageState);
    const [imgs, setImgs] = useState<IImgFile[]>([]);
    const isScrollMode = useRecoilValue(scrollModeState);
    const totalPageRef = useRef<number>(1);

    useEffect(() => {
        const allowedExtensions = new Set(['.jpg', '.jpeg', '.png', '.bmp', '.webp']);
        RNFS.readDir(dirPath).then( result => {
            const newImgs: IImgFile[] = [{ id: 0, paddingItem: true }];
            result
                .filter(file => {
                    const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLocaleLowerCase();
                    return allowedExtensions.has(fileExtension);
                })
                .forEach((file, i) => newImgs.push({ id: i + 1, fileName: file.name }));
            newImgs.push({ id: newImgs.length, paddingItem: true });
            setImgs(newImgs);
            setTotalPage(newImgs.length - 2);
            totalPageRef.current = newImgs.length - 2;
        });
    }, [route]);

    return (
        <>
            { isScrollMode && <ScrollViewer imgs={imgs} totalPageRef={totalPageRef} dirPath={dirPath}/> }
            { !isScrollMode && <TouchViewer imgs={imgs} dirPath={dirPath}/> }
            <ViewerMenu/>
        </>
    )
}