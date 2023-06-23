import { atom } from "recoil";

// true: scroll 모드, false: 좌우로 넘기기
export const scrollModeState = atom<boolean>({
    key: 'scrollModeState',
    default: true
});

export const currentPageState = atom<number>({
    key: 'currentPageState',
    default: 0
});

export const totalPageState = atom<number>({
    key: 'totalPageState',
    default: 0
});

export const navOpenState = atom<boolean>({
    key: 'navOpenState',
    default: true
})