import { selector } from "recoil";
import { currentPageState, scrollModeState, totalPageState } from "../atom/viewerState";

export interface IViewerState {
    scrollMode: boolean;
    currentPage: number;
    totalPage: number;
}

const viewerSelector = selector({
    key: 'viewerSelector',
    get: ({ get }): IViewerState => {
        const viewerState: IViewerState = {
            scrollMode: get(scrollModeState),
            currentPage: get(currentPageState),
            totalPage: get(totalPageState)
        }
        return viewerState;
    },
})

export default viewerSelector;