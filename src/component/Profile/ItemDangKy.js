import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from "react-native";
import React from "react";
import { Colors } from "../../constants/colors";

const ItemDangKy = ({ onPress, heading, desc }) => {
  return (
    <View style={styles.outer}>
      <View style={styles.inner}>
        <View>
          <Text style={styles.text}>{heading}</Text>
          <Text style={styles.email}>
           {desc}
          </Text>
        </View>

        <TouchableOpacity
          style={{
            width: 90,
            height: 30,
            borderRadius: 40,
            borderColor: "black",
            borderWidth: 0.5,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={onPress}
        >
          <Text>Đăng ký</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ItemDangKy;

var width = Dimensions.get("window").width;
var height = Dimensions.get("window").height;

const styles = StyleSheet.create({
  outer: {
    height: 75,
    backgroundColor: "white",
    margin: 10,
    borderRadius: 12,
  },
  inner: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 10,
  },
  text: {
    marginLeft: 10,
    color: "black",
    fontSize: 14
  },
  email: {
    marginLeft: 10,
    color: Colors.backgroundSliver,
    fontSize: 10,
    marginTop: 3,
    width: width * 0.56,
    textAlign: "justify",
  },
});
