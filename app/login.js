import React, { Fragment, useState, useEffect } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StatusBar,
    Dimensions,
    TouchableOpacity,
    Alert,
    KeyboardAvoidingView,
    ScrollView
} from 'react-native';
import styles from './comman/styles';
import { Actions } from 'react-native-router-flux';
import { loginPost } from './comman/api';
import Header from './header';
import { connect } from 'react-redux';
import { changeLanguage } from './actions';
import DeviceInfo from 'react-native-device-info';
import { OutlinedTextField } from 'react-native-material-textfield';
import AsyncStorage from '@react-native-community/async-storage';
import { validateSpace, validateNumber } from './comman/validation';
import { baseColor, statusBarColor } from './comman/constants';
import { environment } from './environment/environment';
import Modal from "react-native-modal";


const { width, height } = Dimensions.get('window');


function login(props) {

    let [phone, setPhone] = useState('');
    let [password, setPassword] = useState('');
    let [languageModal, setLanguageModal] = useState(false);



    const validation = () => {

        if (phone === '') {
            Alert.alert('Phone number should not blank')
        }
        else if (password === '') {
            Alert.alert('Password should not blank')
        }
        else if (!validateSpace(phone)) {
            Alert.alert('Invalid mobile number')
        }
        else if (!validateSpace(password)) {
            Alert.alert("Password should not contain space")
        }
        else if (phone.length !== 10) {
            Alert.alert('Invalid mobile number')
        }
        else {

            loginPost(phone, password).then(result => {
                console.log(result)
                if (!result.error) {
                    storeData(result);
                }
                else {
                    Alert.alert('Invalid login credentials')
                }

            }).catch(err => {
                console.log(err)
                Alert.alert(environment)
            });
        }

    }


    useEffect(() => {

        getLanguage();

        DeviceInfo.getPhoneNumber().then(phoneNumber => {
            console.log(phoneNumber)
        });

    }, []);


    getLanguage = async () => {

        let userLanguage = await AsyncStorage.getItem('userLanguage');

        if (userLanguage !== null) {
            props.changeLanguage(userLanguage)
        }

    }



    storeData = async (result) => {

        try {

            await AsyncStorage.setItem('access', 'true')
            await AsyncStorage.setItem('userId', result.data.userId)
            await AsyncStorage.setItem('token', result.token)
            await AsyncStorage.setItem('phone', result.data.phone)
            Actions.home()

        } catch (e) {
            console.log(e)
        }

    }

    const lanSetting = async (value) => {

        props.changeLanguage(value)
        setLanguageModal(false)
        await AsyncStorage.setItem('userLanguage', value)

    }



    return (
        <Fragment>
            <StatusBar barStyle="light-content" backgroundColor={statusBarColor} />
            <SafeAreaView>
                <KeyboardAvoidingView
                    style={{
                        justifyContent: 'space-between', height: height, width: width, backgroundColor: 'white'
                    }}
                    behavior="padding"
                    keyboardVerticalOffset={20}
                >
                    <View style={styles.center}>
                        <Header name={props.storageData.lan.app_name} left={false} right={false} />
                    </View>
                    <ScrollView>


                        <View style={{ flexDirection: 'row-reverse', marginTop: height * 0.04, padding: 12 }}>
                            <Text style={{ fontSize: width * 0.04 }}>{props.storageData.lan.not_a_member}
                                <Text
                                    style={{ fontSize: width * 0.05, color: baseColor }}
                                    onPress={() => Actions.signUp()}
                                >
                                    {props.storageData.lan.sign_up}
                                </Text>
                            </Text>
                        </View>
                        <View style={{ marginTop: height * 0.1 }}>
                            <Text style={{ fontSize: width * 0.06, color: 'black', fontWeight: 'bold', marginLeft: width * 0.06 }}>{props.storageData.lan.login_to}</Text>
                        </View>
                        <View style={{
                            width: width,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: height * 0.02
                        }}>

                            <OutlinedTextField
                                label={props.storageData.lan.mobile_no}
                                keyboardType='phone-pad'
                                inputContainerStyle={{ width: width * 0.9, backgroundColor: 'white' }}
                                fontSize={width * 0.04}
                                lineWidth={1}
                                value={phone}
                                onChangeText={phoneText => {
                                    setPhone(phoneText)
                                }}
                                tintColor={baseColor}
                            />

                            <OutlinedTextField
                                label={props.storageData.lan.pass}
                                inputContainerStyle={{ width: width * 0.9, backgroundColor: 'white' }}
                                fontSize={width * 0.04}
                                lineWidth={1}
                                secureTextEntry={true}
                                value={password}
                                onChangeText={passwordText => {
                                    setPassword(passwordText)
                                }}
                                tintColor={baseColor}
                            />

                            <TouchableOpacity
                                style={{ height: height * 0.08, width: width * 0.8, backgroundColor: baseColor, borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginTop: height * 0.04 }}
                                onPress={() => validation()}
                            >
                                <Text style={{ textAlign: 'center', fontSize: width * 0.07, color: 'white' }}>{props.storageData.lan.login}</Text>
                            </TouchableOpacity>

                        </View>
                        <TouchableOpacity
                            style={{ flexDirection: 'row-reverse', marginTop: height * 0.03, padding: 12 }}
                            onPress={() => setLanguageModal(true)}
                        >
                            <Text style={{ fontSize: width * 0.04, color: baseColor }}>{props.storageData.lan.change_language}</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </KeyboardAvoidingView>
                <Modal
                    isVisible={languageModal}
                    onBackdropPress={() => setLanguageModal(false)}
                    style={{ alignItems: 'center', justifyContent: 'center' }}

                >
                    <View style={{ height: height * 0.5, width: width * 0.8, backgroundColor: 'white', paddingVertical: height * 0.02 }}>
                        <Text style={{ textAlign: 'center', fontSize: width * 0.06, color: baseColor }}>Select Language</Text>
                        <View style={{ flexDirection: 'column', justifyContent: 'space-around', marginTop: height * 0.02, height: height * 0.3 }}>
                            <TouchableOpacity
                                onPress={() => lanSetting('marathi')}
                            >
                                <Text style={{ fontSize: width * 0.08, textAlign: 'center' }}>मराठी</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => lanSetting('hindi')}
                            >
                                <Text style={{ fontSize: width * 0.08, textAlign: 'center' }}>हिंदी</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => lanSetting('english')}
                            >
                                <Text style={{ fontSize: width * 0.08, textAlign: 'center' }}>English</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </SafeAreaView>
        </Fragment >
    );

};


function mapStateToProps(state) {
    return {
        storageData: state
    }
}

export default connect(mapStateToProps, { changeLanguage })(login)