import { atom } from "recoil";

// true: scroll 모드, false: 좌우로 넘기기
export const scrollModeState = atom<boolean>({
    key: 'scrollModeState',
    default: true
})