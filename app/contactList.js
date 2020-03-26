import React, { Fragment, useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Modal,
  PermissionsAndroid
} from "react-native";
import styles from "./comman/styles";
import { Actions } from "react-native-router-flux";
import CardView from "react-native-cardview";
import Icon from "react-native-vector-icons/Feather";
import IconTwo from "react-native-vector-icons/AntDesign";
import { connect } from "react-redux";
import { changeLanguage } from "./actions";
import AsyncStorage from "@react-native-community/async-storage";
import Contacts from "react-native-contacts";
import { updateContacts, startConversation } from "./comman/api";
import UserContacts from "./UserContacts";
import ImageModal from "./ImageModal";
import { statusBarColor } from "./comman/constants";
import { processPhoneNumber } from "./utils";

const { width, height } = Dimensions.get("window");

function contactList(props) {
  let [contactData, setContactData] = useState([]);
  let [modalVisible, setModalVisible] = useState(false);
  let [modalImage, setModalImage] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const syncContacts = async () => {
    let userPhone = await AsyncStorage.getItem("phone");

    let data = [];
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
      title: "Contacts",
      message: "This app would like to view your contacts."
    }).then(() => {
      Contacts.getAll((err, contacts) => {
        contacts.map(contact => {
          if (contact.phoneNumbers.length > 0) {
            contact.phoneNumbers.forEach(phoneNumber => {
              let temp = processPhoneNumber(phoneNumber.number);
              // let temp = contact.phoneNumbers[0].number.replace(/[^0-9]/g, "");
              if (temp !== userPhone) {
                data.push(temp);
              }
            });
          }
        });

        updateContacts(data, props.token)
          .then(result => {
            if (!result.data.error) {
              console.log("Updated in contacts > Results > ", result.data.data);

              setContactData(result.data.data);
              storeContactsData(result.data.data);
            }
          })
          .catch(err => {
            console.log(err);
          });
      });
    });
  };

  storeContactsData = async data => {
    try {
      await AsyncStorage.setItem("contactData", JSON.stringify(data));
    } catch (e) {
      console.log(e);
    }
  };

  getData = async () => {
    let data = await AsyncStorage.getItem("contactData");
    console.log("Get Contact Data > ", data);

    if (data !== null) {
      setContactData(JSON.parse(data));
    }
  };

  const renderHeader = () => {
    return (
      <CardView
        style={styles.cardStyle}
        cardElevation={40}
        cardMaxElevation={40}
        cornerRadius={0}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <TouchableOpacity onPress={() => Actions.pop()}>
            <IconTwo
              style={{ marginLeft: width * 0.04 }}
              name="arrowleft"
              color="white"
              size={width * 0.07}
            />
          </TouchableOpacity>

          <Text style={styles.titleFont}>
            {props.storageData.lan.contacts_value}
          </Text>

          <TouchableOpacity onPress={() => syncContacts()}>
            <Icon
              style={{ marginRight: width * 0.04 }}
              name="refresh-ccw"
              color="white"
              size={width * 0.07}
            />
          </TouchableOpacity>
        </View>
      </CardView>
    );
  };

  function onPressContact(item) {
    let recieverInfo = [];
    recieverInfo.push(item.profile);
    item.recieverInfo = recieverInfo;

    startConversation(item.phone, props.token)
      .then(result => {
        if (!result.data.error) {
          Actions.chatScreen({ data: result.data.data[0], item: item });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  const renderContactList = () => {
    return contactData.map((item, index) => {
      return (
        <UserContacts
          item={item}
          onPressContact={onPressContact}
          onPressPicture={onPressPicture}
          key={`user-contact-${index}`}
        />
      );
    });
  };

  function onPressPicture(item) {
    setModalImage(item);
    setModalVisible(true);
  }

  const renderModal = () => {
    return (
      <Modal animationType="slide" transparent={false} visible={modalVisible}>
        <ImageModal setModalVisible={setModalVisible} picture={modalImage} />
      </Modal>
    );
  };

  return (
    <Fragment>
      <StatusBar barStyle="light-content" backgroundColor={statusBarColor} />
      <SafeAreaView>
        <View
          style={{
            backgroundColor: "white",
            height: height,
            width: width
          }}
        >
          <View style={styles.center}>{renderHeader()}</View>
          <ScrollView
            style={{
              width: width,
              height: height * 0.9,
              marginTop: height * 0.02
            }}
          >
            {renderContactList()}
          </ScrollView>
        </View>
        {renderModal()}
      </SafeAreaView>
    </Fragment>
  );
}

function mapStateToProps(state) {
  return {
    storageData: state
  };
}

export default connect(mapStateToProps, { changeLanguage })(contactList);
