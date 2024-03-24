import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Dimensions, TextInput } from "react-native";
import { AntDesign, Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import { Colors } from "../../constants/colors";

const ItemProfile = ({ title, icon, font }) => {
  const [editing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handlePress = () => {
    if (title === "Tên người dùng" || title === "Email" || title === "Ngày sinh") {
      setEditing(true);
    }
  };

  const handleInputChange = (text) => {
    setInputValue(text);
  };

  const handleInputSubmit = () => {
    setEditing(false);
    // Xử lý api sau khi call
    console.log("Văn bản đã nhập:", inputValue);
  };

  return (
    <View>
      {editing ? (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={inputValue}
            onChangeText={handleInputChange}
            onSubmitEditing={handleInputSubmit}
            autoFocus={true}
          />
        </View>
      ) : (
        <TouchableOpacity onPress={handlePress}>
          <View style={styles.outer}>
            <View style={styles.inner}>
              {font === 1 ? (
                <Ionicons name={icon} size={24} color={Colors.backgroundSliver} />
              ) : font === 2 ? (
                <SimpleLineIcons name={icon} size={20} color={Colors.backgroundSliver} />
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
      )}
    </View>
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
  outer: {
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
  inputContainer: {
    borderBottomWidth: 0.3,
    borderColor: Colors.backgroundSliver,
    marginLeft: 10,
    marginBottom: 5,
    marginTop: 7,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    fontSize: 12,
    color: Colors.backgroundSliver,
    marginLeft: 10,
  },
});

