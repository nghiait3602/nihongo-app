import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  ScrollView,
  Dimensions,
  Text,
} from "react-native";
import userAPI from "../../Api/authApi";
import { removeAuth, authSelector } from "../../redux/reducers/authReducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import ColorButton from "../../component/UI/Button/ColorButton";
import { Colors } from "../../constants/colors";

const SettingsScreen = () => {
  const [newName, setNewName] = useState("");
  const [newBirthDate, setNewBirthDate] = useState("");
  const [user, setUser] = useState(null);
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

  const fetchData = async () => {
    try {
      const response = await userAPI.HandlerAuthentication(
        `/me`,
        null,
        "get",
        token
      );
      setUser(response.data.data);
    } catch (error) {
      console.error("Error fetching user data: ", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [token]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.label}>Tên</Text>
        <TextInput
          style={[styles.input, {borderColor: newName ? Colors.Mask_Green : Colors.Swan}]}
          value={newName}
          onChangeText={setNewName}
          placeholder={user && user.name}
        />
        <Text style={styles.label}>Ngày sinh</Text>
        <TextInput
          style={[styles.input, {borderColor: newBirthDate ? Colors.Mask_Green : Colors.Swan}]}
          value={newBirthDate}
          onChangeText={setNewBirthDate}
          placeholder={user && user.ngaySinh}
        />
        <ColorButton children="Cập nhật" onPress={updateUserData} />
        <Text style={styles.nonLabel}>Email*</Text>
        <TextInput
          style={styles.noInput}
          placeholder={user && user.email}
          editable={false}
        />
        <Text style={styles.nonLabel}>Quyền hạn*</Text>
        <TextInput
          style={styles.noInput}
          placeholder={user && user.role}
          editable={false}
        />
        <Text style={styles.nonLabel}>Mã định danh*</Text>
        <TextInput
          style={styles.noInput}
          placeholder={user && user.id}
          editable={false}
        />
        <Text
          style={{
            fontStyle: "italic",
            fontSize: 14,
            alignSelf: "center",
            opacity: 0.3,
          }}
        >
          *Giá trị không thể thay đổi
        </Text>
      </ScrollView>
    </View>
  );
};

export default SettingsScreen;

var width = Dimensions.get("window").width;
var height = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.Snow
  },
  scrollViewContent: {
    flexGrow: 0.3,
    justifyContent: "center",
    alignItems: "center",
    
  },
  noInput: {
    width: width - 30,
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.Swan,
    borderRadius: 5,
  },
  input: {
    width: width - 30,
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.Swan,
    borderRadius: 5,    
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "Nunito_ExtraBold",
    alignSelf: "flex-start",
  },
  nonLabel: {
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "Nunito_ExtraBold",
    alignSelf: "flex-start",
    opacity: 0.3
  },
});
