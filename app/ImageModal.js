import React from 'react';
import {
    View,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import FastImage from 'react-native-fast-image'
import Icon from 'react-native-vector-icons/Entypo';
import { img } from './comman/constants';

const { width, height } = Dimensions.get('window');


export default ({ setModalVisible, picture }) => {
    return (
        <View style={{ height: height, width: width, backgroundColor: 'black' }}>

            <TouchableOpacity
                onPress={() => {
                    setModalVisible(false)
                }}>
                <Icon
                    style={{ marginLeft: width * 0.85, marginTop: height * 0.02 }}
                    name="cross"
                    color="white"
                    size={width * 0.12}
                />
            </TouchableOpacity>

            <FastImage
                style={{ width: width, height: width, marginTop: height * 0.15 }}
                source={{
                    uri: picture ? picture : img,
                    priority: FastImage.priority.high,
                }}
                resizeMode={FastImage.resizeMode.cover}
            />
        </View>

    );
};
