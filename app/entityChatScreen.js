import React, { Fragment, useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
  ActivityIndicator,
  Modal
} from "react-native";
import styles from "./comman/styles";
import {
  postChatMessage,
  postRecent,
  postChatImage,
  getEntityConversation,
  sendActionToEntity
} from "./comman/api";
import FastImage from "react-native-fast-image";
import CardView from "react-native-cardview";
import Icon from "react-native-vector-icons/FontAwesome";
import IconThree from "react-native-vector-icons/Entypo";
import ImageModal from "./ImageModal";
import { connect } from "react-redux";
import RNFetchBlob from "rn-fetch-blob";
import { imageEnvironment } from "./environment/environment";
import {
  saveStorageData,
  saveUserToken,
  saveRecentConv,
  addInEntityConv,
  setEntityConversation,
  resetConv
} from "./actions";
import IconTwo from "react-native-vector-icons/AntDesign";
import IconFour from "react-native-vector-icons/Ionicons";
import IconFeather from "react-native-vector-icons/Feather";
import IconFontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { Actions } from "react-native-router-flux";
import {
  entityIcon,
  baseColor,
  statusBarColor,
  chatColor,
  entityActions
} from "./comman/constants";
import { request_storage_runtime_permission } from "./comman/methods";

import moment, { min } from "moment";
// import Modal from "react-native-modal";
import ImagePicker from "react-native-image-picker";
import AsyncStorage from "@react-native-community/async-storage";
import { isObjEmpty } from "./utils";

const { width, height } = Dimensions.get("window");

const EntityChatScreen = ({
  entity,
  resetConv,
  userInfo,
  userToken,
  setEntityConversation,
  entityConversation,
  addInEntityConv
}) => {
  let [modalVisibleImage, setModalVisibleImage] = useState(false);
  let [showImage, setShowImage] = useState("");

  useEffect(() => {
    getEntityConversation(entity._id, userInfo.phone, userToken)
      .then(res => {
        //setChattingData(result.data.data)
        // props.saveRecentConv(result.data.data);
        setEntityConversation(entity._id, res.data.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const onBack = () => {
    resetConv();
    Actions.pop();
  };

  const sendAction = async key => {
    const userName = await AsyncStorage.getItem("userName");

    sendActionToEntity(entity._id, userInfo.phone, userName, key, userToken)
      .then(res => {
        console.log("Sent Action > ", res.data.data);
        addInEntityConv(entity._id, res.data.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const renderHeader = () => {
    return (
      <View style={styles.cardStyle}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          <TouchableOpacity onPress={() => onBack()}>
            <IconTwo
              style={{ marginLeft: width * 0.04 }}
              name="arrowleft"
              color="white"
              size={width * 0.07}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center"
            }}
            // onPress={() =>
            //   Actions.viewProfile({
            //     item: props.item,
            //     recieverInfo: props.data.recieverInfo[0]
            //   })
            // }
          >
            <FastImage
              style={{
                width: width * 0.12,
                height: width * 0.12,
                borderRadius: width * 0.12,
                marginLeft: width * 0.04
              }}
              source={entityIcon}
              resizeMode={FastImage.resizeMode.cover}
            />

            <Text
              style={{
                fontSize: width * 0.06,
                color: "white",
                marginLeft: width * 0.02
              }}
            >
              {entity.name ? entity.name : "Entity"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  async function downloadImage() {
    await request_storage_runtime_permission(showImage);
  }

  const renderSendBox = () => {
    return (
      <View
        style={{
          width: width,
          backgroundColor: "#e8eaed",
          height: height * 0.08,
          paddingHorizontal: width * 0.02,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        {/* <View
          style={{
            height: height * 0.064,
            borderColor: "gray",
            borderWidth: 1,
            width: width * 0.82,
            borderRadius: 10,
            backgroundColor: "white",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 10
          }}
        > */}
        {/* <SafeAreaView> */}
        <ScrollView horizontal={true}>
          {entityActions.map((entityAction, index) => (
            <View
              style={{
                margin: 10,
                // padding: height * 0.005,
                borderWidth: 2,
                borderRadius: 10,
                height: height * 0.05,
                display: "flex",
                justifyContent: "center"
              }}
              key={`action-btn-${index}`}
            >
              <TouchableOpacity
                onPress={() => sendAction(entityAction.actionKey)}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    padding: 10
                    // justifyContent: "center"
                  }}
                >
                  <IconFontAwesome5
                    name="camera"
                    color="black"
                    size={20}
                    style={{ marginRight: 5 }}
                  />
                  <Text
                    style={{
                      fontWeight: "bold",
                      paddingTop: 2
                    }}
                  >
                    {entityAction.actionLabel}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        {/* </SafeAreaView> */}

        {/* </View> */}
      </View>
    );
  };

  const renderModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisibleImage}
      >
        <View
          style={{ height: height, width: width, backgroundColor: "black" }}
        >
          <View
            style={{
              flexDirection: "row-reverse",
              justifyContent: "space-between"
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setModalVisibleImage(false);
              }}
            >
              <IconThree
                style={{ marginTop: height * 0.02 }}
                name="cross"
                color="white"
                size={width * 0.12}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                downloadImage();
              }}
            >
              <IconFeather
                style={{ marginTop: height * 0.02, marginLeft: width * 0.04 }}
                name="download"
                color="white"
                size={width * 0.1}
              />
            </TouchableOpacity>
          </View>

          <FastImage
            style={{ width: width, height: width, marginTop: height * 0.15 }}
            source={{
              uri: showImage,
              priority: FastImage.priority.high
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
        </View>
      </Modal>
    );
  };

  const imageFunction = data => {
    setShowImage(data);
    setModalVisibleImage(true);
  };

  const renderEntityMessage = (message, index) => (
    <View
      key={`chat-message-${index}`}
      style={{ width: width, flexDirection: "row" }}
    >
      {message.type === "photo" ? (
        <View
          style={{
            backgroundColor: "transparent",
            padding: 10,
            borderRadius: 10
          }}
        >
          <TouchableOpacity
            onPress={() => imageFunction(imageEnvironment + message.ipfsPath)}
            style={{
              backgroundColor: "#dfdce3",
              borderRadius: 10,
              paddingHorizontal: width * 0.06
            }}
          >
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <FastImage
                style={{
                  width: width * 0.4,
                  height: height * 0.3,
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: height * 0.04
                }}
                source={{
                  uri: message.ipfsPath
                    ? imageEnvironment + message.ipfsPath
                    : img,
                  priority: FastImage.priority.low
                }}
                resizeMode={FastImage.resizeMode.contain}
              />
              <Text
                style={{
                  marginTop: 4,
                  fontSize: width * 0.03,
                  color: "black",
                  marginBottom: height * 0.01,
                  textAlign: "left",
                  alignSelf: "stretch",
                  marginLeft: width * 0.04
                }}
              >
                {moment(message.time)
                  .format("lll")
                  .toString()}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );

  const renderUserMessage = (message, index) => (
    <View
      key={`chat-message-${index}`}
      style={{ width: width, flexDirection: "row-reverse" }}
    >
      {message.type === "text" ? (
        <View
          style={{
            backgroundColor: "transparent",
            padding: 10,
            borderRadius: 10,
            width: width * 0.8
          }}
        >
          <View style={{ backgroundColor: chatColor, borderRadius: 10 }}>
            <Text
              style={{
                fontSize: width * 0.05,
                color: "black",
                paddingVertical: height * 0.01,
                paddingHorizontal: width * 0.04
              }}
            >
              {message.message}
            </Text>
            <Text
              style={{
                fontSize: width * 0.03,
                color: "black",
                marginBottom: height * 0.01,
                textAlign: "right",
                alignSelf: "stretch",
                marginRight: width * 0.04
              }}
            >
              {moment(message.time)
                .format("lll")
                .toString()}
            </Text>
          </View>
        </View>
      ) : null}
    </View>
  );

  const renderEntityMessages = () => {
    if (!isObjEmpty(entityConversation)) {
      if (entityConversation.hasOwnProperty(entity._id)) {
        return entityConversation[entity._id].map((message, index) =>
          message.type === "photo"
            ? renderEntityMessage(message, index)
            : renderUserMessage(message, index)
        );
      }
    }

    return null;
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        hidden={true}
        barStyle="light-content"
        backgroundColor={statusBarColor}
      />
      <SafeAreaView>
        <KeyboardAvoidingView
          style={{
            backgroundColor: "white",
            height: height,
            width: width,
            justifyContent: "space-between"
          }}
          behavior="padding"
          keyboardVerticalOffset={20}
        >
          <View style={styles.center}>{renderHeader()}</View>
          <ScrollView
            ref={ref => (this.scrollView = ref)}
            onContentSizeChange={(contentWidth, contentHeight) => {
              this.scrollView.scrollToEnd({ animated: false });
            }}
            style={{ flex: 1 }}
          >
            {renderEntityMessages()}
          </ScrollView>
          <View>{renderSendBox()}</View>
        </KeyboardAvoidingView>
        {renderModal()}
      </SafeAreaView>
    </View>
  );
};

EntityChatScreen.propTypes = {};

function mapStateToProps(state) {
  console.log("State > ", state);

  return {
    userInfo: state.storageData,
    userToken: state.userToken,
    entityConversation: state.entityConversation
  };
}

export default connect(mapStateToProps, {
  resetConv,
  setEntityConversation,
  addInEntityConv
})(EntityChatScreen);
