import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  Platform,
} from "react-native";
import * as Speech from "expo-speech";
import React from "react";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import BaiTap from "../../../data/BaiTap.json";
import { Colors } from "../../constants/colors";
import OutLineButton from "../../component/UI/Button/OutLineButton";
import Header from "../../component/UI/Header/header";
import { useNavigation } from "@react-navigation/native";
const BaiDoc = () => {
  const navigation = useNavigation();
  const router = useRoute();
  const data = router.params;
  const [Baihoc, setBaihoc] = useState(null); // Khởi tạo state Baihoc với giá trị ban đầu là null
  const [showBaiDich, setShowBaiDich] = useState(false);

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
      id: "nd1",
      title: "びじゅつかん",
      content:
        "きのう友達と「みんなの美術館」へ行きました。おもしろい絵がたくさんありました。",
      subcontent:
        "Hôm qua tôi đã cùng một người bạn đi đến bảo tàng mỹ thuật. Có rất nhiều bức tranh thú vị ở đó.",
    },
  ];

  const NoiDung = ({ title, content, subcontent }) => (
    <View>
      <View>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.baiDocContainer}>
        <Text style={styles.baiDoc}>{content}</Text>
      </View>
      {showBaiDich && (
        <View style={styles.baiDocContainer}>
          <Text style={styles.subContent}>{subcontent}</Text>
        </View>
      )}
    </View>
  );

  const dichBai = () => {
    setShowBaiDich(!showBaiDich);
  };

  const xuLyDoc = (text) => {
    Speech.speak(text, {
      language: "ja",
      pitch: 1, // Cao độ giọng nói
      rate: 0.75, // Tốc độ đọc
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        onPress={navigationHandler}
        textLeft="Go back"
        left={require("../../../assets/Icons/japan.png")}
      />
      <FlatList
        data={DATA}
        renderItem={({ item }) => (
          <NoiDung
            title={item.title}
            content={item.content}
            subcontent={item.subcontent}
          />
        )}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.buttonContainer}>
        <OutLineButton icon="book" onPress={dichBai}>
          Dịch bài
        </OutLineButton>
        <OutLineButton
          icon="volume-high"
          onPress={() => xuLyDoc(DATA[0].content)}
        >
          Đọc bài
        </OutLineButton>
      </View>
    </SafeAreaView>
  );
};

export default BaiDoc;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Snow,
    paddingTop: Platform.OS === "android" ? 50 : 0,
  },
  title: {
    fontSize: 32,
    color: Colors.XanhNgocDam,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 8,
  },
  baiDoc: {
    fontSize: 24,
    marginHorizontal: 4,
    marginVertical: 4,
  },
  baiDocContainer: {
    marginHorizontal: 12,
    marginTop: 9,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.XanhNgocDam,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flex: 0.5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  subContent: {
    fontSize: 20,
    marginHorizontal: 8,
    marginVertical: 8,
    color: Colors.XanhNgocDam,
  },
});
