import {
  StyleSheet,
  Text,
  View,
  Platform,
  SafeAreaView,
  Dimensions,
  FlatList,
} from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import BaiTap from "../../../data/BaiTap.json";
import { Colors } from "../../constants/colors";
import Header from "../../component/UI/Header/header";
import { useNavigation } from "@react-navigation/native";
import ColorButton from "../../component/UI/Button/ColorButton";

var width = Dimensions.get("window").width;
var height = Dimensions.get("window").height;

const BaiTapTongHop = () => {
  const navigation = useNavigation();
  const router = useRoute();
  const data = router.params;
  const [Baihoc, setBaihoc] = useState(null); // Khởi tạo state Baihoc với giá trị ban đầu là null

  const [buttonStates, setButtonStates] = useState({
    A: false,
    B: false,
    C: false,
    D: false,
  });

  function navigationHandler() {
    navigation.goBack();
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Lấy dữ liệu từ API hoặc nguồn dữ liệu khác ở đây
        // Ví dụ: const response = await fetch('API_URL');
        // const data = await response.json();
        // Sau đó, tìm phần tử trong mảng dữ liệu có id trùng với data
        const item = BaiTap.sections[0].data.find((item) => item.id === data);
        // Gán giá trị cho state Baihoc
        setBaihoc(item);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Gọi hàm fetchData trong useEffect
  }, [data]); // Sử dụng useEffect với dependency là data

  // Kiểm tra nếu Baihoc chưa được gán giá trị, trả về null hoặc hiển thị thông báo loading
  if (!Baihoc) {
    return (
      <View>
        <Text>Loading....</Text>
      </View>
    );
  }

  const DATA = [
    {
      id: 1,
      cauhoi: "自分 - Kanji này là gì?",
      dapan: "",
    },
    {
      id: 2,
      cauhoi: "自分 - Kanji này là gì?",
      dapan: "",
    },
    {
      id: 3,
      cauhoi: "自分 - Kanji này là gì?",
      dapan: "",
    },
  ];

  const confirmHandler = (buttonName) => {  
    console.log(`Đã chọn câu ${buttonName}`);
  }

  const NoiDung = (props) => (
    <View style={styles.answerButtons}>
      <Text style={styles.text}>
        {props.id}. {props.cauhoi}
      </Text>
      <View style={styles.buttonContainer}>
        <ColorButton
          color={Colors.Beak_Upper}
          selected={buttonStates.A}
          onPress={() => confirmHandler(`${props.id}: A`)}
        >
          A
        </ColorButton>
        <ColorButton
          color={Colors.Cardinal}
          selected={buttonStates.B}
          onPress={() => confirmHandler(`${props.id}: B`)}
        >
          B
        </ColorButton>
        <ColorButton
          color={Colors.Feather_Green}
          selected={buttonStates.C}
          onPress={() => confirmHandler(`${props.id}: C`)}
        >
          C
        </ColorButton>
        <ColorButton
          color={Colors.Humpback}
          selected={buttonStates.D}
          onPress={() => confirmHandler(`${props.id}: D`)}
        >
          D
        </ColorButton>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={({ item }) => <NoiDung id={item.id} cauhoi={item.cauhoi} />}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
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
});
