import { StyleSheet, Text, View, TextInput, FlatList } from "react-native";
import Button from "../../component/UI/Button";
import Icon from "react-native-vector-icons/FontAwesome";
import React, { useState } from "react";

const Search = () => {
  const [tuSearch, setTuSearch] = useState("");

  const tuNhapVao = (tuTra) => {
    setTuSearch(tuTra); //set lai tu vua nhap
  };

  const xuLySearch = () => {
    // Xu ly tim kiem => in ra tu goi y
    console.log("Search:", tuSearch);
  };

  const xuLyHinhAnh = () => {
    // Xu ly tim kiem => in ra tu goi y
    console.log("Search:", tuSearch);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tra từ :</Text>
      <View style={styles.searchContainer}>
        <TextInput
          onChangeText={tuNhapVao}
          value={tuSearch}
          style={styles.search}
        />
        <Icon name="search" size={20} color="gray" style={styles.icon} />
      </View>
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonContainer}>
          <Button onPress={xuLyHinhAnh}>Scan đồ vật</Button>
        </View>
        <View style={styles.buttonContainer}>
          <Button onPress={xuLySearch}>Tìm kiếm</Button>
        </View>
      </View>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 0.2,
    backgroundColor: "#a9fafc",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 30,
    paddingTop: 40,
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
  search: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 5,
    fontSize: 16,
    elevation: 4,
    // borderColor: "#0af4fc",
    // borderWidth: 1,
  },
  label: {
    color: "black",
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 4,
  },
  icon: {   
    marginHorizontal: 12,
    alignItems: "center",
  },
});
