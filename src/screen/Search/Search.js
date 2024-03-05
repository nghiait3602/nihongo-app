import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import React, { useState } from "react";

const Search = () => {
  const [tuSearch, setTuSearch] = useState("");

  const tuNhapVao = (tuTra) => {
    setTuSearch(tuTra);
  };

  const xuLySearch = () => {
    // Xu ly tim kiem => in ra tu goi y
    console.log("Search:", tuSearch);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Text style={styles.label}>Tra từ :</Text>
        <TextInput
          onChangeText={tuNhapVao}
          value={tuSearch}
          style={styles.search}
        />
        <Button title="Tìm kiếm" onPress={xuLySearch} />
      </View>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flex: 1,
    backgroundColor: "#cdf8fa",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 5,
    paddingTop: 40,
  },
  search: {
    backgroundColor: "white",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 5,
    fontSize: 16,
    elevation: 4,
    borderColor: "#0af4fc",
    borderWidth: 1,
  },
  label: {
    color: "black",
    fontWeight: "bold",
    fontFamily: "Nunito_Bold",
    fontSize: 18,
    marginBottom: 4,
  },
});
