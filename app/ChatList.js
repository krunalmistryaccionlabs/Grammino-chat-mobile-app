import React from 'react';
import {
    View,
    Text,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import FastImage from 'react-native-fast-image'
import { img } from './comman/constants';
import IconTwo from 'react-native-vector-icons/Ionicons';
import { imageEnvironment } from './environment/environment'

const { width, height } = Dimensions.get('window');

export default ({ item, onPressPicture, onPressContact, index }) => {
    return (
        <View style={{ height: height * 0.12, width: width, backgroundColor: 'transparent', borderBottomColor: '#cdcbd1', borderBottomWidth: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View style={{
                flexDirection: 'row',
                width: width,
                paddingLeft: width * 0.04
            }}>
                <TouchableOpacity onPress={() => onPressPicture(item.recieverInfo[0].profilePhoto ? imageEnvironment + item.recieverInfo[0].profilePhoto : img)}>
                    <FastImage
                        style={{ width: width * 0.16, height: width * 0.16, borderRadius: width * 0.16 }}
                        source={{
                            uri: item.recieverInfo[0].profilePhoto ? imageEnvironment + item.recieverInfo[0].profilePhoto : img,
                            priority: FastImage.priority.low,
                        }}
                        resizeMode={FastImage.resizeMode.cover}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    style={{ paddingLeft: width * 0.04 }}
                    onPress={() => onPressContact(item, index)}
                >
                    <Text
                        numberOfLines={1}
                        style={{
                            fontSize: width * 0.05,
                            color: "black",
                            width: width * 0.66
                        }}
                    >{item.recieverInfo[0].name ? item.recieverInfo[0].name : 'User'}
                    </Text>
                    <Text
                        numberOfLines={1}
                        style={{
                            fontSize: width * 0.04,
                            color: "#99979c",
                            width: width * 0.66
                        }}
                    >{item.recieverInfo[0].status ? item.recieverInfo[0].status : 'Available'}
                    </Text>
                </TouchableOpacity>

                {item.icon ?
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <IconTwo
                            name="md-mail-unread"
                            color="green"
                            size={width * 0.08}
                        />
                    </View>
                    : null}

            </View>
        </View>
    );
};
