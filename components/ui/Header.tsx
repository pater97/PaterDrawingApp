import React,{FC} from 'react'
import { View,Text } from 'react-native'
import ButtonBox from './ButtonBox'
import CommonStyles from '../../styles/CommonStyles'

interface HeaderProps {
    title: string;
    headerFunction?: any;
    buttonVisible: boolean;
}


const Header:FC<HeaderProps> = (props) => {
    
    const callbackHeader = ():any => {
        !!props.headerFunction()
    }

  return (
    <View style={[,CommonStyles.brandColorBg,CommonStyles.paddingHeader,CommonStyles.rowHeader]}>
        { props.buttonVisible ?
            <ButtonBox
                label={'⬅'}
                callback={callbackHeader}
                buttonContainerStyle={[CommonStyles.buttonBoxHeader]}
                buttonTextStyle={[CommonStyles.boldFont,CommonStyles.normalTextSize,CommonStyles.lightColorText]}
                />
            :
            <Text></Text>
        }
        <Text style={[CommonStyles.textCenter,CommonStyles.lightColorText,CommonStyles.boldFont,CommonStyles.normalTextSize]}>
            {props.title}
        </Text>
        <Text></Text>
    </View>
  )
}

export default Header