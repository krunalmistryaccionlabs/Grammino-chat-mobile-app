import React from 'react';
import {
    View,
    Text,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import FastImage from 'react-native-fast-image'
import { img } from './comman/constants';
import { imageEnvironment } from './environment/environment';

const { width, height } = Dimensions.get('window');

export default ({ item, onPressContact, onPressPicture }) => {
    return (
        <View style={{ height: height * 0.12, width: width, backgroundColor: 'transparent', borderBottomColor: '#cdcbd1', borderBottomWidth: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View style={{
                flexDirection: 'row',
                width: width,
                paddingLeft: width * 0.04
            }}>
                <TouchableOpacity onPress={() => onPressPicture(item.profile ? item.profile.profilePhoto ? imageEnvironment + item.profile.profilePhoto : null : null)}>
                    <FastImage
                        style={{ width: width * 0.16, height: width * 0.16, borderRadius: width * 0.16 }}
                        source={
                            item.profile ?
                                item.profile.profilePhoto ?
                                    {
                                        uri: imageEnvironment + item.profile.profilePhoto,
                                        priority: FastImage.priority.low,
                                    } :
                                    img :
                                img
                        }
                        resizeMode={FastImage.resizeMode.cover}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    style={{ paddingLeft: width * 0.04 }}
                    onPress={() => onPressContact(item)}
                >
                    <Text
                        numberOfLines={1}
                        style={{
                            fontSize: width * 0.05,
                            color: "black",
                            width: width * 0.7
                        }}
                    >{item.name ? item.name : 'User'}
                    </Text>
                    <Text
                        numberOfLines={1}
                        style={{
                            fontSize: width * 0.04,
                            color: "#99979c",
                            width: width * 0.7
                        }}
                    >{item.profile ? item.profile.status ? item.profile.status : 'Available' : 'Available'}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
