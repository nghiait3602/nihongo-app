import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as Speech from 'expo-speech';
import { Feather } from '@expo/vector-icons';

import Data from '../../../data/bangChuCai.json';
import styles from './ChuCai.styles';

const Hiragana = () => {
  const [hiraData, setHiraData] = useState([]); // Luu data bang hira

  useEffect(() => {
    const xuLyChuoi = Data.hira
      .split('') // Cat chuoi
      .map((hira, index) => ({ hira, index })); // Map qua tung chu va chi dinh index, vidu: hira: 'A', index: 0

    setHiraData(xuLyChuoi); // Updata chuoi sau khi xu ly
  }, []);

  const xuLyDoc = (hira) => {
    Speech.speak(hira, {
      language: 'ja',
      pitch: 1, // Cao độ giọng nói
      rate: 0.5, // Tốc độ đọc
    });
  };

  const motChuHira = ({ item: { hira, index } }) => {
    return (
      <TouchableOpacity
        // Điều kiện style lọc các ô trống
        style={hira !== ' ' ? styles.chuCaiContainer : styles.nullContainer}
        key={index}
        onPress={() => {
          xuLyDoc(hira);
        }}
      >
        <Text style={styles.chuCai}>{hira}</Text>
        {hira !== ' ' && <Feather name="volume-2" size={15} color="gray" />}
      </TouchableOpacity>
    );
  }; // Hàm hiển thị 1 chữ hira

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
