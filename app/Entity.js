import React from "react";
import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import FastImage from "react-native-fast-image";
import { entityIcon } from "./comman/constants";
import IconTwo from "react-native-vector-icons/Ionicons";
import { imageEnvironment } from "./environment/environment";

const { width, height } = Dimensions.get("window");

function Entity({ item, onPressEntity, index }) {
  return (
    <View
      style={{
        height: height * 0.12,
        width: width,
        backgroundColor: "transparent",
        borderBottomColor: "#cdcbd1",
        borderBottomWidth: 1,
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <View
        style={{
          flexDirection: "row",
          width: width,
          paddingLeft: width * 0.04
        }}
      >
        <TouchableOpacity
        //   onPress={() =>
        //     onPressPicture(
        //       item.recieverInfo[0].profilePhoto
        //         ? imageEnvironment + item.recieverInfo[0].profilePhoto
        //         : null
        //     )
        //   }
        >
          <FastImage
            style={{
              width: width * 0.16,
              height: width * 0.16,
              borderRadius: width * 0.16
            }}
            source={entityIcon}
            resizeMode={FastImage.resizeMode.cover}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={{ paddingLeft: width * 0.04 }}
          onPress={() => onPressEntity(item, index)}
        >
          <Text
            numberOfLines={1}
            style={{
              fontSize: width * 0.05,
              color: "black",
              width: width * 0.66
            }}
          >
            {item.name ? item.name : "Entity"}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              fontSize: width * 0.04,
              color: "#99979c",
              width: width * 0.66
            }}
          >
            Available
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

Entity.propTypes = {};

export default Entity;
