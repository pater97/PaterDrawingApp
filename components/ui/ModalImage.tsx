import React, { FC, useState, useEffect } from 'react';
import { Modal, StyleSheet, View, Image } from 'react-native';
// styles
import CommonStyles from '../../styles/CommonStyles';
// components
import ButtonBox from './ButtonBox';

// props
interface modalProps {
    passImage: string;
}
// states
interface State {
    modalVisible: boolean;
    image: string
}
const initialState: State = {
    modalVisible: false,
    image: ''
}

const ModalImage: FC<modalProps> = (props) => {

    const [state, setState] = useState<State>(initialState)

    // // use effect per popolare l'array di contatti
    useEffect(() => {
        let thisImage = props.passImage
        setState({
            ...state,
            image: thisImage
        })
    }, [state.modalVisible])

    const MenageModal = (): void => {
        setState({
            ...state,
            modalVisible: !state.modalVisible
        })
    }


    return (
        <View >
            <Modal
                animationType="slide"
                transparent={true}
                visible={state.modalVisible}
                onRequestClose={MenageModal}>
                <View style={[CommonStyles.genericContainer, CommonStyles.fullScreenSize]}>
                    <View style={styles.modalView}>
                        <Image
                            resizeMode={"contain"}
                            style={{ width: '100%', height: '100%' }}
                            source={{ uri: state.image }}
                        />
                        <ButtonBox
                            label={'✖'}
                            callback={MenageModal}
                            buttonContainerStyle={[CommonStyles.circleButton, CommonStyles.brandColorBg,CommonStyles.positionAbsolute,{top:10,right:10,zIndex:6}]}
                            buttonTextStyle={[CommonStyles.normalTextSize, CommonStyles.boldFont, CommonStyles.secondaryColorText]}
                        />
                    </View>
                </View>
            </Modal>
            <View style={[CommonStyles.centerItems, { height: 130 }]}>
                <ButtonBox
                    label={'GUARDA PROGETTO'}
                    callback={MenageModal}
                    buttonContainerStyle={[CommonStyles.circleButton, CommonStyles.brandColorBg]}
                    buttonTextStyle={[CommonStyles.normalTextSize, CommonStyles.boldFont, CommonStyles.secondaryColorText]}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        position: 'relative',
        margin: 20,
        width: '90%',
        height: '90%',
        backgroundColor: '#EDF2F4',
        borderRadius: 20,
        padding: 35,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    }
});

export default ModalImage;