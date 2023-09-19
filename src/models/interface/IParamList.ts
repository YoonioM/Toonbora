import { ParamListBase } from '@react-navigation/native';

export default interface IParamList extends ParamListBase {
    Home: undefined;
    Viewer: {
        dirPathList: string[];
        dirIdx: number;
    };
    BookList: undefined;
}
