// import per il funzionamento 
import { FC } from "react"
import { Text, View } from 'react-native';
// stile
import CommonStyles from "../styles/CommonStyles";
// components
import ButtonBox from "../components/ui/ButtonBox";
import Header from "../components/ui/Header";


// props
interface HomeProps {
  navigation: any;
}



const Home: FC<HomeProps> = ({ navigation }) => {

  const goToDrawing = (): void => {
    navigation.navigate('Drawing')
  }


  return (
    <View style={[CommonStyles.container3, CommonStyles.brandColorBg]}>
      <Header
        buttonVisible={false}
        title={'HOME'}
      />
      <Text>
        Home
      </Text>
      
      <ButtonBox
        // callback={goToDrawing}
        callback={goToDrawing}
        label={'DISEGNA'}
      />
    </View>
  )
}

export default Home