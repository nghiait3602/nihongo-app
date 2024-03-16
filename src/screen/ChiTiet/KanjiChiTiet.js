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

const KanjiChiTiet = () => {
  const router = useRoute();
  const { itemId, kanjiData } = router.params; // Get data tu navigation params

  const [data, setData] = useState(kanjiData); // Set data dua vao Kanji object
  

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
      <KanjiDetail label="Hán Tự" value={kanjiData.hantu} />
      <KanjiDetail label="Kunyomi" value={kanjiData.kunyomi} />
      <KanjiDetail label="Onyomi" value={kanjiData.onyomi} />
      <KanjiDetail label="Số nét" value={kanjiData.sonet} />
      <KanjiDetail label="Bộ" value={kanjiData.bo} />
      <KanjiDetail label="Nghĩa" value={kanjiData.nghia} />
      <KanjiDetail label="Ví dụ" value={kanjiData.vidu} />
      {/* <Image source={{ uri: kanjiData.hinhanh }} style={styles.image} /> */}
      <Image source={require("./../../../assets/Img/Kanji(DulieuAo).gif")} style={styles.image} />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>     
        <FlatList
          data={[data]}
          renderItem={NoiDung}
          keyExtractor={(item) => item.id}
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
