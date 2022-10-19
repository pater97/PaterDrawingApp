import React,{FC} from 'react';
import { Pressable,Text} from 'react-native';
// import commonStyle from '../styles/commonStyle';

interface ButtonBoxProps {
    callback:Function;
    label:string;
    callbackLong?:any;
    buttonContainerStyle?:object;
    buttonTextStyle?:object;
}

const ButtonBox:FC<ButtonBoxProps> = (props) => {

    const pressing = (): void => {
        !!props.callback()
    }


    return (
        <Pressable  style={props.buttonContainerStyle} hitSlop={10}>
            <Text style={props.buttonTextStyle} onPress={pressing} >{props.label}</Text>
        </Pressable>
    );
};


export default ButtonBox;