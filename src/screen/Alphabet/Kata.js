import { Text, View, FlatList } from "react-native";
import React, { useState, useEffect } from "react";

import styles from "../../component/UI/ChuCai.styles";
import Data from "../../../data/bangChuCai.json";

const Katakana = () => {
  const [kataData, setKataData] = useState([]); // Luu data bang kata

  useEffect(() => {
    const xuLyChuoi = Data.kata
      .split("") // Cat chuoi
      .map((kata, index) => ({ kata, index })); // Map qua tung chu va chi dinh index, vidu: kata: 'A', index: 0

    setKataData(xuLyChuoi); // Updata chuoi sau khi xu ly
  }, []);

  const motChuKata = ({ item: { kata, index } }) => (
    <View
      style={kata !== " " ? styles.chuCaiContainer : styles.nullContainer}
      key={index}
    >
      <Text style={styles.chuCai}>{kata}</Text>
    </View>
  ); // Ham hien thi 1 chu kata

  return (
    <View style={styles.container}>
      <FlatList
        data={kataData}
        renderItem={motChuKata} // hien thi danh sach theo tung kata
        keyExtractor={(item) => item.index} //tao khoa duy nhat cho moi muc
        numColumns={5} // so luong kata moi hang
        contentContainerStyle={styles.chuCaiFlatList}
      />
    </View>
  );
};

export default Katakana;
