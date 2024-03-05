import { Text, View, FlatList } from "react-native";
import React, { useState, useEffect } from "react";

import Data from "../../../data/bangChuCai.json";
import styles from "../../component/ChuCai.styles";

const Hiragana = () => {
  const [hiraData, setHiraData] = useState([]); // Luu data bang hira

  useEffect(() => {
    const xuLyChuoi = Data.hira
      .split("") // Cat chuoi
      .map((hira, index) => ({ hira, index })); // Map qua tung chu va chi dinh index, vidu: hira: 'A', index: 0

    setHiraData(xuLyChuoi); // Updata chuoi sau khi xu ly
  }, []);

  const motChuHira = ({ item: { hira, index } }) => (
    // dieu kien style loc cac o trong
    <View
      style={hira !== " " ? styles.chuCaiContainer : styles.nullContainer}
      key={index}
    >
      <Text style={styles.chuCai}>{hira}</Text>
    </View>
  ); // Ham hien thi 1 chu hira

  return (
    <View style={styles.container}>
      <FlatList
        data={hiraData}
        renderItem={motChuHira} //hien thi danh sach theo tung hira
        keyExtractor={(item) => item.index} //tao khoa duy nhat cho moi muc
        numColumns={5} // so luong hira moi hang
        contentContainerStyle={styles.chuCaiFlatList}
      />
    </View>
  );
};

export default Hiragana;
