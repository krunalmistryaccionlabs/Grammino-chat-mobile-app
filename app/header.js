import React, { Component } from 'react';
import {
    View,
    Text,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import CardView from 'react-native-cardview'
const { width, height } = Dimensions.get('window');
import Icon from 'react-native-vector-icons/FontAwesome5';
import IconTwo from 'react-native-vector-icons/AntDesign';
import styles from './comman/styles';
import { Actions } from 'react-native-router-flux';

export default class Header extends Component {
    render() {
        return (
            <CardView
                style={styles.cardStyle}
                cardElevation={40}
                cardMaxElevation={40}
                cornerRadius={0}>
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                    {this.props.left ?
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
                        :
                        <View style={{ marginLeft: width * 0.04, width: width * 0.07 }}></View>

                    }
                    <Text style={styles.titleFont}>{this.props.name}</Text>
                    {this.props.right ?
                        <TouchableOpacity
                            onPress={() => Actions.profile()}
                        >
                            <Icon
                                style={{ marginRight: width * 0.04 }}
                                name="user-edit"
                                color="white"
                                size={width * 0.07}
                            />
                        </TouchableOpacity>
                        : <View style={{ marginRight: width * 0.04 }}>
                            <View style={{ width: width * 0.07 }}></View>
                        </View>
                    }
                </View>
            </CardView >
        );
    }
};
