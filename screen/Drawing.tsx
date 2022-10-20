// import per il funzionamento 
import { FC, useRef, useState, useEffect } from "react"
import { View, Text } from 'react-native';
// stile
import CommonStyles from "../styles/CommonStyles";
import { DrawStyle } from "../styles/DrawStyle";
// signature
import Signature, {
    SignatureViewRef,
} from "react-native-signature-canvas";
// component
import ButtonBox from "../components/ui/ButtonBox";
import Header from "../components/ui/Header";
// slider
import Slider from '@react-native-community/slider';
// color picker
import { TriangleColorPicker, fromHsv } from 'react-native-color-picker'
// file storage
import { storeData, getData } from "../utils/storage";
// imagePicker
import * as ImagePicker from 'expo-image-picker';

// props
interface DrawingProps {
    navigation: any;
}
// state
interface State {
    settingVisible: boolean,
    image: any
}
// inizializzo
const initialState: State = {
    settingVisible: false,
    image: null
}

// colore vecchio
let colorHex: string = ''
let arrayPhoto: Array<string> = []

const Drawing: FC<DrawingProps> = ({ navigation }) => {

    // state
    const [state, setState] = useState<State>(initialState)
    // imposto il riferimento
    const ref = useRef<SignatureViewRef>(null);

    // popolo array immagine per non perderle 
    useEffect(() => {
        getPhoto()
    }, [])

    const getPhoto = async (): Promise<void> => {
        arrayPhoto = await getData('localPhoto')
    }

    const goBack = (): void => {
        navigation.goBack()
    }
    // gestisce il salvataggio di un file vuoto
    const handleEmpty = () => {
        console.log("Empty");
    };

    // gestisce la pulizia del foglio
    const handleClear = (): void => {
        ref.current?.clearSignature();
        console.log("clear success!");
    };

    // gestisce il torna indietro di uno 
    const undo = (): void => {
        ref.current?.undo()
    }

    // gestisce il vai avanti
    const redo = (): void => {
        ref.current?.redo()
    }
    // gomma
    const erase = (): void => {
        ref.current?.erase()
    }
    // penna
    const draw = (): void => {
        ref.current?.draw()
    }
    const menageSetting = (): void => {
        setState({
            ...state,
            settingVisible: !state.settingVisible
        })
    }
    // grandezza pennello
    const setPenSize = (value: number) => {
        console.log(value)
        ref.current?.changePenSize(value, value)
    }
    // colore
    const setColor = (color: any): void => {
        colorHex = fromHsv(color)
        ref.current?.changePenColor(colorHex)
    }
    // leggere il file prima del salvataggio
    const save = (): void => {
        ref.current?.readSignature()
    }
    // salvataggio
    const handleOK = (signature: string) => {
        arrayPhoto.push(signature)
        storeData(arrayPhoto, 'localPhoto')
        alert('immagine salvata')
    };
    // inserire immagine
    const pickImage = async (): Promise<void> => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
            base64: true
        });

        console.log(result);

        if (!result.cancelled) {
            setState({
                ...state,
                image: result.base64
            })
        }
    };

    return (
        <View style={[CommonStyles.genericContainer, CommonStyles.fullScreenSize, CommonStyles.positionRelative]}>
            <Header
                buttonVisible={true}
                title={'DRAWING TABLE'}
                headerFunction={goBack}
            />
            <Signature
                ref={ref}
                onOK={handleOK}
                onEmpty={handleEmpty}
                webStyle={DrawStyle}
                backgroundColor={'#fff'}
                dataURL={state.image === undefined ? state.image
                    : "data:image/jpg;base64," + state.image} 
                bgHeight={CommonStyles.fullScreenSize.height}
                bgWidth={CommonStyles.fullScreenSize.width}

            />
            {/* pannello di controllo */}
            <View style={[CommonStyles.genericContainer, CommonStyles.positionAbsolute, { top: 50, right: 10, zIndex: 9 }]}>
                {/* bottone pulizia */}
                <ButtonBox
                    label="clear"
                    callback={handleClear}
                    buttonContainerStyle={[CommonStyles.circleButton, CommonStyles.brandColorBg]}
                    buttonTextStyle={[CommonStyles.lightColorText, CommonStyles.boldFont]}
                />
                {/* bottone undo */}
                <ButtonBox
                    label="undo"
                    callback={undo}
                    buttonContainerStyle={[CommonStyles.circleButton, CommonStyles.brandColorBg, CommonStyles.marginY]}
                    buttonTextStyle={[CommonStyles.lightColorText, CommonStyles.boldFont]}
                />
                {/* bottone redo */}
                <ButtonBox
                    label="redo"
                    callback={redo}
                    buttonContainerStyle={[CommonStyles.circleButton, CommonStyles.brandColorBg]}
                    buttonTextStyle={[CommonStyles.lightColorText, CommonStyles.boldFont]}
                />
                {/* gomma */}
                <ButtonBox
                    label="Erase"
                    callback={erase}
                    buttonContainerStyle={[CommonStyles.circleButton, CommonStyles.brandColorBg, CommonStyles.marginY]}
                    buttonTextStyle={[CommonStyles.lightColorText, CommonStyles.boldFont]}
                />
                {/* penna */}
                <ButtonBox
                    label="Draw"
                    callback={draw}
                    buttonContainerStyle={[CommonStyles.circleButton, CommonStyles.brandColorBg]}
                    buttonTextStyle={[CommonStyles.lightColorText, CommonStyles.boldFont]}
                />
                {/* grandezza pennello */}
                <ButtonBox
                    label="Size&color"
                    callback={menageSetting}
                    buttonContainerStyle={[CommonStyles.circleButton, CommonStyles.brandColorBg, CommonStyles.marginY]}
                    buttonTextStyle={[CommonStyles.lightColorText, CommonStyles.boldFont]}
                />
                <ButtonBox
                    label="pickImage"
                    callback={pickImage}
                    buttonContainerStyle={[CommonStyles.circleButton, CommonStyles.brandColorBg, CommonStyles.marginY]}
                    buttonTextStyle={[CommonStyles.lightColorText, CommonStyles.boldFont]}
                />
                <ButtonBox
                    label="save"
                    callback={save}
                    buttonContainerStyle={[CommonStyles.circleButton, CommonStyles.brandColorBg, CommonStyles.marginY]}
                    buttonTextStyle={[CommonStyles.lightColorText, CommonStyles.boldFont]}
                />
            </View>
            {
                state.settingVisible &&

                <View style={[CommonStyles.genericContainer, CommonStyles.positionAbsolute, CommonStyles.lightColorbg, { top: 50, left: 10, right: 10, width: '95%', height: '90%', zIndex: 10, borderRadius: 10 }]}>
                    <View style={CommonStyles.container4}>
                        <Text style={[CommonStyles.textCenter, CommonStyles.normalTextSize, CommonStyles.marginY, CommonStyles.boldFont, CommonStyles.branColorText]}>
                            CHOOSE THE COLOR
                        </Text>
                        <TriangleColorPicker
                            onColorChange={setColor}
                            oldColor={colorHex}
                            style={{ flex: 1 }}
                            hideControls={true}
                        />
                    </View>
                    <View style={[CommonStyles.container2, CommonStyles.centerItems, CommonStyles.column]}>
                        <Text style={[{ width: '100%' }, CommonStyles.textCenter, CommonStyles.normalTextSize, CommonStyles.marginY]}>
                            SCEGLI LA DIMENSIONE
                        </Text>
                        <Slider
                            style={{ width: '100%', height: 100, }}
                            minimumValue={1}
                            maximumValue={100}
                            minimumTrackTintColor="#97DFFC"
                            maximumTrackTintColor="#4E148C"
                            thumbTintColor="#858AE3"
                            // onValueChange={setPenSize}-> probelma con il cambio colore
                            onSlidingComplete={setPenSize}

                        />
                        <ButtonBox
                            label="CLOSE"
                            callback={menageSetting}
                            buttonContainerStyle={[CommonStyles.squareButton, CommonStyles.brandColorBg]}
                            buttonTextStyle={[CommonStyles.lightColorText, CommonStyles.boldFont]}
                        />
                    </View>
                </View>
            }
        </View>
    )
}

export default Drawing;
