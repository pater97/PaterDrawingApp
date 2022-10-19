import React, {FC} from 'react';
import { TextInput, View } from 'react-native';
// import commonStyle from '../styles/commonStyle';

interface InputBoxProps {
    callback: any;
    styleCss?:object;
    placeholder?:string;
}

const InputBox:FC<InputBoxProps> = (props) => {

    const typing = (e:any): void => {
        !!props.callback(e)
    }


  return (
    <View>
      <TextInput style={props.styleCss} onChangeText={typing} placeholder={props.placeholder} />
    </View>
  );
};


export default InputBox;