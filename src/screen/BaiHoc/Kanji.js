import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  Platform,
  Image,
  Dimensions,
} from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Colors } from "../../constants/colors";

import BaiTap from "../../../data/BaiTap.json";

const Kanji = () => {
  const router = useRoute();
  const data = router.params;
  const [Baihoc, setBaihoc] = useState(null); // Khởi tạo state Baihoc với giá trị ban đầu là null

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

  const DATA = [
    {
      id: "kj1",
      hantu: "後 - HẬU, HẤU",
      kunyomi: "のち うし.ろ うしろ あと おく.れ る",
      onyomi: "ゴ コウ",
      sonet: 9,
      bo: "彳 XÍCH",
      nghia:
        "Sau. Con nối. Lời nói đưa đẩy. Một âm là hấu. Giản thể của chữ [后].",
      vidu: "その後	そのご	sau đó; sau đấy",
      hinhanh: require("./../../../assets/Img/Kanji(DulieuAo).gif"),
    },
  ]; //du lieu ao

  const KanjiDetail = ({ label, value }) => (
    <View>
      <Text style={styles.label}>{label}:</Text>
      <View style={styles.kanjiContainer}>
        <Text style={styles.kanji}>{value}</Text>
      </View>
    </View>
  );

  const NoiDung = ({
    hantu,
    kunyomi,
    onyomi,
    sonet,
    bo,
    nghia,
    vidu,
    hinhanh,
  }) => (
    <View>
      <KanjiDetail label="Hán Tự" value={hantu} />
      <KanjiDetail label="Kunyomi" value={kunyomi} />
      <KanjiDetail label="Onyomi" value={onyomi} />
      <KanjiDetail label="Số nét" value={sonet} />
      <KanjiDetail label="Bộ" value={bo} />
      <KanjiDetail label="Nghĩa" value={nghia} />
      <KanjiDetail label="Ví dụ" value={vidu} />
      <Image source={hinhanh} style={styles.image} />
    </View>
  );

  // Kiểm tra nếu Baihoc chưa được gán giá trị, trả về null hoặc hiển thị thông báo loading
  if (!Baihoc) {
    return (
      <View>
        <Text>Loading....</Text>
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={({ item }) => (
          <NoiDung
            hantu={item.hantu}
            kunyomi={item.kunyomi}
            onyomi={item.onyomi}
            sonet={item.sonet}
            bo={item.bo}
            nghia={item.nghia}
            vidu={item.vidu}
            hinhanh={item.hinhanh}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

export default Kanji;

var width = Dimensions.get("window").width;
var height = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Snow,
  },
  image: {    
    marginTop: 30,
    width: width,
    height: height/2,
  },
  label: {
    marginLeft: 12,
    fontWeight: 'bold',
    fontSize: 20,
  },
  kanji: {
    fontSize: 20,
    marginHorizontal: 4,
    marginVertical: 4,
  },
  kanjiContainer: {
    marginHorizontal: 12,
    marginBottom: Platform.OS === "android" ? 7 : 0, //chinh lai sau khi test ios
    borderRadius: 5,
    borderWidth: 1.25,
    borderColor: Colors.Feather_Green,
    justifyContent: "center",
    alignItems: "center",
  },
});
