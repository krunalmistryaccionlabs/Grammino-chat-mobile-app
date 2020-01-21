import React, { Fragment, useEffect } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StatusBar,
    Dimensions,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import styles from './comman/styles';
import Header from './header';
import FastImage from 'react-native-fast-image';
import { changeLanguage } from './actions';
import { connect } from 'react-redux';
import { imageEnvironment } from './environment/environment';
import { OutlinedTextField, } from 'react-native-material-textfield';
import { img, baseColor, statusBarColor } from './comman/constants';

const { width, height } = Dimensions.get('window');

function viewProfile(props) {
    return (
        <Fragment>
            <StatusBar barStyle="light-content" backgroundColor={statusBarColor} />
            <SafeAreaView>
                <View style={{
                    backgroundColor: 'white',
                    height: height,
                    width: width
                }}>
                    <View style={styles.center}>
                        <Header name={props.item.name ? props.item.name : ''} left={true} right={false} />
                    </View>

                    <ScrollView style={{ backgroundColor: 'white', width: width }}>
                        <TouchableOpacity
                            style={{ alignItems: 'center', justifyContent: 'center' }}
                        >
                            <FastImage
                                style={{ width: width * 0.5, height: width * 0.5, marginTop: height * 0.06, borderRadius: width * 0.5 }}
                                source={
                                    props.recieverInfo.profilePhoto ?
                                        {
                                            uri: imageEnvironment + props.recieverInfo.profilePhoto,
                                            priority: FastImage.priority.high,
                                        } :
                                        img
                                }
                                resizeMode={FastImage.resizeMode.cover}
                            />
                        </TouchableOpacity>
                        <Text style={{ fontSize: width * 0.06, fontWeight: 'bold', color: 'black', textAlign: 'center', marginTop: height * 0.02 }}>
                            {props.item.phone ? props.item.phone : ''}
                        </Text>
                        <View style={{
                            width: width,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: height * 0.04
                        }}>
                            <OutlinedTextField
                                label={props.storageData.lan.name_value}
                                inputContainerStyle={{ width: width * 0.9, backgroundColor: 'white' }}
                                fontSize={width * 0.04}
                                lineWidth={1}
                                defaultValue={props.recieverInfo.name}
                                tintColor={baseColor}
                                editable={false}
                            />

                            <OutlinedTextField
                                label={props.storageData.lan.status_value}
                                inputContainerStyle={{ width: width * 0.9, backgroundColor: 'white' }}
                                fontSize={width * 0.04}
                                lineWidth={1}
                                defaultValue={props.recieverInfo.status}
                                tintColor={baseColor}
                                editable={false}
                            />


                        </View>

                    </ScrollView>


                </View>
            </SafeAreaView>
        </Fragment>
    );
}



function mapStateToProps(state) {
    return {
        storageData: state
    }
}

export default connect(mapStateToProps, { changeLanguage })(viewProfile)