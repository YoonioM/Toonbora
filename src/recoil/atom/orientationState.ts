import { atom } from "recoil";

// true: 가로모드, false: 세로모드
const orientationState = atom<boolean>({
    key: 'orientationState',
    default: false
});

export default orientationState;