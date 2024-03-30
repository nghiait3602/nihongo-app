import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert,
  Platform,
  ScrollView,
  RefreshControl,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Colors } from "../../constants/colors";
import { AntDesign } from "@expo/vector-icons";
import ItemDangKy from "../../component/Profile/ItemDangKy";
import ItemProfile from "../../component/Profile/ItemProfile";
import { removeAuth, authSelector } from "../../redux/reducers/authReducer";
import { useDispatch, useSelector } from "react-redux";

import userAPI from "../../Api/authApi";
import AsyncStorage from "@react-native-async-storage/async-storage";

var width = Dimensions.get("window").width;
var height = Dimensions.get("window").height;

const Profile = () => {
  const [user, setUser] = useState(null);
  const [image, setImage] = useState("");
  const [newName, setNewName] = useState("");
  const [newBirthDate, setNewBirthDate] = useState("");
  const dispatch = useDispatch();
  const { token } = useSelector(authSelector);

  const [refreshing, setRefreshing] = useState(false); // State để theo dõi trạng thái của action làm mới

  // Hàm để xử lý làm mới dữ liệu
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchData();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("Quyền truy cập thư viện ảnh đã bị từ chối!");
        }
      }
    })();
  }, []);

  const fetchData = async () => {
    try {
      const response = await userAPI.HandlerAuthentication(
        `/me`,
        null,
        "get",
        token
      );
      setUser(response.data.data); // Sửa thành response.data.data để truy cập vào đối tượng người dùng
    } catch (error) {
      console.error("Error fetching user data: ", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [token]);

  const updateUserData = async () => {
    try {
      const dataToUpdate = {};
      if (newName !== "") {
        dataToUpdate.name = newName;
      }
      if (newBirthDate !== "") {
        dataToUpdate.ngaySinh = newBirthDate;
      }
      if (image !== "") {
        dataToUpdate.photo = image;
      }
      // Gửi yêu cầu cập nhật dữ liệu lên server
      const response = await userAPI.HandlerAuthentication(
        "/updateMe",
        dataToUpdate,
        "patch",
        token
      );
      if (response.data.user) {
        setUser(response.data.user);
        console.log("Tên mới:", response.data.user.name);
        console.log("Ngày sinh mới:", response.data.user.ngaySinh);
        console.log("Photo mới:", response.data.user.photo);
        Alert.alert("Thông báo", "Cập nhật thành công!");
      } else {
        console.error("Lỗi update user data: Dữ liệu trả về không hợp lệ.");
      }
    } catch (error) {
      console.error("Lỗi update user data: ", error);
    }
  };

  useEffect(() => {
    if (newName !== "" || newBirthDate !== "" || image !== "") {
      updateUserData();
    }
  }, [newName, newBirthDate, image]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result.assets[0].uri); //Duong link lay uri chuan
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      updateUserData();
    }
  };

  const profile = image
    ? { uri: image }
    : user && user.photo
    ? { uri: user.photo }
    : "https://d326fntlu7tb1e.cloudfront.net/uploads/b5065bb8-4c6b-4eac-a0ce-86ab0f597b1e-vinci_04.jpg";
  const bkImg =
    "https://d326fntlu7tb1e.cloudfront.net/uploads/ab6356de-429c-45a1-b403-d16f7c20a0bc-bkImg-min.png";

  const removeItemFromAsyncStorage = async () => {
    try {
      await AsyncStorage.removeItem("chude");
    } catch (error) {
      console.error(`Error removing item from AsyncStorage: ${error}`);
    }
  };
  function logOut() {
    removeItemFromAsyncStorage();
    dispatch(removeAuth());
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={{ backgroundColor: Colors.Snow, height: height }}>
        <View
          style={{
            backgroundColor: Colors.Macaw,
            height: height - 80,
            borderBottomEndRadius: 30,
            borderBottomStartRadius: 30,
          }}
        >
          <Image
            source={{ uri: bkImg }}
            style={[
              StyleSheet.absoluteFillObject,
              {
                opacity: 0.7,
              },
            ]}
          />
          <View style={styles.profile}>
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <TouchableOpacity onPress={pickImage}>
                <Image
                  source={
                    image
                      ? { uri: image }
                      : user && user.photo
                      ? { uri: user.photo }
                      : require("./../../../assets/Icons/avatar.png")
                  }
                  style={{ width: 45, height: 45, borderRadius: 45 / 2 }}
                />
              </TouchableOpacity>
              <View style={{ marginLeft: 10, marginTop: 3 }}>
                <Text style={styles.text}>
                  {user === null ? "username" : user.name}
                </Text>
                <Text style={styles.email}>
                  {user === null ? "email" : user.email}
                </Text>
              </View>
            </View>
            <TouchableOpacity onPress={logOut}>
              <AntDesign name="logout" size={24} color="red" />
            </TouchableOpacity>
          </View>

          <ItemDangKy
            heading={"Đăng ký tài khoản"}
            desc={
              "Hãy tham gia cộng đồng của chúng tôi và giới thiệu những bài học tiếng Nhật của bạn tới bạn bè."
            }
          />

          <View style={styles.box}>
            <ItemProfile
              title={"Tên người dùng"}
              icon={"create-outline"}
              font={1}
              setNewName={setNewName}
              updateUserData={updateUserData}
            />

            <ItemProfile
              title={"Ngày sinh"}
              icon={"calendar"}
              setNewBirthDate={setNewBirthDate}
              updateUserData={updateUserData}
            />
          </View>

          <View style={styles.box}>
            <ItemProfile
              title={`Khóa học đang học: ${
                user && user.tienTrinhCuaToi && user.tienTrinhCuaToi.length > 0
                  ? user.tienTrinhCuaToi[0].baiHoc.khoaHoc.tenKhoahoc
                  : ""
              }`}
              icon={"book"}
              khoaHoc={
                user && user.tienTrinhCuaToi && user.tienTrinhCuaToi.length > 0
                  ? user.tienTrinhCuaToi[0].baiHoc.khoaHoc
                  : null
              }
              tenKH={
                user && user.tienTrinhCuaToi && user.tienTrinhCuaToi.length > 0
                  ? user.tienTrinhCuaToi[0].baiHoc.khoaHoc.tenKhoahoc
                  : ""
              }
            />
            <ItemProfile
              title={`Hoàn thành: ${
                user && user.tienTrinhCuaToi && user.tienTrinhCuaToi.length > 0
                  ? user.tienTrinhCuaToi[0].baiHoc.tenBaiHoc
                  : ""
              }`}
              icon={"check"}
              font={2}
              tenbtht={
                user && user.tienTrinhCuaToi && user.tienTrinhCuaToi.length > 0
                  ? user.tienTrinhCuaToi[0].baiHoc.tenBaiHoc
                  : ""
              }
              btht={
                user && user.tienTrinhCuaToi && user.tienTrinhCuaToi.length > 0
                  ? user.tienTrinhCuaToi[0].baiHoc
                  : ""
              }
            />
            <ItemProfile
              title={`Tiếp theo: ${
                user && user.baiHocTiepTheo ? user.baiHocTiepTheo.tenBaiHoc : ""
              }`}
              icon={"rocket-outline"}
              font={1}
              tenbaihoctt={
                user && user.baiHocTiepTheo ? user.baiHocTiepTheo.tenBaiHoc : ""
              }
              baihoctt={user && user.baiHocTiepTheo ? user.baiHocTiepTheo : ""}
            />
          </View>

          <ItemDangKy
            heading={"Tham gia nhóm trợ giảng"}
            desc={
              "Cùng chúng tôi xây dựng cộng đồng học tiếng Nhật online hiệu quả."
            }
          />

          <View style={styles.box}>
            <ItemProfile
              title={"Phản hồi"}
              icon={"chatbubbles-outline"}
              font={1}
            />
            <ItemProfile title={"Trung tâm dịch vụ"} icon={"customerservice"} />
            <ItemProfile title={"Cài đặt"} icon={"setting"} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  text: {
    marginLeft: 10,
    color: "black",
  },
  email: {
    marginLeft: 10,
    color: "gray",
  },
  box: {
    height: "auto",
    backgroundColor: Colors.Snow,
    margin: 10,
    borderRadius: 12,
    elevation: 3,
  },
  profile: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 60,
  },
});
