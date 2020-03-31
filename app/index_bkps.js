import React from "react";
import { Scene, Router, Stack, Actions } from "react-native-router-flux";
import Home from "./home";
import Login from "./login";
import Profile from "./profile";
import ChatScreen from "./chatScreen";
import EntityChatScreen from "./entityChatScreen";
import NetworkError from "./NetworkError";
import SignUp from "./signUp";
import ContactList from "./contactList";
import ViewProfile from "./viewProfile";
import PlayVideo from "./PlayVideo";
import { useNetInfo } from "@react-native-community/netinfo";
import AsyncStorage from "@react-native-community/async-storage";
import autoMessage from "./autoMessage";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false,
      home: false,
      loading: true,
      wifiType: "wifi",
      wifiGO: true,
      netInfo: useNetInfo()
    };
  }

  setLogin = val => {
    this.setState({
      ...this.state,
      login: val
    });
  };

  setHome = val => {
    this.setState({
      ...this.state,
      home: val
    });
  };

  setloading = val => {
    this.setState({
      ...this.state,
      loading: val
    });
  };

  setWifiType = val => {
    this.setState({
      ...this.state,
      wifiType: val
    });
  };

  setWifiGo = val => {
    this.setState({
      ...this.state,
      wifiGO: val
    });
  };

  getData = async () => {
    const access = await AsyncStorage.getItem("access");

    if (access === "true") {
      setHome(true);
      setloading(false);
    } else {
      setLogin(true);
      setloading(false);
    }
  };

  onBackPress = () => {
    if (Actions.state.index === 0) {
      return false;
    }
    Actions.pop();
    return true;
  };

  componentDidMount() {
    console.log("componentDidMount");
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.netInfo.type !== prevState.netInfo.type) {
      setWifiType(netInfo.type);
      if (netInfo.type === "wifi") {
        this.setWifiGo(true);
        this.getData();
      } else if (netInfo.type === "unknown") {
        this.setWifiGo(true);
        this.getData();
      } else {
        this.setWifiGo(false);
      }
    }
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");
  }

  render() {
    const { wifiGO, loading } = this.state;
    return wifiGO ? (
      loading ? null : (
        <Router backAndroidHandler={() => onBackPress()}>
          <Stack key="root">
            <Scene key="profile" component={Profile} hideNavBar={true} />
            <Scene
              key="contactList"
              component={ContactList}
              hideNavBar={true}
            />
            <Scene key="PlayVideo" component={PlayVideo} hideNavBar={true} />
            <Scene key="chatScreen" component={ChatScreen} hideNavBar={true} />
            <Scene
              key="viewProfile"
              component={ViewProfile}
              hideNavBar={true}
            />
            <Scene
              key="autoMessage"
              component={autoMessage}
              hideNavBar={true}
            />
            <Scene key="signUp" component={SignUp} hideNavBar={true} />
            <Scene
              key="login"
              component={Login}
              hideNavBar={true}
              initial={login}
            />
            <Scene
              key="home"
              component={Home}
              hideNavBar={true}
              initial={home}
            />
            <Scene
              key="entityChatScreen"
              component={EntityChatScreen}
              hideNavBar={true}
            />
          </Stack>
        </Router>
      )
    ) : (
      <NetworkError />
    );
  }
}
