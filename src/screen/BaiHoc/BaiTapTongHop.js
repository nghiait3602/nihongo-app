import {
  StyleSheet,
  Text,
  View,
  Platform,
  SafeAreaView,
  Dimensions,
  FlatList,
  Alert,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../constants/colors";
import ColorButton from "../../component/UI/Button/ColorButton";
import Loading from "../../Modals/Loading";

import { useSelector } from "react-redux";
import { authSelector } from "../../redux/reducers/authReducer"; // Thêm authSelector từ reducer
import BaiHocApi from "../../Api/baihocApi";

import LottieView from "lottie-react-native";
import SectionnsComponent from "../../component/UI/Auth/SectionnsComponent";

var width = Dimensions.get("window").width;
var height = Dimensions.get("window").height;

const BaiTapTongHop = () => {
  const router = useRoute();
  const idBaiHoc = router.params;
  const navigation = useNavigation();
  const [cauHoi, setCauHoi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useSelector(authSelector); // Sử dụng authSelector để lấy token từ Redux store

  const [selectedButtons, setSelectedButtons] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (token) {
      // Kiểm tra xem token có tồn tại không
      handlerCauHoi();
    } else {
      console.error("Authentication token is missing or invalid.");
      setError("Authentication token is missing or invalid."); // Thông báo lỗi
      setLoading(false); // Dừng hiển thị indicator loading
    }
  }, [token, idBaiHoc]); // Chạy lại effect khi token thay đổi

  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", (e) => {
      if (!isSubmitted && Object.keys(selectedButtons).length > 0) {
        e.preventDefault();
        Alert.alert(
          "Nộp bài",
          "Bạn có muốn nộp bài trước khi quay lại không?",
          [
            {
              text: "Không",
              onPress: () => {
                navigation.dispatch(e.data.action);
              },
              style: "cancel",
            },
            {
              text: "Nộp luôn",
              onPress: () => {
                submitHandler();
              },
            },
          ],
          { cancelable: false }
        );
      }
    });
  
    // trả về một hàm trống từ useEffect
    return unsubscribe;
  }, [isSubmitted, navigation, selectedButtons]);

  const handlerCauHoi = async () => {
    try {
      const response = await BaiHocApi.BaiHocHandler(
        `/${idBaiHoc}/cauhoi`,
        null,
        "get",
        token
      ); // Truyền token từ Redux store vào API

      if (response.data && idBaiHoc) {
        const data = response.data.data; // Lấy mảng dữ liệu từ trường "data"
        setCauHoi(data);
        setLoading(false);
        setError(null);
      } else {
        setError("Dữ liệu trả về từ server không hợp lệ.");
        setLoading(false);
      }
      if (response.results === 0) {
        setError("Trong bài học này không có ngữ pháp.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Đã xảy ra lỗi khi tải dữ liệu. Vui lòng thử lại sau.");
      setLoading(false);
    }
  };

  if (cauHoi.length === 0 && !loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
        }}
      >
        <SectionnsComponent>
          <LottieView
            autoPlay
            style={{ width: "100%", height: "100%" }}
            source={require("../../../assets/Img/Nodata.json")}
          ></LottieView>
        </SectionnsComponent>
      </View>
    );
  }

  const selectHandler = (id, buttonName) => {
    console.log(`Đã chọn câu ${id} - ${buttonName}`);

    const updatedSelectedButtons = { ...selectedButtons }; // Tạo bản sao của trạng thái hiện tại
    updatedSelectedButtons[id] = buttonName; // Đánh dấu nút đã được chọn
    setSelectedButtons(updatedSelectedButtons); // Cập nhật trạng thái mới
  };

  const submitHandler = () => {
    setIsSubmitted(true); // Cập nhật trạng thái đã nộp bài
    let tongDiem = 0;
    // Duyệt qua mảng câu hỏi
    cauHoi.forEach((item) => {
      if (selectedButtons[item._id] === item.cauTraLoiDung) {
        tongDiem += item.diem;
      }
    });
    Alert.alert(
      "Tổng điểm",
      `Tổng điểm của bạn là: ${tongDiem}`,
      [{ text: "OK", onPress: () => navigation.goBack() }],
      { cancelable: false }
    );
  };

  const NoiDung = ({ item, index }) => (
    <View>
      <Text style={styles.text}>
        {index + 1}. {item.cauHoi}
      </Text>
      <View style={styles.buttonContainer}>
        <ColorButton
          color={Colors.Beak_Upper}
          selected={selectedButtons[item._id] === item.cauTraLoi[0]}
          onPress={() => selectHandler(item._id, item.cauTraLoi[0])}
        >
          {item.cauTraLoi[0]}
        </ColorButton>
        <ColorButton
          color={Colors.Cardinal}
          selected={selectedButtons[item._id] === item.cauTraLoi[1]}
          onPress={() => selectHandler(item._id, item.cauTraLoi[1])}
        >
          {item.cauTraLoi[1]}
        </ColorButton>
        <ColorButton
          color={Colors.Feather_Green}
          selected={selectedButtons[item._id] === item.cauTraLoi[2]}
          onPress={() => selectHandler(item._id, item.cauTraLoi[2])}
        >
          {item.cauTraLoi[2]}
        </ColorButton>
        <ColorButton
          color={Colors.Humpback}
          selected={selectedButtons[item._id] === item.cauTraLoi[3]}
          onPress={() => selectHandler(item._id, item.cauTraLoi[3])}
        >
          {item.cauTraLoi[3]}
        </ColorButton>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {loading && <Loading isVisible={loading}></Loading>}
      {error && <Text style={styles.errorText}>{error}</Text>}
      {!loading && !error && cauHoi.length > 0 && (
        <FlatList
          data={cauHoi}
          renderItem={NoiDung}
          keyExtractor={(item) => item._id}
        />
      )}
      <View style={styles.submitButtonContainer}>
        <ColorButton
          style={styles.submitButton}
          color={Colors.Beetle}
          onPress={submitHandler}
        >
          Nộp bài
        </ColorButton>
      </View>
    </View>
  );
};

export default BaiTapTongHop;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Snow,
    paddingTop: Platform.OS === "android" ? 20 : 0,
  },
  text: {
    marginHorizontal: 12,
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: width,
  },
  submitButtonContainer: {
    position: "absolute",
    bottom: 20,
    width: width,
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
});
