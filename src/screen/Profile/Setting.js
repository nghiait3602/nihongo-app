import React, { useState, useEffect } from "react";
import { View, TextInput, Button, Alert, StyleSheet } from "react-native";
import userAPI from "../../Api/authApi";
import { removeAuth, authSelector } from "../../redux/reducers/authReducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const SettingsScreen = () => {
  const [newName, setNewName] = useState("");
  const [newBirthDate, setNewBirthDate] = useState("");
  const navigation = useNavigation();
  const { token } = useSelector(authSelector);

  const updateUserData = async () => {
    try {
      const dataToUpdate = {};
      if (newName !== "") {
        dataToUpdate.name = newName;
      }
      if (newBirthDate !== "") {
        dataToUpdate.ngaySinh = newBirthDate;
      }
      // Gửi yêu cầu cập nhật dữ liệu lên server
      const response = await userAPI.HandlerAuthentication(
        "/updateMe",
        dataToUpdate,
        "patch",
        token
      );
      if (response.data.user) {
        console.log("Tên mới:", response.data.user.name);
        console.log("Ngày sinh mới:", response.data.user.ngaySinh);
        Alert.alert(
          "Thông báo",
          `Cập nhật thành công.`,
          [{ text: "OK", onPress: () => navigation.goBack() }],
          { cancelable: false }
        );
      } else {
        console.error("Lỗi update user data: Dữ liệu trả về không hợp lệ.");
      }
    } catch (error) {
      console.error("Lỗi update user data: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={newName}
        onChangeText={setNewName}
        placeholder="Tên mới"
      />
      <TextInput
        style={styles.input}
        value={newBirthDate}
        onChangeText={setNewBirthDate}
        placeholder="Ngày sinh mới"
      />
      <Button title="Cập nhật" onPress={updateUserData} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});

export default SettingsScreen;
