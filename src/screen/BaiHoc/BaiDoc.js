import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  Platform,
  Dimensions,
} from "react-native";
import * as Speech from "expo-speech";
import React from "react";
import { useRoute, useNavigation, useFocusEffect } from "@react-navigation/native";
import { useEffect, useState } from "react";
import BaiTap from "../../../data/BaiTap.json";
import { Colors } from "../../constants/colors";
import OutLineButton from "../../component/UI/Button/OutLineButton";
import Header from "../../component/UI/Header/header";

var width = Dimensions.get("window").width;
var height = Dimensions.get("window").height;

const BaiDoc = () => {
  const navigation = useNavigation();
  const router = useRoute();
  const data = router.params;
  const [Baihoc, setBaihoc] = useState(null); // Khởi tạo state Baihoc với giá trị ban đầu là null
  const [showBaiDich, setShowBaiDich] = useState(false);
  const [readState, setReadState] = useState(false); //set ngung doc or doc

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      // Dừng đọc nếu trạng thái là đang đọc
      if (readState) {
        Speech.stop();
        setReadState(false);
      }
    });
  
    return unsubscribe;
  }, [navigation, readState]);
    
  function navigationHandler() {
    setReadState(false);
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

  const xuLyDoc = async (text) => {
    // Bắt đầu đọc bài
    if (!readState) {
      setReadState(true);
      Speech.speak(text, {
        language: "ja",
        pitch: 1,
        rate: 0.75,
      });
    } else {
      setReadState(false);
      Speech.stop(text);
    }
  };


  const setText = () => {
    return readState ? "Ngưng đọc" : "Đọc bài";
  };

  return (
    <SafeAreaView style={styles.container}>
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
          {setText()}
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
  },
  title: {
    fontSize: 32,
    color: Colors.XanhNgocDam,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 8,
    marginBottom: Platform.OS === "android" ? 60 : 60, //chinh lai sau khi test ios
  },
  baiDoc: {
    fontSize: 24,
    marginHorizontal: 4,
    marginVertical: 4,
  },
  baiDocContainer: {
    marginHorizontal: 12,
    marginBottom: Platform.OS === "android" ? 70 : 70, //chinh lai sau khi test ios
    marginTop: Platform.OS === "android" ? -50 : -50, //chinh lai sau khi test ios
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.XanhNgocDam,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 20,
    width: width,
  },
  subContent: {
    fontSize: 20,
    marginHorizontal: 8,
    marginVertical: 8,
    color: Colors.XanhNgocDam,
  },
});
