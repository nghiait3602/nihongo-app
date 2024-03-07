import { StyleSheet, Text, View, TextInput, FlatList } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import React, { useState } from "react";

import Button from "../../component/UI/Button/Button";
import { Colors } from "../../constants/colors";
import Scan from "../../component/Photo/Scan";

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
            <Button onPress={openCamera}>Scan đồ vật</Button>
          </View>
          <View style={styles.buttonContainer}>
            <Button onPress={xuLySearch}>Tìm kiếm</Button>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flex: 0.2,
    backgroundColor: Colors.backgroundSliver,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingTop: 40,
    elevation: 4,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    paddingVertical: 20,
  },
  buttonContainer: {
    flex: 1,
  },
  cameraContainer: {
    flex: 1,
  },
  search: {
    flex: 1,
    backgroundColor: Colors.backgroundBottom,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 5,
    fontSize: 16,
    elevation: 4,
    // borderColor: "#0af4fc",
    // borderWidth: 1,
  },
  label: {
    color: Colors.title,
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 4,
  },
  icon: {
    marginHorizontal: 12,
    alignItems: "center",
  },
});
