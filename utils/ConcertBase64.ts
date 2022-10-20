import * as FileSystem from "expo-file-system";

export const convertBase64ToPng = (file: string, fileName: any):string => {
    const path = FileSystem.cacheDirectory + `${fileName}.png`;
    FileSystem.writeAsStringAsync(
        path,
        file.replace("data:image/png;base64,", ""),
        { encoding: FileSystem.EncodingType.Base64 }
    )
    .then(() => FileSystem.getInfoAsync(path))
    .then(console.log)
    .catch(console.error);
    console.log(path)
    return path
}