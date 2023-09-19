import { ParamListBase } from '@react-navigation/native';
import IBook from './IBook';

export default interface IParamList extends ParamListBase {
    Home: undefined;
    Viewer: {
        dirPathList: string[];
        dirIdx: number;
        next?: boolean;
    };
    EpisodeList: { book: IBook };
}
