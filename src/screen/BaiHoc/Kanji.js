import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import BaiTap from "../../../data/BaiTap.json";
import data from "../../../data/Kanji.json";
import { Colors } from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";
const Kanji = () => {
  const navigator = useNavigation();

  const ItemBaiHoc = ({ item, index }) => {
    const getKanjiDataById = (id) => {
      const kanjiData = data.sections.find((section) => {
        return section.data.some((kanji) => kanji.id === id); // Tìm kiếm Kanji có ID khớp
      });
      
      return kanjiData?.data?.find((kanji) => kanji.id === id); // Trả về dữ liệu Kanji
    };

    function navigationHandler() {
      console.log(item.id);
      const kanjiData = getKanjiDataById(item.id); // Lấy dữ liệu Kanji cụ thể dựa trên ID
      const params = {
        itemId: item.id,
        kanjiData, // Thêm dữ liệu Kanji vào tham số
      };

      navigator.navigate("KanjiChiTiet", params);
    }

    return (
      <TouchableOpacity style={styles.container} onPress={navigationHandler}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textTitle}>{index + 1}.</Text>
          <Text style={styles.textTitle}>{item.hantu}</Text>
        </View>
        <Text style={styles.textDesc}>{item.nghia}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <FlatList
        data={data.sections[0].data}
        keyExtractor={(item) => item.id}
        renderItem={ItemBaiHoc}
      ></FlatList>
    </View>
  );
};

export default Kanji;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    backgroundColor: "white",
    justifyContent: "center",
  },
  textTitle: {
    fontSize: 20,
    color: "black",
    fontFamily: "Nunito_Bold",
    fontWeight: "bold",
  },
  textDesc: {
    marginLeft: 10,
    fontSize: 15,
    color: Colors.Wolf,
    fontFamily: "Nunito_Bold",
  },
});
