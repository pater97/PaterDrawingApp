// REACT
import React, { FC, useEffect, useState } from 'react'
// RN
import { View, Text, Image, ScrollView } from 'react-native'
// STORAGE
import { getData } from '../utils/storage'
// filesistem
import { convertBase64ToPng } from '../utils/ConcertBase64';
// medialibrary
import * as MediaLibrary from 'expo-media-library';
// stile
import CommonStyles from '../styles/CommonStyles'
// component
import Header from '../components/ui/Header'
import ModalImage from '../components/ui/ModalImage'
import ButtonBox from '../components/ui/ButtonBox'


// props
interface PreviewProps {
    navigation: any
}
// state
interface State {
    photoArray: Array<string>
}

const initialState: State = {
    photoArray: []
}

const Preview: FC<PreviewProps> = ({ navigation }) => {

    // stati
    const [state, setState] = useState<State>(initialState)

    // useEffect che popola lo stato array di foto
    useEffect(() => {
        getPhoto()
    }, [])

    // chiamata allo storage per popolare array
    const getPhoto = async (): Promise<void> => {
        let arrayPhoto = await getData('localPhoto');
        console.log(arrayPhoto);
        setState({
            ...state,
            photoArray: arrayPhoto
        })
    }

    // navigazione
    const goBack = (): void => {
        navigation.goBack()
    }
    // salvataggio di una singola foto
    const savePhoto =  (index:number) => async ():Promise<void> => {
        // richiedo il permesso e controllo
        const { status } = await MediaLibrary.requestPermissionsAsync()
        if (status !== 'granted') {
            return alert('Non disponi dei permessi per accedere alla libreria');
        };
        // math random per avere un nome univoco
        let uniqueNumber = Math.floor(Math.random()*1000)
        // convertire file da base64 a png
        const imageConverted = convertBase64ToPng(state.photoArray[index], `paterDrawPic${uniqueNumber.toString()}`)
        await MediaLibrary.createAssetAsync(imageConverted)
        alert('immagine salvata in galleria')
    }

    // consente di salvare tutto in un album ( funzione da sviluppare)
    const saveAll = async (): Promise<void> => {
        // richiedo il permesso
        const { status } = await MediaLibrary.requestPermissionsAsync()
        if (status !== 'granted') {
            return alert('non sei abilitato');
        };
        // await MediaLibrary.createAssetAsync(path)
        // verifico che l'album esista e in caso contrario lo creo
        let chekAlbum = await MediaLibrary.getAlbumAsync('paterDrawing')
        if (chekAlbum === null) {
            // convertire file da base64 a png
            const imageConverted = convertBase64ToPng(state.photoArray[0], 'coverAlbum')
            console.log(imageConverted)
            await MediaLibrary.createAlbumAsync('paterDrawing', imageConverted, false)
            alert('album creato!')
        }
        console.log('qui aggiungo gli assets')
        console.log(chekAlbum)
    }

    return (
        <View style={[CommonStyles.genericContainer, CommonStyles.lightColorbg]}>
            <Header
                buttonVisible={true}
                title={'PREVIEW'}
                headerFunction={goBack}
            />
            <View>
                <Text style={[CommonStyles.boldFont, CommonStyles.branColorText, CommonStyles.textCenter, CommonStyles.titleFont]}>
                    PREVIEW
                </Text>
                <Text style={[CommonStyles.boldFont, CommonStyles.secondaryColorText, CommonStyles.textCenter]}>
                    See all your projects
                </Text>
                {/* per salvare un intero album nella galleria( da implementare) */}
                {/* <ButtonBox
                    label='SALVA NELLA GALLERY'
                    callback={saveAll}
                /> */}
            </View>
            <ScrollView contentContainerStyle={[CommonStyles.spaceAround, CommonStyles.row]}>
                {
                    state.photoArray.length > 0 &&

                    state.photoArray.map((photo, index) => {
                        return (
                            <View key={index} style={[CommonStyles.marginY, { width: '20%', marginHorizontal: 3 }]}>
                                <View style={[CommonStyles.lightColorbg, CommonStyles.paddingContainer2, { borderRadius: 10, borderWidth: 3, borderColor: '#858AE3' }]}>
                                    <Image
                                        resizeMode={"contain"}
                                        style={{ width: '100%', height: 150 }}
                                        source={{ uri: photo }}
                                    />
                                </View>
                                <ModalImage
                                    passImage={photo}
                                />
                                <ButtonBox
                                callback={savePhoto(index)}
                                label={'salva foto in galleria'}
                                />
                            </View>
                        )
                    })
                }
            </ScrollView>
        </View>
    )
}

export default Preview