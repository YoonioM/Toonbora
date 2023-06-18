import { selector } from "recoil";
import { currentPageState, scrollModeState, totalPageState } from "../atom/viewerState";

export interface IViewerState {
    scrollMode: boolean;
    currentPage: number;
    totalPage: number;
}

const viewerSelecor = selector({
    key: 'viewerSelecor',
    get: ({ get }): IViewerState => {
        const viewerState: IViewerState = {
            scrollMode: get(scrollModeState),
            currentPage: get(currentPageState),
            totalPage: get(totalPageState)
        }
        return viewerState;
    },
})

export default viewerSelecor;