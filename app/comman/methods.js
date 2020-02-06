import { Alert, PermissionsAndroid } from 'react-native';

import RNFetchBlob from 'rn-fetch-blob';

export async function request_storage_runtime_permission(showImage) {

    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
                'title': 'ReactNativeCode Storage Permission',
                'message': 'ReactNativeCode App needs access to your storage to download Photos.'
            }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            let PictureDir = RNFetchBlob.fs.dirs.PictureDir
            var date = new Date();

            RNFetchBlob
                .config({
                    path: PictureDir + "/Gammino" + Math.floor(date.getTime()
                        + date.getSeconds() / 2) + 'gamminoApp.jpg',
                })
                .fetch('GET', showImage, {
                    //some headers ..
                })
                .then((res) => {
                    Alert.alert("Image Downloaded Successfully.");
                })
        }
        else {

            Alert.alert("Storage Permission Not Granted");

        }
    } catch (err) {
        console.warn(err)
    }
}
