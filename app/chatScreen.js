import React, { Fragment, useState, useEffect } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StatusBar,
    Dimensions,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    TextInput,
    ActivityIndicator,
    Modal
} from 'react-native';
import styles from './comman/styles';
import { postChatMessage, postRecent, postChatImage } from './comman/api';
import FastImage from 'react-native-fast-image';
import CardView from 'react-native-cardview';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconThree from 'react-native-vector-icons/Entypo';
import ImageModal from './ImageModal';
import { connect } from 'react-redux';
import RNFetchBlob from 'rn-fetch-blob';
import { imageEnvironment } from './environment/environment'
import { saveStorageData, saveUserToken, saveRecentConv, addInConv, resetConv } from './actions';
import IconTwo from 'react-native-vector-icons/AntDesign';
import IconFour from 'react-native-vector-icons/Ionicons';
import IconFeather from 'react-native-vector-icons/Feather';
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Actions } from 'react-native-router-flux';
import { img, baseColor, statusBarColor, chatColor } from './comman/constants';
import { request_storage_runtime_permission } from './comman/methods';

import moment from 'moment';
// import Modal from "react-native-modal";
import ImagePicker from 'react-native-image-picker';


const { width, height } = Dimensions.get('window');

function chatScreen(props) {


    let [conversationID, setConversationID] = useState('');
    let [me, setMe] = useState('');
    let [other, setOther] = useState('');
    let [message, setMessage] = useState('');
    let [modalVisible, setModalVisible] = useState(false);
    let [modalVisibleImage, setModalVisibleImage] = useState(false);
    let [showImage, setShowImage] = useState('');




    //let [chattingData, setChattingData] = useState([]);

    useEffect(() => {

        setConversationID(props.data._id)

        if (props.data.participants[0] === props.storageData.storageData.phone) {
            setMe(props.data.participants[0])
            setOther(props.data.participants[1])
        }
        else {
            setMe(props.data.participants[1])
            setOther(props.data.participants[0])
        }

        postRecent(props.data._id, props.storageData.userToken).then(result => {

            //setChattingData(result.data.data)
            props.saveRecentConv(result.data.data)

        }).catch(err => {
            console.log(err)
        });


    }, []);


    useEffect(() => {

        //setChattingData([...chattingData, props.storageData.message])
        if (props.storageData.message.conversationId === conversationID) {
            let data = {
                add: props.storageData.message,
                convDetails: props.storageData.convDetails
            }
            props.addInConv(data)
        }

    }, [props.storageData.message]);


    useEffect(() => {

    }, [props.storageData.convDetails]);

    const imageFunction = (data) => {
        setShowImage(data)
        setModalVisibleImage(true)
    }

    const renderChatMessages = () => {
        return props.storageData.convDetails.map((item,index) => {
            return (
                item.sender === me ?
                    <View                     key={`chat-message-${index}`}
                     style={{ width: width, flexDirection: 'row-reverse' }}>

                        {item.type === 'text' ?
                            <View style={{ backgroundColor: 'transparent', padding: 10, borderRadius: 10, width: width * 0.8 }}>
                                <View style={{ backgroundColor: chatColor, borderRadius: 10 }}>
                                    <Text
                                        style={{ fontSize: width * 0.05, color: 'black', paddingVertical: height * 0.01, paddingHorizontal: width * 0.04 }}
                                    >
                                        {item.body}
                                    </Text>
                                    <Text
                                        style={{ fontSize: width * 0.03, color: 'black', marginBottom: height * 0.01, textAlign: 'right', alignSelf: 'stretch', marginRight: width * 0.04 }}
                                    >
                                        {moment(item.time).format('lll').toString()}
                                    </Text>
                                </View>
                            </View>
                            : null}
                        {item.type === 'image' ?
                            <View style={{ backgroundColor: 'transparent', padding: 10, borderRadius: 10 }}>
                                <TouchableOpacity
                                    style={{ backgroundColor: chatColor, borderRadius: 10, paddingHorizontal: width * 0.06 }}
                                    onPress={() => imageFunction(imageEnvironment + item.ipfsPath)}
                                >
                                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                        {item.loading ?
                                            <View style={{ position: 'absolute', zIndex: 1, backgroundColor: 'rgba(0, 0, 0, 0.6)', width: width * 0.4, height: height * 0.3, alignItems: 'center', justifyContent: 'center' }}>
                                                <ActivityIndicator size={width * 0.1} color="white" />
                                            </View> :
                                            null}
                                        {item.error ?
                                            <View style={{ position: 'absolute', zIndex: 1, backgroundColor: 'rgba(0, 0, 0, 0.6)', width: width * 0.4, height: height * 0.3, alignItems: 'center', justifyContent: 'center' }}>
                                                <Text style={{ color: 'white' }}>Something went wrong</Text>
                                            </View> :
                                            null}
                                        <FastImage
                                            style={{ width: width * 0.4, height: height * 0.3, alignItems: 'center', justifyContent: 'center', marginTop: height * 0.04 }}
                                            source={{
                                                uri: item.ipfsPath ? imageEnvironment + item.ipfsPath : img,
                                                priority: FastImage.priority.low,
                                            }}
                                            resizeMode={FastImage.resizeMode.contain}
                                        />
                                    </View>
                                    <Text
                                        style={{ marginTop: 4, fontSize: width * 0.03, color: 'black', marginBottom: height * 0.01, textAlign: 'right', alignSelf: 'stretch', marginRight: width * 0.04 }}
                                    >
                                        {moment(item.time).format('lll').toString()}
                                    </Text>
                                </TouchableOpacity>
                            </View> : null
                        }
                        {
                            item.type === 'video' ?
                                <View style={{ backgroundColor: 'transparent', padding: 10, borderRadius: 10 }}>
                                    <TouchableOpacity
                                        style={{ backgroundColor: chatColor, borderRadius: 10, paddingHorizontal: width * 0.06 }}
                                        onPress={() => Actions.PlayVideo({ videoUrl: imageEnvironment + item.ipfsPath, userName: props.item.name ? props.item.name : 'User' })}
                                    >
                                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                            {item.loading ?
                                                <View style={{ position: 'absolute', zIndex: 1, backgroundColor: 'black', width: width * 0.4, height: height * 0.3, alignItems: 'center', justifyContent: 'center' }}>
                                                    <ActivityIndicator size={width * 0.1} color="white" />
                                                </View> :
                                                null}
                                            {item.error ?
                                                <View style={{ position: 'absolute', zIndex: 1, backgroundColor: 'black', width: width * 0.4, height: height * 0.3, alignItems: 'center', justifyContent: 'center' }}>
                                                    <Text style={{ color: 'white' }}>Something went wrong</Text>
                                                </View> :
                                                null}

                                            <View style={{ position: 'absolute', zIndex: 1, backgroundColor: 'transparent', width: width * 0.4, height: height * 0.3, alignItems: 'center', justifyContent: 'center' }}>
                                                <IconFontAwesome5
                                                    name="play"
                                                    color="white"
                                                    size={width * 0.07}
                                                />
                                            </View>
                                            <FastImage
                                                style={{ width: width * 0.4, height: height * 0.3, alignItems: 'center', justifyContent: 'center', marginTop: height * 0.04 }}
                                                source={{
                                                    uri: item.ipfsPath ? imageEnvironment + item.ipfsPath : img,
                                                    priority: FastImage.priority.low,
                                                }}
                                                resizeMode={FastImage.resizeMode.contain}
                                            />
                                        </View>
                                        <Text
                                            style={{ marginTop: 4, fontSize: width * 0.03, color: 'black', marginBottom: height * 0.01, textAlign: 'right', alignSelf: 'stretch', marginRight: width * 0.04 }}
                                        >
                                            {moment(item.time).format('lll').toString()}
                                        </Text>
                                    </TouchableOpacity>
                                </View> : null
                        }

                    </View >

                    :
                    <View  key={`chat-message-${index}`} style={{ width: width, flexDirection: 'row' }}>

                        {item.type === 'text' ?
                            <View style={{ backgroundColor: 'transparent', padding: 10, borderRadius: 10, width: width * 0.8 }}>
                                <View style={{ backgroundColor: '#dfdce3', borderRadius: 10 }}>

                                    <Text
                                        style={{ fontSize: width * 0.05, color: 'black', paddingVertical: height * 0.01, paddingHorizontal: width * 0.04 }}
                                    >
                                        {item.body}
                                    </Text>
                                    <Text
                                        style={{ fontSize: width * 0.03, color: 'black', marginBottom: height * 0.01, textAlign: 'left', alignSelf: 'stretch', marginLeft: width * 0.04 }}
                                    >
                                        {moment(item.time).format('lll').toString()}
                                    </Text>
                                </View>
                            </View>
                            : null}
                        {item.type === 'image' ?
                            <View style={{ backgroundColor: 'transparent', padding: 10, borderRadius: 10 }}>
                                <TouchableOpacity
                                    onPress={() => imageFunction(imageEnvironment + item.ipfsPath)}
                                    style={{ backgroundColor: '#dfdce3', borderRadius: 10, paddingHorizontal: width * 0.06 }}>

                                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                        <FastImage
                                            style={{ width: width * 0.4, height: height * 0.3, alignItems: 'center', justifyContent: 'center', marginTop: height * 0.04 }}
                                            source={{
                                                uri: item.ipfsPath ? imageEnvironment + item.ipfsPath : img,
                                                priority: FastImage.priority.low,
                                            }}
                                            resizeMode={FastImage.resizeMode.contain}
                                        />
                                        <Text
                                            style={{ marginTop: 4, fontSize: width * 0.03, color: 'black', marginBottom: height * 0.01, textAlign: 'left', alignSelf: 'stretch', marginLeft: width * 0.04 }}
                                        >
                                            {moment(item.time).format('lll').toString()}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View> : null
                        }
                        {item.type === 'video' ?
                            <View style={{ backgroundColor: 'transparent', padding: 10, borderRadius: 10 }}>
                                <TouchableOpacity
                                    onPress={() => Actions.PlayVideo({ videoUrl: imageEnvironment + item.ipfsPath, userName: props.item.name ? props.item.name : 'User' })}
                                    style={{ backgroundColor: '#dfdce3', borderRadius: 10, paddingHorizontal: width * 0.06 }}>

                                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                        <View style={{ position: 'absolute', zIndex: 1, backgroundColor: 'transparent', width: width * 0.4, height: height * 0.3, alignItems: 'center', justifyContent: 'center' }}>
                                            <IconFontAwesome5
                                                name="play"
                                                color="white"
                                                size={width * 0.07}
                                            />
                                        </View>
                                        <FastImage
                                            style={{ width: width * 0.4, height: height * 0.3, alignItems: 'center', justifyContent: 'center', marginTop: height * 0.04 }}
                                            source={{
                                                uri: item.ipfsPath ? imageEnvironment + item.ipfsPath : img,
                                                priority: FastImage.priority.low,
                                            }}
                                            resizeMode={FastImage.resizeMode.contain}
                                        />
                                        <Text
                                            style={{ marginTop: 4, fontSize: width * 0.03, color: 'black', marginBottom: height * 0.01, textAlign: 'left', alignSelf: 'stretch', marginLeft: width * 0.04 }}
                                        >
                                            {moment(item.time).format('lll').toString()}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View> : null
                        }


                    </View >

            )
        })
    }


    async function downloadImage() {
        await request_storage_runtime_permission(showImage)
    }




    const renderModal = () => {
        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisibleImage}
            >

                <View style={{ height: height, width: width, backgroundColor: 'black' }}>
                    <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between' }}>
                        <TouchableOpacity
                            onPress={() => {
                                setModalVisibleImage(false)
                            }}>
                            <IconThree
                                style={{ marginTop: height * 0.02 }}
                                name="cross"
                                color="white"
                                size={width * 0.12}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                downloadImage()
                            }}>
                            <IconFeather
                                style={{ marginTop: height * 0.02, marginLeft: width * 0.04 }}
                                name="download"
                                color="white"
                                size={width * 0.1}
                            />
                        </TouchableOpacity>
                    </View>

                    <FastImage
                        style={{ width: width, height: width, marginTop: height * 0.15 }}
                        source={{
                            uri: showImage,
                            priority: FastImage.priority.high,
                        }}
                        resizeMode={FastImage.resizeMode.cover}
                    />
                </View>

            </Modal >
        )
    }


    const selectVideoTapped = () => {
        setModalVisible(false)
        const options = {
            title: 'Video Picker',
            takePhotoButtonTitle: 'Take Video...',
            mediaType: 'video',
            videoQuality: 'medium',
        };

        ImagePicker.showImagePicker(options, response => {
            if (response.didCancel) {
                console.log('User cancelled photo picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {

                console.log(response)

                let temp = {
                    conversationId: conversationID,
                    sender: me,
                    reciever: other,
                    userPhoto: response.uri,
                    type: "video",
                    time: Date.now(),
                    loading: true
                }

                let data = {
                    add: temp,
                    convDetails: props.storageData.convDetails
                }


                let formData = new FormData();

                formData.append('conversationId', conversationID);
                formData.append('sender', me);
                formData.append('reciever', other);
                formData.append('type', 'video');
                formData.append('userPhoto', {
                    uri: response.uri,
                    name: response.path,
                    type: 'video/mp4'
                });

                postChatImage(props.storageData.userToken, formData).then(result => {

                    if (!result.data.error) {
                        let dumpData = {
                            conversationId: conversationID,
                            sender: me,
                            reciever: other,
                            type: "video",
                            time: Date.now(),
                            loading: false,
                            ipfsPath: result.data.data.ipfsPath
                        }

                        let LoadingData = {
                            add: dumpData,
                            convDetails: props.storageData.convDetails
                        }
                        props.addInConv(LoadingData)
                    }
                    else {

                        let dumpData = {
                            conversationId: conversationID,
                            sender: me,
                            reciever: other,
                            type: "video",
                            time: Date.now(),
                            loading: false,
                            error: true,
                        }

                        let LoadingData = {
                            add: dumpData,
                            convDetails: props.storageData.convDetails
                        }
                        props.addInConv(LoadingData)

                    }

                }).catch(err => {
                    console.log(err)
                });
            }
        });
    }



    const selectPhotoTapped = () => {
        setModalVisible(false)
        const options = {
            quality: 0.2,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true,
            },
        };

        ImagePicker.showImagePicker(options, response => {
            if (response.didCancel) {
                console.log('User cancelled photo picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {

                let formData = new FormData();

                formData.append('conversationId', conversationID);
                formData.append('sender', me);
                formData.append('reciever', other);
                formData.append('type', 'image');
                formData.append('userPhoto', {
                    uri: response.uri,
                    name: response.fileName,
                    type: 'image/jpg'
                });

                postChatImage(props.storageData.userToken, formData).then(result => {

                    if (!result.data.error) {
                        let dumpData = {
                            conversationId: conversationID,
                            sender: me,
                            reciever: other,
                            type: "image",
                            time: Date.now(),
                            loading: false,
                            ipfsPath: result.data.data.ipfsPath
                        }

                        let LoadingData = {
                            add: dumpData,
                            convDetails: props.storageData.convDetails
                        }
                        props.addInConv(LoadingData)
                    }
                    else {

                        let dumpData = {
                            conversationId: conversationID,
                            sender: me,
                            reciever: other,
                            type: "image",
                            time: Date.now(),
                            loading: false,
                            error: true,
                        }

                        let LoadingData = {
                            add: dumpData,
                            convDetails: props.storageData.convDetails
                        }
                        props.addInConv(LoadingData)

                    }

                }).catch(err => {
                    console.log(err)
                });
            }
        });
    }

    const renderSendBox = () => {
        return (
            <View
                style={{
                    width: width,
                    backgroundColor: '#e8eaed',
                    height: height * 0.08,
                    paddingHorizontal: width * 0.02,
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center'
                }}
            >
                <View
                    style={{ height: height * 0.064, borderColor: 'gray', borderWidth: 1, width: width * 0.82, borderRadius: 10, backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10 }}
                >
                    <TextInput
                        style={{ height: height * 0.05, width: width * 0.68, backgroundColor: 'white', fontSize: width * 0.04 }}
                        placeholder={props.storageData.lan.enter_text}
                        multiline={true}
                        numberOfLines={40}
                        value={message}
                        onChangeText={messageText => {
                            setMessage(messageText)
                        }}
                    />
                    <TouchableOpacity
                        style={{ alignItems: 'center', justifyContent: 'center' }}
                        onPress={() => setModalVisible(true)}
                    >
                        <IconFour
                            name="md-attach"
                            color="gray"
                            size={width * 0.06}
                        />
                    </TouchableOpacity>
                </View>


                <TouchableOpacity
                    style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: baseColor, height: width * 0.12, width: width * 0.12, borderRadius: width * 0.12 }}
                    onPress={() => sendMessage()}
                >
                    <Icon
                        name="send"
                        color="white"
                        size={width * 0.06}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    const sendMessage = () => {

        if (message !== '') {

            let temp = {
                conversationId: conversationID,
                sender: me,
                reciever: other,
                body: message,
                type: "text",
                time: Date.now()
            }

            let data = {
                conversationId: conversationID,
                sender: me,
                reciever: other,
                message: message,
                type: "text"
            }

            let dataConv = {
                add: temp,
                convDetails: props.storageData.convDetails
            }
            props.addInConv(dataConv)


            //setChattingData([...chattingData, temp])
            setMessage('')
            postChatMessage(data, props.storageData.userToken).then(result => {


            }).catch(err => {
                console.log(err)
            });


        }

    }

    const onBack = () => {
        props.resetConv();
        Actions.pop()
    }

    const renderHeader = () => {
        return (
            <View
                style={styles.cardStyle}
            >
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                    <TouchableOpacity
                        onPress={() => onBack()}
                    >
                        <IconTwo
                            style={{ marginLeft: width * 0.04 }}
                            name="arrowleft"
                            color="white"
                            size={width * 0.07}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}
                        onPress={() => Actions.viewProfile({ item: props.item, recieverInfo: props.data.recieverInfo[0] })}
                    >
                        <FastImage
                            style={{ width: width * 0.12, height: width * 0.12, borderRadius: width * 0.12, marginLeft: width * 0.04 }}
                            source={
                                props.data.recieverInfo[0] ?
                                    props.data.recieverInfo[0].profilePhoto ?
                                        {
                                            uri: imageEnvironment + props.data.recieverInfo[0].profilePhoto,
                                            priority: FastImage.priority.low,
                                        } : img
                                    : img
                            }
                            resizeMode={FastImage.resizeMode.cover}
                        />

                        <Text style={{
                            fontSize: width * 0.06,
                            color: "white", marginLeft: width * 0.02
                        }}>{props.item.name ? props.item.name : 'User'}</Text>
                    </TouchableOpacity>
                </View>
            </View >
        )
    }



    return (
        <Fragment>

            <StatusBar barStyle="light-content" backgroundColor={statusBarColor} />
            <SafeAreaView>
                <KeyboardAvoidingView
                    style={{
                        backgroundColor: 'white',
                        height: height,
                        width: width, justifyContent: 'space-between'
                    }}
                    behavior="padding"
                    keyboardVerticalOffset={20}
                >

                    <View style={styles.center}>
                        {renderHeader()}
                    </View>
                    {/* <KeyboardAvoidingView
                        style={{
                            justifyContent: 'space-between', height: height * 0.87, width: width
                        }}
                        behavior="padding"
                        keyboardVerticalOffset={20}
                    > */}
                    <ScrollView
                        ref={ref => this.scrollView = ref}
                        onContentSizeChange={(contentWidth, contentHeight) => {
                            this.scrollView.scrollToEnd({ animated: false });
                        }}

                        style={{ flex: 1 }}
                    >
                        {renderChatMessages()}
                    </ScrollView>
                    <View>
                        {renderSendBox()}
                    </View>
                    {/* </KeyboardAvoidingView> */}

                </KeyboardAvoidingView>
                {renderModal()}
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={modalVisible}
                    transparent={true}
                >
                    <TouchableOpacity
                        onPress={() => setModalVisible(false)}
                        style={{ flexDirection: 'column-reverse', height: height, backgroundColor: 'transparent' }}
                    >
                        <View
                            style={{ height: height * 0.2, width: width, backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-around' }}
                        >
                            <TouchableOpacity
                                style={{ alignItems: 'center', justifyContent: 'center' }}
                                onPress={() => selectPhotoTapped()}
                            >
                                <IconThree
                                    name="images"
                                    color={baseColor}
                                    size={width * 0.14}
                                />
                                <Text
                                    style={{ fontSize: width * 0.04, color: 'black', paddingVertical: height * 0.01, paddingHorizontal: width * 0.04 }}
                                >
                                    {props.storageData.lan.image_value}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ alignItems: 'center', justifyContent: 'center' }}
                                onPress={() => selectVideoTapped()}
                            >
                                <IconThree
                                    name="video-camera"
                                    color={baseColor}
                                    size={width * 0.14}
                                />
                                <Text
                                    style={{ fontSize: width * 0.04, color: 'black', paddingVertical: height * 0.01, paddingHorizontal: width * 0.04 }}
                                >
                                    {props.storageData.lan.video_value}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                </Modal>
            </SafeAreaView>

        </Fragment>
    );
}


function mapStateToProps(state) {
    return {
        storageData: state
    }
}

export default connect(mapStateToProps, { saveStorageData, saveUserToken, saveRecentConv, addInConv, resetConv })(chatScreen)
