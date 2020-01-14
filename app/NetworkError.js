import React from 'react';
import {
    View,
    Text,
    Dimensions,
    StatusBar
} from 'react-native';
import FastImage from 'react-native-fast-image'
import { statusBarColor } from './comman/constants';
import Header from './header';
import styles from './comman/styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const { width, height } = Dimensions.get('window');

export default () => {
    return (
        <View style={{ height: height, width: width, backgroundColor: 'white' }}>
            <StatusBar barStyle="light-content" backgroundColor={statusBarColor} />

            <View style={styles.center}>
                <Header name={'Message Hub'} left={false} right={false} />
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'center', height: height * 0.88 }}>
                <Icon
                    name="access-point-network-off"
                    color={statusBarColor}
                    size={width * 0.5}
                    style={{ marginBottom: height * 0.1 }}
                />
                <Text style={{ fontSize: width * 0.06, textAlign: 'center', paddingHorizontal: width * 0.04 }}>You are not connected to the authorised network to use this service.</Text>
            </View>

        </View>
    );
};
