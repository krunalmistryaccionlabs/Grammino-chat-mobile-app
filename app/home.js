import React, { Fragment, useState, useEffect } from 'react';
import {
    SafeAreaView,
    View,
    StatusBar,
    Dimensions,
    TouchableOpacity,
    ScrollView,
    Modal,
    Text
} from 'react-native';
import styles from './comman/styles';
import { Actions } from 'react-native-router-flux';
import FastImage from 'react-native-fast-image'
import Header from './header';
import ChatList from './ChatList'
import IconTwo from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import { getConversations, getRunTimeConversation, getHelpMessages } from './comman/api';
import { saveStorageData, saveUserToken, messageReceived, dump, saveChatDeatils, iconChatDetails, addInChat, changeLanguage, helpReceived, saveHelpMessages, addInHelp } from './actions';
import ImageModal from './ImageModal';
import PTRView from 'react-native-pull-to-refresh';
import { statusBarColor, baseColor } from './comman/constants';
import io from "socket.io-client";
import { img } from './comman/constants';
import { socketEnvironment } from './environment/environment';

const { width, height } = Dimensions.get('window');

function home(props) {

    let [modalVisible, setModalVisible] = useState(false);
    let [modalImage, setModalImage] = useState('');
    let [token, setToken] = useState('');



    useEffect(() => {

        getToken();



    }, []);


    useEffect(() => {

        let temp = props.storageData.chatDetails.find(o => o.recieverInfo[0].phone === props.storageData.message.sender);
        let index = props.storageData.chatDetails.indexOf(temp);
        if (temp) {
            let data = {
                index: index,
                chatDetails: props.storageData.chatDetails,
                value: true
            }
            if (index !== -1) {
                props.iconChatDetails(data)
            }
        }
        else {


            getRunTimeConversation(props.storageData.message.conversationId, token).then(result => {
                result.data.data[0].icon = true
                let data = {
                    add: result.data.data[0],
                    chatDetails: props.storageData.chatDetails
                }
                props.addInChat(data)

            }).catch(err => {
                console.log(err)
            });

        }

    }, [props.storageData.message]);



    useEffect(() => {

        if (props.storageData.helpMessageReceived !== '') {
            let data = {
                add: props.storageData.helpMessageReceived,
                helpMessages: props.storageData.helpMessages
            }

            props.addInHelp(data)
        }



    }, [props.storageData.helpMessageReceived]);



    getToken = async () => {

        let tokenData = await AsyncStorage.getItem('token');

        let storageData = {
            phone: await AsyncStorage.getItem('phone'),
            userId: await AsyncStorage.getItem('userId')
        }

        let userLanguage = await AsyncStorage.getItem('userLanguage');

        if (userLanguage !== null) {
            props.changeLanguage(userLanguage)
        }

        let socket = io.connect(socketEnvironment);
        socket.emit('join', { phone: storageData.phone });

        socket.on("new_msg", data => {


            props.messageReceived(data)

        });



        socket.on("new_network_msg", data => {

            props.helpReceived(data)

        });


        getConversations(tokenData).then(result => {

            props.saveChatDeatils(result.data.data)


        }).catch(err => {
            console.log(err)
        });

        getHelpMessages(tokenData).then(result => {

            props.saveHelpMessages(result.data.data.data)

        }).catch(err => {
            console.log(err)
        });


        setToken(tokenData)
        props.saveUserToken(tokenData)
        props.saveStorageData(storageData)

    }


    const renderContactsChat = () => {
        return props.storageData.chatDetails.map((item, index) => {
            return (
                <ChatList
                    item={item}
                    onPressPicture={onPressPicture}
                    onPressContact={onPressContact}
                    index={index}
                />
            )
        })
    }

    function onPressContact(itemData, index) {

        let item = {
            name: itemData.recieverInfo[0].name,
            phone: itemData.recieverInfo[0].phone,
            profile: ''
        }


        let data = {
            index: index,
            chatDetails: props.storageData.chatDetails,
            value: false
        }

        props.iconChatDetails(data)



        Actions.chatScreen({ data: itemData, item: item })

    }

    function onPressPicture(item) {
        setModalImage(item)
        setModalVisible(true)
    }

    const renderModal = () => {
        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
            >

                <ImageModal
                    setModalVisible={setModalVisible}
                    picture={modalImage}
                />

            </Modal>
        )
    }

    const renderFloatingButton = () => {
        return (
            <TouchableOpacity
                style={styles.floatingButton}
                onPress={() => Actions.contactList({ token: token })}
            >
                <IconTwo
                    name="message-text"
                    color="white"
                    size={width * 0.08}
                />

            </TouchableOpacity>
        )
    }


    const renderNetworkMessages = () => {
        return (
            <TouchableOpacity
                onPress={() => Actions.autoMessage()}
                style={{ height: height * 0.12, width: width, backgroundColor: 'transparent', borderBottomColor: '#cdcbd1', borderBottomWidth: 1, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{
                    flexDirection: 'row',
                    width: width,
                    paddingLeft: width * 0.04
                }}>
                    <View>
                        <FastImage
                            style={{ width: width * 0.16, height: width * 0.16, borderRadius: width * 0.16 }}
                            source={img}
                            resizeMode={FastImage.resizeMode.cover}
                        />
                    </View>

                    <View style={{ paddingLeft: width * 0.04 }}>
                        <Text
                            numberOfLines={1}
                            style={{
                                fontSize: width * 0.05,
                                color: "black",
                                width: width * 0.66
                            }}
                        >
                            Network Messages
                    </Text>
                        <Text
                            numberOfLines={1}
                            style={{
                                fontSize: width * 0.04,
                                color: "#99979c",
                                width: width * 0.66
                            }}
                        >
                            Available
                    </Text>
                    </View>
                    {/* 
                {item.icon ?
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <IconTwo
                            name="md-mail-unread"
                            color="green"
                            size={width * 0.08}
                        />
                    </View>
                    : null} */}

                </View>
            </TouchableOpacity>
        )
    }

    refreshHome = () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                Actions.refresh({ key: 'home', text: 'hi' });
                resolve()
            }, 2000)
        });
    }

    return (
        <Fragment>
            <StatusBar barStyle="light-content" backgroundColor={statusBarColor} />
            <SafeAreaView>
                <PTRView onRefresh={() => refreshHome()} >
                    <View style={styles.container}>
                        <View style={styles.center}>
                            <Header name={props.storageData.lan.app_name} left={false} right={true} />
                        </View>
                        <ScrollView style={{
                            width: width, height: height * 0.9, marginTop: height * 0.02
                        }}>

                            {renderNetworkMessages()}

                            {renderContactsChat()}

                        </ScrollView>

                        {renderModal()}
                        {renderFloatingButton()}

                    </View>
                </PTRView>
            </SafeAreaView>
        </Fragment>
    );

};

function mapStateToProps(state) {
    return {
        storageData: state
    }
}

export default connect(mapStateToProps, { saveStorageData, saveUserToken, messageReceived, dump, saveChatDeatils, iconChatDetails, addInChat, changeLanguage, helpReceived, saveHelpMessages, addInHelp })(home)