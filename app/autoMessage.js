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
    Modal
} from 'react-native';
import styles from './comman/styles';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { imageEnvironment } from './environment/environment'
import { addInHelp } from './actions';
import IconTwo from 'react-native-vector-icons/AntDesign';
import { postHelpMessage, postChatImageHelp } from './comman/api';
import IconFour from 'react-native-vector-icons/Ionicons';
import IconFeather from 'react-native-vector-icons/Feather';
import IconThree from 'react-native-vector-icons/Entypo';
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { request_storage_runtime_permission } from './comman/methods';
import { Actions } from 'react-native-router-flux';
import { img, baseColor, statusBarColor, chatColor, conversationIdAutoMessage, recieverAutoMessage } from './comman/constants';
import moment from 'moment';
import ImagePicker from 'react-native-image-picker';

const { width, height } = Dimensions.get('window');

function autoMessage(props) {

    let [showImage, setShowImage] = useState('');
    let [modalVisibleImage, setModalVisibleImage] = useState(false);
    let [message, setMessage] = useState('');
    let [modalVisible, setModalVisible] = useState(false);






    const renderChatMessages = () => {
        return props.storageData.helpMessages.map((item) => {
            return (
                item.sender === props.storageData.storageData.phone
                    ?
                    <View style={{ width: width, flexDirection: 'row-reverse' }}>
                        {item.type === 'image' ?
                            < View style={{ backgroundColor: 'transparent', padding: 10, borderRadius: 10 }}>
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
                            </View> : null}

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
                        {
                            item.type === 'video' ?
                                <View style={{ backgroundColor: 'transparent', padding: 10, borderRadius: 10 }}>
                                    <TouchableOpacity
                                        style={{ backgroundColor: chatColor, borderRadius: 10, paddingHorizontal: width * 0.06 }}
                                        onPress={() => Actions.PlayVideo({ videoUrl: imageEnvironment + item.ipfsPath, userName: 'User' })}
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

                    </View>
                    :
                    <View style={{ width: width, flexDirection: 'row' }}>

                        {item.type === 'image' ?
                            < View style={{ backgroundColor: 'transparent', padding: 10, borderRadius: 10 }}>
                                <TouchableOpacity
                                    onPress={() => imageFunction(imageEnvironment + item.ipfsPath)}
                                    style={{ backgroundColor: '#dfdce3', borderRadius: 10, paddingHorizontal: width * 0.06 }}>

                                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={{ marginTop: height * 0.02, fontSize: width * 0.04, fontWeight: 'bold', color: statusBarColor, textAlign: 'left' }}>{item.sender}</Text>
                                        <FastImage
                                            style={{ width: width * 0.4, height: height * 0.3, alignItems: 'center', justifyContent: 'center', marginTop: height * 0.01 }}
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
                            </View> : null}

                        {item.type === 'text' ?
                            <View style={{ backgroundColor: 'transparent', padding: 10, borderRadius: 10, width: width * 0.8 }}>
                                <View style={{ backgroundColor: '#dfdce3', borderRadius: 10 }}>
                                    <Text style={{ marginTop: height * 0.01, paddingHorizontal: width * 0.04, fontSize: width * 0.04, fontWeight: 'bold', color: statusBarColor, textAlign: 'left' }}>{item.sender}</Text>

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
                        {item.type === 'video' ?
                            <View style={{ backgroundColor: 'transparent', padding: 10, borderRadius: 10 }}>
                                <TouchableOpacity
                                    onPress={() => Actions.PlayVideo({ videoUrl: imageEnvironment + item.ipfsPath, userName: 'User' })}
                                    style={{ backgroundColor: '#dfdce3', borderRadius: 10, paddingHorizontal: width * 0.06 }}>

                                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={{ marginTop: height * 0.02, fontSize: width * 0.04, fontWeight: 'bold', color: statusBarColor, textAlign: 'left' }}>{item.sender}</Text>

                                        <View style={{ position: 'absolute', zIndex: 1, backgroundColor: 'transparent', width: width * 0.4, height: height * 0.3, alignItems: 'center', justifyContent: 'center' }}>
                                            <IconFontAwesome5
                                                name="play"
                                                color="white"
                                                size={width * 0.07}
                                            />
                                        </View>
                                        <FastImage
                                            style={{ width: width * 0.4, height: height * 0.3, alignItems: 'center', justifyContent: 'center', marginTop: height * 0.01 }}
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


    const imageFunction = (data) => {
        setShowImage(data)
        setModalVisibleImage(true)
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


                let formData = new FormData();

                formData.append('conversationId', conversationIdAutoMessage);
                formData.append('sender', props.storageData.storageData.phone);
                formData.append('reciever', recieverAutoMessage);
                formData.append('type', 'video');
                formData.append('userPhoto', {
                    uri: response.uri,
                    name: response.path,
                    type: 'video/mp4'
                });

                postChatImageHelp(props.storageData.userToken, formData).then(result => {

                    if (!result.data.error) {

                        let dumpData = {
                            conversationId: conversationIdAutoMessage,
                            sender: props.storageData.storageData.phone,
                            reciever: recieverAutoMessage,
                            type: "video",
                            time: Date.now(),
                            loading: false,
                            ipfsPath: result.data.data.ipfsPath
                        }

                        let LoadingData = {
                            add: dumpData,
                            helpMessages: props.storageData.helpMessages
                        }

                        props.addInHelp(LoadingData)

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

                formData.append('conversationId', conversationIdAutoMessage);
                formData.append('sender', props.storageData.storageData.phone);
                formData.append('reciever', recieverAutoMessage);
                formData.append('type', 'image');
                formData.append('userPhoto', {
                    uri: response.uri,
                    name: response.fileName,
                    type: 'image/jpg'
                });

                postChatImageHelp(props.storageData.userToken, formData).then(result => {

                    console.log(result)
                    if (!result.data.error) {
                        let dumpData = {
                            conversationId: conversationIdAutoMessage,
                            sender: props.storageData.storageData.phone,
                            reciever: recieverAutoMessage,
                            type: "image",
                            time: Date.now(),
                            loading: false,
                            ipfsPath: result.data.data.ipfsPath
                        }


                        let LoadingData = {
                            add: dumpData,
                            helpMessages: props.storageData.helpMessages
                        }
                        props.addInHelp(LoadingData)
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
                    onPress={() => sendMessage()}
                    style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: baseColor, height: width * 0.12, width: width * 0.12, borderRadius: width * 0.12 }}
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
                sender: props.storageData.storageData.phone,
                body: message,
                type: "text",
                time: Date.now()
            }

            let dataHelp = {
                sender: props.storageData.storageData.phone,
                message: message,
                type: "text",
                conversationId: conversationIdAutoMessage,
                reciever: recieverAutoMessage
            }


            let data = {
                add: temp,
                helpMessages: props.storageData.helpMessages
            }

            props.addInHelp(data)



            setMessage('')
            postHelpMessage(dataHelp, props.storageData.userToken).then(result => {


            }).catch(err => {
                console.log(err)
            });


        }

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
                        onPress={() => Actions.pop()}
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
                    >
                        <FastImage
                            style={{ width: width * 0.12, height: width * 0.12, borderRadius: width * 0.12, marginLeft: width * 0.04 }}
                            source={img}
                            resizeMode={FastImage.resizeMode.cover}
                        />

                        <Text style={{
                            fontSize: width * 0.06,
                            color: "white", marginLeft: width * 0.02
                        }}>
                            Network Messages
                        </Text>
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
                    {renderModal()}
                </KeyboardAvoidingView>
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

export default connect(mapStateToProps, { addInHelp })(autoMessage)
