// navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// RN
import { SafeAreaView, StatusBar } from 'react-native';
// SCREEN
import Home from './screen/Home';
import Drawing from './screen/Drawing';
// style
import CommonStyles from './styles/CommonStyles';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={CommonStyles.genericContainer}>
      <StatusBar backgroundColor={'#4E148C'}/>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home' screenOptions={{headerShown: false}} >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Drawing" component={Drawing} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}


