import { ParamListBase } from "@react-navigation/native";

export default interface IParamList extends ParamListBase {
    Home: undefined;
    Viewer: {
        dirPath: string;
    };
    BookList: undefined;
}