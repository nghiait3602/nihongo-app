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
import userAPI from "../../Api/authApi";

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

  const [TienTrinhUser, setTienTrinhUser] = useState([]);
  const [tienTrinhID, setTienTrinhID] = useState([]);
  const [userIdNow, setUserIdNow] = useState(null);
  const [nonSubmit, setNonSubmit] = useState(false); // state khong co nut submit

  const [selectedButtonsArray, setSelectedButtonsArray] = useState([]);

  const [firstAttempt, setFirstAttempt] = useState(true); // lan dau lam bai tap
  const [showFunction, setShowFunction] = useState(false);

  useEffect(() => {
    fetchData();
    fetchDataMe();
  }, [token, idBaiHoc, userIdNow]);

  const fetchData = async () => {
    try {
      const response = await BaiHocApi.BaiHocHandler(
        `/${idBaiHoc}/tientrinhbaihoc`,
        null,
        "get",
        token
      );
      if (response.status === "success" && response.results >= 1) {
        const responseData = response.data.data;
        if (Array.isArray(responseData) && responseData.length > 0) {
          const userIds = responseData.map((item) => item.user);
          const baiTapHoanThanh = responseData[0].baiHocHoanhThanh;

          let userScore = null;
          let DataCauTraLoi = null;
          responseData.forEach((data) => {
            if (data.user === userIdNow) {
              userScore = data.diemSo;
              DataCauTraLoi = data.dsCauTraLoi;
            }
          }); // lap qua database de tim diem cua user now

          //Kiem tra bai tap hoan thanh
          if (
            TienTrinhUser &&
            TienTrinhUser.includes(idBaiHoc) &&
            baiTapHoanThanh &&
            userIds.includes(userIdNow)
          ) {
            Alert.alert(
              "Bài tập đã hoàn thành!",
              `Bạn đã hoàn thành bài tập này với số điểm là ${userScore}.`,
              [
                {
                  text: "Làm lại",
                  onPress: () => {
                    setSelectedButtons({});
                    setNonSubmit(false);
                    setFirstAttempt(false);
                  },
                },
                {
                  text: "Xem",
                  onPress: () => {
                    // Kiểm tra xem có tồn tại không
                    if (DataCauTraLoi !== null) {
                      // Truy cập vào phần tử của mảng lồng nhau
                      const id = DataCauTraLoi.map((item) => item.iDCauHoi);
                      const buttonName = DataCauTraLoi.map(
                        (item) => item.cauTraLoi
                      );
                      console.log(id);
                      console.log(buttonName);
                      const selectedButtonsObj = {};
                      id.forEach((id, index) => {
                        selectedButtonsObj[id] = buttonName[index];
                      });
                      setSelectedButtons(selectedButtonsObj);
                      setIsSubmitted(true);
                      setNonSubmit(true);
                      setShowFunction(true);
                    } else {
                      console.error(
                        "DataCauTraLoi trả về undefined hoặc null."
                      );
                    }
                  },
                },
              ],
              { cancelable: false }
            );
          }
        } else {
          console.error("responseData trả về undefined hoặc null.");
        }
      }
    } catch (error) {
      console.error("Error fetching user data: ", error);
    }
  };

  const fetchDataMe = async () => {
    try {
      const response = await userAPI.HandlerAuthentication(
        `/me`,
        null,
        "get",
        token
      );
      if (
        response.status === "success" &&
        response.data.data.tienTrinhCuaToi.length > 0
      ) {
        const tienTrinh = response.data.data.tienTrinhCuaToi.map(
          (tienTrinh) => tienTrinh.baiHoc._id
        );
        const tienTrinhIds = response.data.data.tienTrinhCuaToi.map(
          (tienTrinh) => tienTrinh._id
        );
        setTienTrinhUser(tienTrinh);
        setTienTrinhID(tienTrinhIds);
        setUserIdNow(response.data.data.id);
      }
    } catch (error) {
      console.error("Error fetching user data: ", error);
    }
  };

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

  const selectHandler2 = (iDCauHoi, cauTraLoi) => {
    const existingAnswerIndex = selectedButtonsArray.findIndex(
      (answer) => answer.iDCauHoi === iDCauHoi
    );
    if (existingAnswerIndex !== -1) {
      // Nếu đã có câu trả lời cho câu hỏi này, thay thế lựa chọn mới vào vị trí cũ
      const updatedSelectedButtonsArray = [...selectedButtonsArray];
      updatedSelectedButtonsArray[existingAnswerIndex] = {
        iDCauHoi: iDCauHoi,
        cauTraLoi: cauTraLoi,
      };
      setSelectedButtonsArray(updatedSelectedButtonsArray);
    } else {
      // Nếu chưa có câu trả lời cho câu hỏi này, thêm lựa chọn mới vào mảng
      setSelectedButtonsArray((prevArray) => [
        ...prevArray,
        { iDCauHoi: iDCauHoi, cauTraLoi: cauTraLoi },
      ]);
    }
  };

  const selectHandler = (id, buttonName) => {
    const updatedSelectedButtons = { ...selectedButtons }; // Tạo bản sao của trạng thái hiện tại
    updatedSelectedButtons[id] = buttonName; // Đánh dấu nút đã được chọn
    setSelectedButtons(updatedSelectedButtons); // Cập nhật trạng thái mới

    selectHandler2(id, buttonName);
    console.log(`Đã chọn câu ${id} - ${buttonName}`);
  };

  const updateHandlerTienTrinh = async (tongDiem) => {
    try {
      const dataUpdate = {
        diemSo: tongDiem, // Đặt lại điểm tổng mới
        baiHocHoanhThanh: true, // Đánh dấu là bài chưa hoàn thành
        createAt: Date.now(), // Cập nhật thời gian
        dsCauTraLoi: selectedButtonsArray, // Đặt lại danh sách câu trả lời mới
      };

      const response = await BaiHocApi.BaiHocHandler(
        `/${idBaiHoc}/tientrinhbaihoc`,
        dataUpdate,
        "patch",
        token
      );

      if (response.data && idBaiHoc) {
        setCauHoi(response.data.data);
        setError(null);
      } else {
        setError("Dữ liệu trả về từ server không hợp lệ.");
      }
    } catch (error) {
      console.error("Error updating tien trinh:", error);
      setError("Đã xảy ra lỗi khi cập nhật tiến trình. Vui lòng thử lại sau.");
    }
  };

  const handlerTienTrinh = async (tongDiem) => {
    try {
      const dataCreate = {
        diemSo: tongDiem,
        baiHocHoanhThanh: true,
        createAt: Date.now(),
        dsCauTraLoi: selectedButtonsArray,
      };

      const response = await BaiHocApi.BaiHocHandler(
        `/${idBaiHoc}/tientrinhbaihoc`,
        dataCreate,
        "post",
        token
      );

      if (response.data && idBaiHoc) {
        setCauHoi(response.data.data);
        setError(null);
      } else {
        setError("Dữ liệu trả về từ server không hợp lệ.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Đã xảy ra lỗi khi tải dữ liệu. Vui lòng thử lại sau.");
    }
  };

  const submitHandler = () => {
    const cauHoiChuaTraLoi = cauHoi.filter(
      (item) => !selectedButtons[item._id]
    );
    if (cauHoiChuaTraLoi.length === 0) {
      setIsSubmitted(true); // Cập nhật trạng thái đã nộp bài
      let tongDiem = 0;
      let tongCauDung = 0;
      // Duyệt qua mảng câu hỏi
      cauHoi.forEach((item) => {
        if (selectedButtons[item._id] === item.cauTraLoiDung) {
          tongDiem += item.diem;
        }
        tongCauDung += item.diem;
      });
      if (tongDiem >= tongCauDung / 2) {
        if (firstAttempt) {
          handlerTienTrinh(tongDiem);
        } else {
          updateHandlerTienTrinh(tongDiem);
        }
        setFirstAttempt(false);
        Alert.alert(
          "Chúc mừng hoàn thành bài học!",
          `Tổng điểm của bạn là: ${tongDiem}/${tongCauDung}`,
          [{ text: "OK", onPress: () => navigation.goBack() }],
          { cancelable: false }
        );
      } else {
        Alert.alert(
          "Điểm dưới trung bình!",
          `Điểm hiện tại là ${tongDiem}/${tongCauDung}. Vui lòng học và kiểm tra lại để hoàn thành bài học.`,
          [{ text: "OK", onPress: () => navigation.goBack() }],
          { cancelable: false }
        );
      }
    } else {
      Alert.alert(
        "Còn câu chưa trả lời!",
        "Hãy hoàn thành tất cả câu hỏi để nộp bài.",
        [{ text: "OK" }],
        { cancelable: false }
      );
    }
  };

  const NoiDung = ({ item, index }) => {
    const selectedAnswer = selectedButtons[item._id];
    const correctAnswer = item.cauTraLoiDung;
    const isCorrect = selectedAnswer === correctAnswer;

    return (
      <View style={styles.khoangTrang}>
        <Text style={styles.text}>
          {index + 1}. {item.cauHoi}
        </Text>
        <View style={styles.buttonRow}>
          <ColorButton
            color={Colors.Cardinal}
            selected={selectedAnswer === item.cauTraLoi[0]}
            onPress={() => {
              selectHandler(item._id, item.cauTraLoi[0]);
              setShowFunction(true); // Khi người dùng chọn câu trả lời, hiển thị phần xem câu trả lời
            }}
            borderColor={
              isSubmitted && !isCorrect && selectedAnswer === item.cauTraLoi[0]
                ? Colors.cauSai
                : undefined
            } // Hiển thị viền đỏ nếu câu trả lời sai hoặc người dùng đang xem lại bài
          >
            {item.cauTraLoi[0]}
          </ColorButton>
          <ColorButton
            color={Colors.Feather_Green}
            selected={selectedAnswer === item.cauTraLoi[1]}
            onPress={() => {
              selectHandler(item._id, item.cauTraLoi[1]);
              setShowFunction(true);
            }}
            borderColor={
              isSubmitted && !isCorrect && selectedAnswer === item.cauTraLoi[1]
                ? Colors.cauSai
                : undefined
            }
          >
            {item.cauTraLoi[1]}
          </ColorButton>
        </View>
        <View style={styles.buttonRow}>
          <ColorButton
            color={Colors.Fox}
            selected={selectedAnswer === item.cauTraLoi[2]}
            onPress={() => {
              selectHandler(item._id, item.cauTraLoi[2]);
              setShowFunction(true);
            }}
            borderColor={
              isSubmitted && !isCorrect && selectedAnswer === item.cauTraLoi[2]
                ? Colors.cauSai
                : undefined
            }
          >
            {item.cauTraLoi[2]}
          </ColorButton>
          <ColorButton
            color={Colors.Humpback}
            selected={selectedAnswer === item.cauTraLoi[3]}
            onPress={() => {
              selectHandler(item._id, item.cauTraLoi[3]);
              setShowFunction(true);
            }}
            borderColor={
              isSubmitted && !isCorrect && selectedAnswer === item.cauTraLoi[3]
                ? Colors.cauSai
                : undefined
            }
          >
            {item.cauTraLoi[3]}
          </ColorButton>
        </View>
        {showFunction && isSubmitted && !isCorrect && (
          <View
            style={{
              alignContent: "center",
              alignItems: "center",
              paddingTop: 5,
            }}
          >
            <Text
              style={{ fontFamily: "Nunito_ExtraBold", color: Colors.Cardinal }}
            >
              Câu trả lời đúng: {correctAnswer}
            </Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.Snow }}>
      {loading && <Loading isVisible={loading}></Loading>}
      {error && <Text style={styles.errorText}>{error}</Text>}
      {!loading && !error && cauHoi.length > 0 && (
        <FlatList
          data={cauHoi}
          renderItem={NoiDung}
          keyExtractor={(item) => item._id}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
      )}
      {Object.keys(selectedButtons).length > 0 &&
        !nonSubmit &&
        showFunction && (
          <View style={styles.submitButtonContainer}>
            <ColorButton
              style={styles.submitButton}
              color={Colors.Beetle}
              onPress={submitHandler}
            >
              Nộp bài
            </ColorButton>
          </View>
        )}
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
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 16,
  },
  khoangTrang: {
    top: 5,
    backgroundColor: Colors.Snow,
    borderRadius: 30,
    paddingVertical: 15,
    elevation: 4,
    marginBottom: 15,
  },
  submitButtonContainer: {
    position: "absolute",
    alignItems: "center",
    bottom: 20,
    width: width,
  },
  errorText: {
    color: Colors.Cardinal,
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
});
