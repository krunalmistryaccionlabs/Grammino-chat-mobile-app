import { StyleSheet, Dimensions } from 'react-native';
import { baseColor } from './constants';

const { width, height } = Dimensions.get('window');


export default StyleSheet.create({
    titleFont: {
        fontSize: width * 0.06,
        color: "white"
    },
    cardHeading: {
        fontSize: width * 0.08,
        textAlign: "center",
        color: "#6200ee"
    },
    cardStyle: {
        width: width,
        backgroundColor: baseColor,
        height: height * 0.1
    },
    cardStyleScan: {
        width: width * 0.46,
        backgroundColor: 'white',
        height: height * 0.3,
        padding: 12
    },
    cardStyleGen: {
        width: width * 0.95,
        backgroundColor: 'white',
        height: height * 0.3,
        marginTop: height * 0.04,
        padding: 12
    },
    cardStyleQR: {
        width: width * 0.95,
        backgroundColor: 'white',
        height: width * 0.95,
        marginTop: height * 0.14,
        padding: 12,
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        backgroundColor: 'white',
        height: height,
        width: width
    },
    containerListMessages: {
        backgroundColor: '#3c0091',
        height: height,
        width: width
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    cardCutter: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderColor: baseColor,
        borderWidth: 1,
        borderRadius: 16
    },
    cardCutterQR: {
        width: width * 0.85,
        height: width * 0.85,
        borderColor: baseColor,
        borderWidth: 2,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textModal: {
        width: width * 0.95,
        backgroundColor: 'white',
        height: height * 0.7,
        padding: 12,
        borderRadius: 16
    },
    textAreaContainer: {
        borderColor: baseColor,
        borderWidth: 1,
        padding: 5,
        width: width * 0.8,
        borderRadius: 16
    },
    textArea: {
        height: 150,
        justifyContent: "flex-start"
    },
    button: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderColor: baseColor,
        borderWidth: 1,
        borderRadius: 16
    },
    buttonHeading: {
        fontSize: width * 0.02,
        textAlign: "center",
        color: "#6200ee"
    },
    viewShotImage: {
        width: width * 0.95,
        paddingVertical: height * 0.06,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    viewShotImageCutter: {
        width: width * 0.85,
        paddingVertical: height * 0.06,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: baseColor,
        borderWidth: 2,
        borderRadius: 16
    },
    floatingButton: {
        width: width * 0.16,
        height: width * 0.16,
        borderRadius: width * 0.16,
        backgroundColor: baseColor,
        position: 'absolute',
        bottom: height * 0.1,
        right: width * 0.06,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
