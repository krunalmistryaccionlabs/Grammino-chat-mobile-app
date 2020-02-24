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
import { getHelpMessages } from './comman/api';
import IconFour from 'react-native-vector-icons/Ionicons';
import IconFeather from 'react-native-vector-icons/Feather';
import IconThree from 'react-native-vector-icons/Entypo';
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { request_storage_runtime_permission } from './comman/methods';
import { Actions } from 'react-native-router-flux';
import { img, baseColor, statusBarColor, chatColor } from './comman/constants';
import moment from 'moment';

const { width, height } = Dimensions.get('window');

function autoMessage(props) {

    let [showImage, setShowImage] = useState('');
    let [modalVisibleImage, setModalVisibleImage] = useState(false);






    const renderChatMessages = () => {
        return props.storageData.helpMessages.map((item) => {
            return (

                <View style={{ width: width, flexDirection: 'row' }}>


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
                    </View>

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
                            Help
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
                        {/* {renderSendBox()} */}
                    </View>
                    {renderModal()}
                </KeyboardAvoidingView>

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
