export default interface IBook{
    name: string // 책 제목 = 폴더명
    path: string // 책 path
    image?: string // 책 표지
    progress?: string // 읽던 화 수
}