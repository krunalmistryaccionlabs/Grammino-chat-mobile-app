import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import Video from 'react-native-video';
import { Actions } from 'react-native-router-flux';
import IconTwo from 'react-native-vector-icons/AntDesign';
import IconFeather from 'react-native-vector-icons/Feather';
import { request_storage_runtime_permission_video } from './comman/methods';
import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';
const { width, height } = Dimensions.get('window');

class PlayVideo extends Component {
    videoPlayer;

    constructor(props) {
        super(props);
        this.state = {
            currentTime: 0,
            duration: 0,
            isFullScreen: true,
            isLoading: true,
            paused: false,
            playerState: PLAYER_STATES.PLAYING,
            screenType: 'content',
        };
    }



    async downloadImage() {
        await request_storage_runtime_permission_video(this.props.videoUrl)
    }

    onSeek = seek => {
        //Handler for change in seekbar
        this.videoPlayer.seek(seek);
    };

    onPaused = playerState => {
        //Handler for Video Pause
        this.setState({
            paused: !this.state.paused,
            playerState,
        });
    };

    onReplay = () => {
        //Handler for Replay
        this.setState({ playerState: PLAYER_STATES.PLAYING });
        this.videoPlayer.seek(0);
    };

    onProgress = data => {
        const { isLoading, playerState } = this.state;
        // Video Player will continue progress even if the video already ended
        if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
            this.setState({ currentTime: data.currentTime });
        }
    };

    onLoad = data => this.setState({ duration: data.duration, isLoading: false });

    onLoadStart = data => this.setState({ isLoading: true });

    onEnd = () => this.setState({ playerState: PLAYER_STATES.ENDED });

    onError = () => alert('Oh! ', error);

    exitFullScreen = () => {
        alert('Exit full screen');
    };

    enterFullScreen = () => { };

    onFullScreen = () => {
        if (this.state.screenType == 'content')
            this.setState({ screenType: 'cover' });
        else this.setState({ screenType: 'content' });
    };
    renderToolbar = () => (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: width, marginLeft: -width * 0.05 }}>
            <TouchableOpacity
                onPress={() => Actions.pop()}
            >
                <IconTwo

                    name="arrowleft"
                    color="white"
                    size={width * 0.07}
                />
            </TouchableOpacity>
            <Text style={{
                fontSize: width * 0.06,
                color: "white",

            }}>{this.props.userName}</Text>
            <TouchableOpacity
                onPress={() => {
                    this.downloadImage()
                }}>
                <IconFeather

                    name="download"
                    color="white"
                    size={width * 0.1}
                />
            </TouchableOpacity>
        </View>
    );
    onSeeking = currentTime => this.setState({ currentTime });

    render() {
        return (
            <View style={styles.container}>
                <Video
                    onEnd={this.onEnd}
                    onLoad={this.onLoad}
                    onLoadStart={this.onLoadStart}
                    onProgress={this.onProgress}
                    paused={this.state.paused}
                    ref={videoPlayer => (this.videoPlayer = videoPlayer)}
                    resizeMode='contain'

                    onFullScreen={this.state.isFullScreen}
                    //source={{ uri: 'https://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4' }}

                    source={{ uri: this.props.videoUrl }}
                    style={styles.mediaPlayer}
                    volume={10}
                />
                <MediaControls
                    duration={this.state.duration}
                    isLoading={this.state.isLoading}
                    mainColor="#333"
                    onFullScreen={this.onFullScreen}
                    onPaused={this.onPaused}
                    onReplay={this.onReplay}
                    onSeek={this.onSeek}
                    onSeeking={this.onSeeking}
                    playerState={this.state.playerState}
                    progress={this.state.currentTime}
                    toolbar={this.renderToolbar()}
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center'
    },
    toolbar: {
        marginTop: 30,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
    },
    mediaPlayer: {
        height: height * 0.6, width: width,
        backgroundColor: 'black',
    },
});
export default PlayVideo;