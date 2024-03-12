import { Text, View, TextInput, FlatList } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import React, { useState } from "react";

import Scan from "../../component/Photo/Scan";
import SearchButton from "../../component/UI/Button/SearchButton";
import styles from "../Search/Search.styles";

const Search = () => {
  const [tuSearch, setTuSearch] = useState("");
  const [camera, setCamera] = useState(false);

  const tuNhapVao = (tuTra) => {
    setTuSearch(tuTra); //set lai tu vua nhap
  };

  const xuLySearch = () => {
    // Xu ly tim kiem => in ra tu goi y
    console.log("Search:", tuSearch);
  };

  const openCamera = () => {
    // kiem tra camera
    if (!camera) {
      setCamera(true);
    } else {
      setCamera(false);
    }
  };

  const buttonText = () => {
    return !camera ? "Scan đồ vật" : "Tắt Camera";
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.label}>Tra từ :</Text>
        <View style={styles.searchContainer}>
          <TextInput
            onChangeText={tuNhapVao}
            value={tuSearch}
            style={styles.search}
            placeholder="日本, Nihon, Nhật Bản"
          />
          <Icon name="search" size={20} color="white" style={styles.icon} />
        </View>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <SearchButton onPress={openCamera}>{buttonText()}</SearchButton>
          </View>
          <View style={styles.buttonContainer}>
            <SearchButton onPress={xuLySearch}>Tìm kiếm</SearchButton>
          </View>
        </View>
      </View>
      {camera && (
        <View style={styles.cameraContainer}>
          <Scan />
        </View>
      )}
    </View>
  );
};

export default Search;
