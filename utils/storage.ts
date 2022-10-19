import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (array:Array<object>|object,name:string) => {
  try {
    const jsonValue = JSON.stringify(array)
    await AsyncStorage.setItem(name, jsonValue)
  } catch (e) {
    console.log(e)
  }
}

export const getData = async (name:string) => {
    return JSON.parse(await AsyncStorage.getItem(name))
  }