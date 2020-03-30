import React, { Fragment, useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView
} from "react-native";
import styles from "./comman/styles";
import Header from "./header";
import FastImage from "react-native-fast-image";
import { OutlinedTextField } from "react-native-material-textfield";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import { postProfile, getProfile } from "./comman/api";
import AsyncStorage from "@react-native-community/async-storage";
import Modal from "react-native-modal";
import { imageEnvironment } from "./environment/environment";
import {
  saveStorageData,
  saveUserToken,
  resetStore,
  changeLanguage
} from "./actions";
import { img, baseColor, statusBarColor } from "./comman/constants";
import ImagePicker from "react-native-image-picker";

const { width, height } = Dimensions.get("window");
const options = {
  quality: 0.2,
  maxWidth: 500,
  maxHeight: 500,
  storageOptions: {
    skipBackup: true
  }
};

function profile(props) {
  let [userName, setUserName] = useState("");
  let [status, setStatus] = useState("");
  let [picture, setpicture] = useState("");
  let [languageModal, setLanguageModal] = useState(false);

  useEffect(() => {
    getProfile(props.storageData.userToken)
      .then(result => {
        setpicture(
          result.data.data[0].profilePhoto
            ? imageEnvironment + result.data.data[0].profilePhoto
            : null
        );
        setUserName(result.data.data[0].name);
        setStatus(result.data.data[0].status);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const logOut = () => {
    storeData();
  };

  storeData = async () => {
    try {
      await AsyncStorage.setItem("access", "false");
      await AsyncStorage.setItem("userId", "");
      await AsyncStorage.setItem("token", "");
      await AsyncStorage.setItem("phone", "");
      await AsyncStorage.setItem("userName", "");
      await AsyncStorage.setItem("contactData", "");

      props.resetStore();
      Actions.login();
    } catch (e) {
      console.log(e);
    }
  };

  const lanSetting = async value => {
    props.changeLanguage(value);
    setLanguageModal(false);
    await AsyncStorage.setItem("userLanguage", value);
  };

  const takePicture = () => {
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log("User cancelled photo picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        setpicture(response.uri);

        let formData = new FormData();

        formData.append("name", userName);
        formData.append("status", status);
        formData.append("phone", props.storageData.storageData.phone);
        formData.append("userProfilePhoto", {
          uri: response.uri,
          name: response.fileName,
          type: "image/jpg"
        });

        postProfile(formData, props.storageData.userToken)
          .then(result => {})
          .catch(err => {
            console.log(err);
          });
      }
    });
  };

  const postData = () => {
    let formData = new FormData();

    formData.append("name", userName);
    formData.append("status", status);
    formData.append("phone", props.storageData.storageData.phone);

    postProfile(formData, props.storageData.userToken)
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <Fragment>
      <StatusBar barStyle="light-content" backgroundColor={statusBarColor} />
      <SafeAreaView>
        <KeyboardAvoidingView
          style={{
            justifyContent: "space-between",
            height: height,
            width: width,
            backgroundColor: "white"
          }}
          behavior="padding"
          keyboardVerticalOffset={20}
        >
          <View style={styles.center}>
            <Header
              name={props.storageData.lan.my_profile}
              left={true}
              right={false}
            />
          </View>

          <ScrollView style={{ backgroundColor: "white", width: width }}>
            <TouchableOpacity
              onPress={() => takePicture()}
              style={{ alignItems: "center", justifyContent: "center" }}
            >
              <FastImage
                style={{
                  width: width * 0.5,
                  height: width * 0.5,
                  marginTop: height * 0.06,
                  borderRadius: width * 0.5
                }}
                source={
                  picture === null
                    ? img
                    : {
                        uri: picture,
                        priority: FastImage.priority.high
                      }
                }
                resizeMode={FastImage.resizeMode.cover}
              />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: width * 0.06,
                fontWeight: "bold",
                color: "black",
                textAlign: "center",
                marginTop: height * 0.02
              }}
            >
              {props.storageData.storageData.phone}
            </Text>
            <View
              style={{
                width: width,
                alignItems: "center",
                justifyContent: "center",
                marginTop: height * 0.04
              }}
            >
              <OutlinedTextField
                label={props.storageData.lan.name_value}
                formatText={this.formatText}
                onSubmitEditing={this.onSubmit}
                ref={this.fieldRef}
                inputContainerStyle={{
                  width: width * 0.9,
                  backgroundColor: "white"
                }}
                fontSize={width * 0.04}
                lineWidth={1}
                onBlur={() => postData()}
                defaultValue={userName}
                onChangeText={userNameText => {
                  setUserName(userNameText);
                }}
                tintColor={baseColor}
              />

              <OutlinedTextField
                label={props.storageData.lan.status_value}
                formatText={this.formatText}
                onSubmitEditing={this.onSubmit}
                ref={this.fieldRef}
                onBlur={() => postData()}
                inputContainerStyle={{
                  width: width * 0.9,
                  backgroundColor: "white"
                }}
                fontSize={width * 0.04}
                lineWidth={1}
                defaultValue={status}
                onChangeText={statusText => {
                  setStatus(statusText);
                }}
                tintColor={baseColor}
              />

              <TouchableOpacity
                style={{
                  height: height * 0.08,
                  width: width * 0.8,
                  backgroundColor: baseColor,
                  borderRadius: 8,
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: height * 0.04
                }}
                onPress={() => logOut()}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: width * 0.07,
                    color: "white"
                  }}
                >
                  {props.storageData.lan.logout_value}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: "row-reverse",
                  marginTop: height * 0.03,
                  padding: 12
                }}
                onPress={() => setLanguageModal(true)}
              >
                <Text style={{ fontSize: width * 0.04, color: baseColor }}>
                  {props.storageData.lan.change_language}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
        <Modal
          isVisible={languageModal}
          onBackdropPress={() => setLanguageModal(false)}
          style={{ alignItems: "center", justifyContent: "center" }}
        >
          <View
            style={{
              height: height * 0.5,
              width: width * 0.8,
              backgroundColor: "white",
              paddingVertical: height * 0.02
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: width * 0.06,
                color: baseColor
              }}
            >
              Select Language
            </Text>
            <View
              style={{
                flexDirection: "column",
                justifyContent: "space-around",
                marginTop: height * 0.02,
                height: height * 0.3
              }}
            >
              <TouchableOpacity onPress={() => lanSetting("marathi")}>
                <Text style={{ fontSize: width * 0.08, textAlign: "center" }}>
                  मराठी
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => lanSetting("hindi")}>
                <Text style={{ fontSize: width * 0.08, textAlign: "center" }}>
                  हिंदी
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => lanSetting("english")}>
                <Text style={{ fontSize: width * 0.08, textAlign: "center" }}>
                  English
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </Fragment>
  );
}

function mapStateToProps(state) {
  return {
    storageData: state
  };
}

export default connect(mapStateToProps, {
  saveStorageData,
  saveUserToken,
  resetStore,
  changeLanguage
})(profile);
