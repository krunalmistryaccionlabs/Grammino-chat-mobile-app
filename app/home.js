import React, { Fragment, useState, useEffect } from 'react';
import {

    SafeAreaView,
    View,
    StatusBar,
    Dimensions,
    TouchableOpacity,
    ScrollView,
    Modal,
    BackHandler

} from 'react-native';
import styles from './comman/styles';
import { Actions } from 'react-native-router-flux';
import Header from './header';
import ChatList from './ChatList'
import IconTwo from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import { getConversations, getRunTimeConversation } from './comman/api';
import { saveStorageData, saveUserToken, messageReceived, dump, saveChatDeatils, iconChatDetails, addInChat, changeLanguage } from './actions';
import ImageModal from './ImageModal';
import PTRView from 'react-native-pull-to-refresh';
import { statusBarColor } from './comman/constants';
import io from "socket.io-client";
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
        BackHandler.addEventListener("hardwareBackPress", backButtonHandler);

        return () => {
            BackHandler.removeEventListener("hardwareBackPress", backButtonHandler);
        };
    }, [backButtonHandler]);

    function backButtonHandler() { BackHandler.exitApp() }




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

            console.log(data)

            props.messageReceived(data)

        });


        getConversations(tokenData).then(result => {

            props.saveChatDeatils(result.data.data)


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
                {/* <PTRView onRefresh={() => refreshHome()} > */}
                <View style={styles.container}>
                    <View style={styles.center}>
                        <Header name={props.storageData.lan.app_name} left={false} right={true} />
                    </View>
                    <ScrollView style={{
                        width: width, height: height * 0.9, marginTop: height * 0.02
                    }}>
                        {renderContactsChat()}
                    </ScrollView>

                    {renderModal()}
                    {renderFloatingButton()}

                </View>
                {/* </PTRView> */}
            </SafeAreaView>
        </Fragment>
    );

};

function mapStateToProps(state) {
    return {
        storageData: state
    }
}

export default connect(mapStateToProps, { saveStorageData, saveUserToken, messageReceived, dump, saveChatDeatils, iconChatDetails, addInChat, changeLanguage })(home)