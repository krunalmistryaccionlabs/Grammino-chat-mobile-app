import React, { Fragment, useState } from 'react';
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
import Header from './header';
import { signUpPost } from './comman/api';
import { changeLanguage } from './actions';
import { OutlinedTextField } from 'react-native-material-textfield';
import { validateSpace, validateNumber } from './comman/validation';
import { baseColor, statusBarColor } from './comman/constants'
import { connect } from 'react-redux';


const { width, height } = Dimensions.get('window');

function signUp(props) {

    let [userName, setUserName] = useState('');
    let [phone, setPhone] = useState('');
    let [password, setPassword] = useState('');
    let [confirm, setConfirm] = useState('');

    const validation = () => {

        if (password !== confirm) {
            Alert.alert('Password and Confirm Password should be equal')
        }
        else if (phone === '') {
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
            signUpPost(userName, phone, password).then(result => {

                if (!result.data.error) {
                    Actions.login();
                }
                else {
                    Alert.alert('User already exist')
                }

            }).catch(err => {
                console.log(err)
            });
        }
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
                        <Header name={props.storageData.lan.app_name} left={true} right={false} />
                    </View>
                    <ScrollView>



                        <View style={{ marginTop: height * 0.12 }}>
                            <Text style={{ fontSize: width * 0.06, color: 'black', fontWeight: 'bold', marginLeft: width * 0.06 }}>{props.storageData.lan.sign_up_as}</Text>
                        </View>
                        <View style={{
                            width: width,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: height * 0.04
                        }}>

                            <OutlinedTextField
                                label={props.storageData.lan.name_value}
                                formatText={this.formatText}
                                onSubmitEditing={this.onSubmit}
                                ref={this.fieldRef}
                                inputContainerStyle={{ width: width * 0.9, backgroundColor: 'white' }}
                                fontSize={width * 0.04}
                                lineWidth={1}
                                value={userName}
                                onChangeText={userNameText => {
                                    setUserName(userNameText)
                                }}
                                tintColor={baseColor}
                            />

                            <OutlinedTextField
                                label={props.storageData.lan.mobile_no}
                                keyboardType='phone-pad'
                                formatText={this.formatText}
                                onSubmitEditing={this.onSubmit}
                                ref={this.fieldRef}
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
                                formatText={this.formatText}
                                onSubmitEditing={this.onSubmit}
                                secureTextEntry={true}
                                ref={this.fieldRef}
                                inputContainerStyle={{ width: width * 0.9, backgroundColor: 'white' }}
                                fontSize={width * 0.04}
                                lineWidth={1}
                                value={password}
                                onChangeText={passwordText => {
                                    setPassword(passwordText)
                                }}
                                tintColor={baseColor}
                            />

                            <OutlinedTextField
                                label={props.storageData.lan.confirm_pass}
                                formatText={this.formatText}
                                secureTextEntry={true}
                                onSubmitEditing={this.onSubmit}
                                ref={this.fieldRef}
                                inputContainerStyle={{ width: width * 0.9, backgroundColor: 'white' }}
                                fontSize={width * 0.04}
                                lineWidth={1}
                                value={confirm}
                                onChangeText={confirmText => {
                                    setConfirm(confirmText)
                                }}
                                tintColor={baseColor}
                            />

                            <TouchableOpacity
                                style={{ height: height * 0.08, width: width * 0.8, backgroundColor: baseColor, borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginTop: height * 0.04 }}
                                onPress={() => validation()}
                            >
                                <Text style={{ textAlign: 'center', fontSize: width * 0.07, color: 'white' }}>{props.storageData.lan.sign_up_value}</Text>
                            </TouchableOpacity>

                        </View>

                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </Fragment >
    );

};

function mapStateToProps(state) {
    return {
        storageData: state
    }
}

export default connect(mapStateToProps, { changeLanguage })(signUp)