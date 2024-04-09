import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Dimensions,
  Platform,
  FlatList,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { Colors } from "../../constants/colors";

import { useSelector } from "react-redux";
import { authSelector } from "../../redux/reducers/authReducer";
import KanjiApi from "../../Api/kanjiApi";

const KanjiChiTiet = () => {
  const router = useRoute();
  const { itemId, kanjiData } = router.params; // Get data tu navigation params

  const [data, setData] = useState(kanjiData); // Lấy dữ liệu từ navigation params

  const { token } = useSelector(authSelector);

  useEffect(() => {
    if (kanjiData && kanjiData._id) addDSKanji();
  });

  const addDSKanji = async () => {
    try {
      await KanjiApi.KanjiHandler(
        `/addDSKanji/${kanjiData._id}`,
        null,
        "patch",
        token
      );
      console.log("Đã học kanji:",kanjiData._id);
    } catch (error) {
      console.error("Lỗi:", error);
    }
  };

  if (!kanjiData) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            Dữ liệu kanji không tồn tại hoặc không hợp lệ.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const KanjiDetail = ({ label, value }) => (
    <View>
      <Text style={styles.label}>{label}:</Text>
      <View style={styles.kanjiContainer}>
        <Text style={styles.kanji}>{value}</Text>
      </View>
    </View>
  );

  const NoiDung = () => (
    <View>
      <KanjiDetail label="Hán Tự" value={kanjiData.hanTu} />
      <KanjiDetail label="Kunyomi" value={kanjiData.kunyomi} />
      <KanjiDetail label="Onyomi" value={kanjiData.onyomi} />
      <KanjiDetail label="Số nét" value={kanjiData.soNet} />
      <KanjiDetail label="Bộ" value={kanjiData.bo} />
      <KanjiDetail label="Nghĩa" value={kanjiData.nghia} />
      <KanjiDetail label="Ví dụ" value={kanjiData.viDu} />
      <Image source={{ uri: kanjiData.hinhAnhCachViet }} style={styles.image} />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={[data]}
        renderItem={NoiDung}
        keyExtractor={(item) => item._id}
      />
    </SafeAreaView>
  );
};

export default KanjiChiTiet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Snow,
  },
  image: {
    marginTop: 30,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 2,
  },
  label: {
    marginLeft: 12,
    fontWeight: "bold",
    fontSize: 20,
  },
  kanji: {
    fontSize: 20,
    marginHorizontal: 4,
    marginVertical: 4,
  },
  kanjiContainer: {
    marginHorizontal: 12,
    marginBottom: Platform.OS === "android" ? 7 : 0,
    borderRadius: 5,
    borderWidth: 1.25,
    borderColor: Colors.Feather_Green,
    justifyContent: "center",
    alignItems: "center",
  },
});
