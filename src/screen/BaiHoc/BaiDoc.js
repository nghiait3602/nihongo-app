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
// import BaiTap from "../../../data/BaiTap.json";
// import data from "../../../data/BaiDoc.json";


import { Colors } from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";
const BaiDoc = () => {
  const navigator = useNavigation();

  const ItemBaiHoc = ({ item, index }) => {
    const getBaiDocById = (id) => {
      const baidocData = data.sections.find((section) => {
        return section.data.some((kanji) => kanji.id === id); // Tìm kiếm Baidoc có ID khớp
      });

      return baidocData?.data?.find((kanji) => kanji.id === id); // Trả về dữ liệu Baidoc
    };

    function navigationHandler() {
      console.log(item.id);
      const baidocData = getBaiDocById(item.id); // Lấy dữ liệu Baidoc cụ thể dựa trên ID
      const params = {
        itemId: item.id,
        baidocData, // Thêm dữ liệu Baidoc vào tham số
      };

      navigator.navigate("BaiDocChiTiet", params);
    }

    return (
      <TouchableOpacity style={styles.container} onPress={navigationHandler}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textTitle}>{index + 1}.</Text>
          <Text style={styles.textTitle}>{item.title}</Text>
        </View>
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

export default BaiDoc;

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
