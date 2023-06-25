import { Image, TouchableOpacity, View } from "react-native";
import IImgFile from "../models/interface/IImgFile";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentPageState, navOpenState, totalPageState } from "../recoil/atom/viewerState";

interface ITouchViewerProp {
    imgs: IImgFile[];
    dirPath: string;
}

export default function TouchViewer({ imgs, dirPath }: ITouchViewerProp) {

    /**
     * @todo snackbar 추가, 이미지 크기 조정 추가
     */

    const [currentPage, setCurrentPage] = useRecoilState(currentPageState);
    const [isNavOpen, setNavOpen] = useRecoilState(navOpenState);
    const totalPage = useRecoilValue(totalPageState);

    const pageMove = (plus: number) => {
        const toPage = currentPage + plus;
        if (toPage < 1) return;
        if (toPage > totalPage) return;
        setCurrentPage(toPage);
    }

    return (
        <View className='w-full h-full flex justify-center'>
            <Image source={{ uri: `${dirPath}/${imgs[currentPage].fileName}` }}
                style={{ width: '100%', aspectRatio: 1, resizeMode: 'cover' }}
            />
            <View className='w-full h-full absolute flex flex-row'>
                <TouchableOpacity className='w-4/12' onPress={() => { pageMove(-1); }}/>
                <TouchableOpacity className='w-4/12' onPress={() => { setNavOpen( !isNavOpen ); }} />
                <TouchableOpacity className='w-4/12' onPress={() => { pageMove(+1); }}/>
            </View>
        </View>
    )
}