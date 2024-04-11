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
  const [nowPass, setNowPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmNewPass, setConfirmNewPass] = useState("");
  const [user, setUser] = useState(null);
  const [birthDateError, setBirthDateError] = useState(false);
  const navigation = useNavigation();
  const { token } = useSelector(authSelector);

  const dispatch = useDispatch();

  const validateDateFormat = (dateString) => {
    const DDMMYYYY = /^([0-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/; //check validate có đúng dd/mm/yyy
    return DDMMYYYY.test(dateString); // return về true hoặc false
  };

  const updateUserData = async () => {
    // Kiểm tra
    Alert.alert(
      "Xác nhận",
      "Bạn có muốn cập nhật thông tin không?",
      [
        {
          text: "Hủy",
          style: "cancel",
        },
        {
          text: "Đồng ý",
          onPress: async () => {
            try {
              const dataToUpdate = {};
              if (newName !== "") {
                dataToUpdate.name = newName;
              }
              if (newBirthDate !== "" && validateDateFormat(newBirthDate)) {
                dataToUpdate.ngaySinh = newBirthDate;
                setBirthDateError(false);
              } else {
                setBirthDateError(true);
                return;
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
                console.error(
                  "Lỗi update user data: Dữ liệu trả về không hợp lệ."
                );
              }
            } catch (error) {
              console.error("Lỗi update user data: ", error);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const updateUserPassword = async () => {
    Alert.alert(
      "Xác nhận",
      "Bạn có muốn cập nhật mật khẩu không?",
      [
        {
          text: "Hủy",
          style: "cancel",
        },
        {
          text: "Đồng ý",
          onPress: async () => {
            try {
              const UpdatePassword = {};
              if (nowPass !== "") {
                UpdatePassword.passwordCurrent = nowPass;
              }
              if (newPass !== "") {
                UpdatePassword.password = newPass;
              }
              if (confirmNewPass !== "") {
                UpdatePassword.passwordConfirm = confirmNewPass;
              }
              const response = await userAPI.HandlerAuthentication(
                `/updateMyPassword`,
                UpdatePassword,
                "patch",
                token
              );
              console.log(response);
              if (response.status === "success") {
                Alert.alert(
                  "Thông báo",
                  `Cập nhật thành công. Vui lòng đăng nhập lại.`,
                  [{ text: "OK", onPress: () => dispatch(removeAuth()) }],
                  { cancelable: false }
                );
              } else if (response.status === "error") {
                Alert.alert(
                  "Mật khẩu không khớp hoặc quá ngắn",
                  `Vui lòng xác nhận lại hoặc điều chỉnh lại mật khẩu.`,
                  [{ text: "OK" }],
                  { cancelable: false }
                );
              } else {
                Alert.alert(
                  "Sai mật khẩu hiện tại",
                  `Vui lòng nhập lại mật khẩu hiện tại chính xác.`,
                  [{ text: "OK" }],
                  { cancelable: false }
                );
              }
            } catch (error) {
              console.error("Lỗi update user data: ", error);
            }
          },
        },
      ],
      { cancelable: false }
    );
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
          style={[
            styles.input,
            { borderColor: newName ? Colors.Mask_Green : Colors.Swan },
          ]}
          value={newName}
          onChangeText={setNewName}
          placeholder={user && user.name}
        />
        <Text style={styles.label}>Ngày sinh</Text>
        <TextInput
          style={[
            styles.input,
            {
              borderColor: birthDateError
                ? Colors.Cardinal
                : newBirthDate
                ? Colors.Mask_Green
                : Colors.Swan,
            },
          ]}
          value={newBirthDate}
          onChangeText={setNewBirthDate}
          placeholder={user && user.ngaySinh}
        />
        {birthDateError && (
          <Text style={styles.errorMessage}>
            Ngày sinh không đúng định dạng (dd/mm/yyyy)
          </Text>
        )}
        <ColorButton children="Cập nhật" onPress={updateUserData} />

        <Text style={styles.label}>Mật khẩu hiện tại</Text>
        <TextInput
          style={[
            styles.input,
            { borderColor: nowPass ? Colors.Mask_Green : Colors.Swan },
          ]}
          value={nowPass}
          onChangeText={setNowPass}
        />
        <Text style={styles.label}>Mật khẩu mới</Text>
        <TextInput
          style={[
            styles.input,
            {
              borderColor: newPass
                ? newPass.length >= 8
                  ? Colors.Mask_Green
                  : Colors.Cardinal
                : Colors.Swan,
            },
          ]}
          value={newPass}
          onChangeText={setNewPass}
        />
        {newPass && newPass.length < 8 && (
          <Text style={styles.errorMessage}>
            Mật khẩu phải có độ dài tối thiểu 8 ký tự.
          </Text>
        )}
        <Text style={styles.label}>Xác nhận mật khẩu</Text>
        <TextInput
          style={[
            styles.input,
            {
              borderColor: confirmNewPass
                ? confirmNewPass === newPass
                  ? Colors.Mask_Green
                  : Colors.Cardinal
                : Colors.Swan,
            },
          ]}
          value={confirmNewPass}
          onChangeText={setConfirmNewPass}
        />
        {confirmNewPass && confirmNewPass !== newPass && (
          <Text style={styles.errorMessage}>Mật khẩu không khớp.</Text>
        )}
        <ColorButton
          children="Đổi mật khẩu"
          onPress={updateUserPassword}
          color={Colors.Humpback}
        />

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
    backgroundColor: Colors.Snow,
  },
  scrollViewContent: {
    flexGrow: 0.3,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 10,
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
    opacity: 0.3,
  },
  errorMessage: {
    color: Colors.Cardinal,
    fontSize: 12,
    marginBottom: 5,
    alignSelf: "flex-start",
    marginLeft: 10,
  },
});
