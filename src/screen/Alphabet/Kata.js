import { Text, View, FlatList, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import * as Speech from "expo-speech";
import { Feather } from '@expo/vector-icons';

import styles from "./ChuCai.styles";
import Data from "../../../data/bangChuCai.json";

const Katakana = () => {
  const [kataData, setKataData] = useState([]); // Luu data bang kata

  useEffect(() => {
    const xuLyChuoi = Data.kata
      .split("") // Cat chuoi
      .map((kata, index) => ({ kata, index })); // Map qua tung chu va chi dinh index, vidu: kata: 'A', index: 0

    setKataData(xuLyChuoi); // Updata chuoi sau khi xu ly
  }, []);

  const xuLyDoc = (kata) => {
    Speech.speak(kata, {
      language: "ja",
      pitch: 1, // Cao độ giọng nói
      rate: 0.5, // Tốc độ đọc
    });
  };

  const motChuKata = ({ item: { kata, index } }) => {
    return (
      <TouchableOpacity
        style={kata !== " " ? styles.chuCaiContainer : styles.nullContainer}
        key={index}
        onPress={() => {
          xuLyDoc(kata);
        }}
      >
        <Text style={styles.chuCai}>{kata}</Text>
        {kata !== " " && <Feather name="volume-2" size={15} color="gray" />}
      </TouchableOpacity>
    );
  }; // Ham hien thi 1 chu kata

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
