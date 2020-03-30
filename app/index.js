import React, { useEffect, useState } from "react";
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
import AutoMessage from "./autoMessage";
import { useNetInfo } from "@react-native-community/netinfo";
import AsyncStorage from "@react-native-community/async-storage";
import autoMessage from "./autoMessage";

const App = () => {
  let [login, setLogin] = useState(false);
  let [home, setHome] = useState(false);
  let [loading, setloading] = useState(true);
  let [wifiType, setWifiType] = useState("wifi");
  let [wifiGO, setWifiGo] = useState(true);

  const netInfo = useNetInfo();

  useEffect(() => {
    if (wifiType !== netInfo.type) {
      setWifiType(netInfo.type);
      if (netInfo.type === "wifi") {
        setWifiGo(true);
        getData();
      } else if (netInfo.type === "unknown") {
        setWifiGo(true);
        getData();
      } else {
        setWifiGo(false);
      }
    }
  }, [netInfo]);

  getData = async () => {
    access = await AsyncStorage.getItem("access");

    if (access === "true") {
      setHome(true);
      setloading(false);
    } else {
      setLogin(true);
      setloading(false);
    }
  };

  const onBackPress = () => {
    if (Actions.state.index === 0) {
      return false;
    }
    Actions.pop();
    return true;
  };

  return wifiGO ? (
    loading ? null : (
      <Router backAndroidHandler={() => onBackPress()}>
        <Stack key="root">
          <Scene key="profile" component={Profile} hideNavBar={true} />
          <Scene key="contactList" component={ContactList} hideNavBar={true} />
          <Scene key="PlayVideo" component={PlayVideo} hideNavBar={true} />
          <Scene key="chatScreen" component={ChatScreen} hideNavBar={true} />
          <Scene key="viewProfile" component={ViewProfile} hideNavBar={true} />
          <Scene key="autoMessage" component={autoMessage} hideNavBar={true} />
          <Scene key="signUp" component={SignUp} hideNavBar={true} />
          <Scene
            key="login"
            component={Login}
            hideNavBar={true}
            initial={login}
          />
          <Scene key="home" component={Home} hideNavBar={true} initial={home} />
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
};
export default App;
