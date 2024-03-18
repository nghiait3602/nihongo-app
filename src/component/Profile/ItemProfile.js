import { StyleSheet, Text, TouchableOpacity, View, Dimensions } from "react-native";
import React from "react";
import { AntDesign, Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import { Colors } from "../../constants/colors";

const ItemProfile = ({ onPress, title, icon, font }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.outter}>
        <View style={styles.inner}>
          {font === 1 ? (
            <Ionicons name={icon} size={24} color={Colors.backgroundSliver} />
          ) : font === 2 ? (
            < SimpleLineIcons name={icon} size={20} color={Colors.backgroundSliver} />
          ) : (
            <AntDesign name={icon} size={22} color={Colors.backgroundSliver} />
          )}
          <Text style={styles.text}>{title}</Text>
        </View>

        <AntDesign
          name="right"
          size={18}
          color={Colors.backgroundSliver}
          style={{ bottom: -3, marginRight: 10 }}
        />
      </View>
      <View style={styles.divider} />
    </TouchableOpacity>
  );
};

export default ItemProfile;

var width = Dimensions.get("window").width;
var height = Dimensions.get("window").height;

const styles = StyleSheet.create({
  divider: {
    borderColor: Colors.backgroundSliver,
    opacity: 0.7,
    borderWidth: 0.3,
    width: width - 35,
    marginLeft: 10,
    marginBottom: 5,
    marginTop: 7,
  },
  outter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inner: {
    flexDirection: "row",
    marginHorizontal: 20,
    alignItems: "center",
    marginVertical: 6,
  },
  text: {
    marginLeft: 10,
    fontSize: 12,
    color: Colors.backgroundSliver,
  },
});
