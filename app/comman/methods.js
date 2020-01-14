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

            downloadImage(showImage)
        }
        else {

            Alert.alert("Storage Permission Not Granted");

        }
    } catch (err) {
        console.warn(err)
    }
}


const downloadImage = (showImage) => {
    var date = new Date();
    var image_URL = showImage;
    var ext = getExtention(image_URL);
    ext = "." + ext[0];
    const { config, fs } = RNFetchBlob;
    let PictureDir = fs.dirs.PictureDir
    let options = {
        fileCache: true,
        addAndroidDownloads: {
            useDownloadManager: true,
            notification: true,
            path: PictureDir + "/image_" + Math.floor(date.getTime()
                + date.getSeconds() / 2) + ext,
            description: 'Image'
        }
    }
    config(options).fetch('GET', image_URL).then((res) => {
        Alert.alert("Image Downloaded Successfully.");
    });
}

const getExtention = (filename) => {
    return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename) :
        undefined;
}
