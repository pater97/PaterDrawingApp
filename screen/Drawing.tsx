// import per il funzionamento 
import { FC, useRef, useState } from "react"
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
import { TriangleColorPicker,fromHsv  } from 'react-native-color-picker'


// props
interface DrawingProps {
    navigation: any;
}
// state
interface State {
    settingVisible: boolean
}
// inizializzo
const initialState: State = {
    settingVisible: false
}
// colore vecchio
let colorHex: string = ''

const Drawing: FC<DrawingProps> = ({ navigation }) => {

    // state
    const [state, setState] = useState<State>(initialState)
    // imposto il riferimento
    const ref = useRef<SignatureViewRef>(null);

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
    const setColor =  (color:any):void => {
        colorHex =  fromHsv(color)
        console.log(colorHex)
        ref.current?.changePenColor(colorHex)
    }

    return (
        <View style={[CommonStyles.genericContainer, CommonStyles.fullScreenSize, CommonStyles.positionRelative]}>
            <Header
                buttonVisible={true}
                title={'DRAWING TABLE'}
                headerFunction={goBack}
            />
            <Signature
                ref={ref}
                // onEnd={handleEnd}
                onEmpty={handleEmpty}
                webStyle={DrawStyle}
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
                    buttonContainerStyle={[CommonStyles.circleButton, CommonStyles.brandColorBg,CommonStyles.marginY]}
                    buttonTextStyle={[CommonStyles.lightColorText, CommonStyles.boldFont]}
                />
            </View>
            {
                state.settingVisible &&

                <View style={[CommonStyles.genericContainer, CommonStyles.positionAbsolute, CommonStyles.lightColorbg, { top: 50, left: 10, right: 10, width: '95%', height: '90%', zIndex: 10, borderRadius: 10 }]}>
                    <View style={CommonStyles.container4}>
                        <Text style={[CommonStyles.textCenter, CommonStyles.normalTextSize, CommonStyles.marginY,CommonStyles.boldFont,CommonStyles.branColorText]}>
                            CHOOSE THE COLOR
                        </Text>
                        <TriangleColorPicker
                            onColorChange={setColor}
                            oldColor={colorHex}
                            style={{ flex: 1 }}
                            hideControls={true}
                        />
                    </View>
                    <View style={[CommonStyles.container2,CommonStyles.centerItems,CommonStyles.column]}>
                        <Text style={[{width:'100%'},CommonStyles.textCenter, CommonStyles.normalTextSize, CommonStyles.marginY]}>
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
