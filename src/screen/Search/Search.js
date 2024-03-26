import React, { useState, useEffect } from "react";
import { Text, View, TextInput, Modal, FlatList, TouchableOpacity, SafeAreaView, Alert } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from 'axios'; 

import Scan from "../../component/Photo/Scan";
import SearchButton from "../../component/UI/Button/SearchButton";
import styles from "../Search/Search.styles";

const Search = () => {
  const [tuSearch, setTuSearch] = useState("");
  const [camera, setCamera] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [definitions, setDefinitions] = useState([]);

  useEffect(() => {
    if (searchResults.length > 0) {
      translateDefinitions();
    }
  }, [searchResults]);

  const tuNhapVao = (tuTra) => {
    setTuSearch(tuTra);
  };

  const xuLySearch = async () => {
    try {
      if (!tuSearch.trim()) {
        Alert.alert("(✿◠‿◠)", "Vui lòng nhập từ cần tìm kiếm bạn nhé.");
        return;
      }
      const response = await axios.get(`https://jisho.org/api/v1/search/words?keyword=${tuSearch}`);
      const data = response.data;
      setSearchResults(data.data);
      setModalVisible(true); // Mở modal hiển thị kết quả
    } catch (error) {
      console.error("Lỗi khi tìm kiếm từ:", error);
      Alert.alert("Đã xảy ra lỗi", "Vui lòng thử lại sau.");
    }
  };

  const openCamera = () => {
    setCamera(!camera);
  };

  const buttonText = () => {
    return !camera ? "Scan đồ vật" : "Ẩn chức năng";
  };

  const translateDefinitions = async () => {
    try {
      const translatedDefs = [];
      for (const result of searchResults) {
        const definition = result.senses[0].english_definitions.join(', ');
        const response = await axios.get(`https://translation.googleapis.com/language/translate/v2?key=AIzaSyDnD3yxmMCDTuojIKKS0ZsZbYzU_Wkw36w&q=${encodeURIComponent(definition)}&source=en&target=vi`);
        const translatedText = response.data.data.translations[0].translatedText;
        translatedDefs.push(translatedText);
      }
      setDefinitions(translatedDefs);
    } catch (error) {
      console.error("Lỗi khi dịch định nghĩa từ:", error);
    }
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => handleItemClick(item)}>
      <View>
        {Array.isArray(item.japanese) && item.japanese.length > 0 ? (
          <>
            <Text style={{ color: 'green', fontSize: 18}}>{index + 1}. {item.japanese[0].word}</Text>
            {/* <Text>{index + 1}. {item.slug}</Text> // su dung slug de hon nhung 1 so du lieu se tra ve la chuoi số ko có nghĩa */}
            <Text>{definitions[index]}</Text>
          </>
        ) : (
          <>
            <Text style={{ color: 'red' }}>Không tìm thấy. (┬┬﹏┬┬)</Text>
            {console.log("Không tìm thấy từ trong cơ sở dữ liệu")}
          </>
        )}
      </View>
    </TouchableOpacity>
  );
  

  const handleItemClick = (item) => {
    // Xử lý khi người dùng nhấn vào một mục trong danh sách
    console.log("Đã chọn:", item);
    setModalVisible(false); // Đóng modal sau khi chọn
    // Thực hiện các hành động khác nếu cần
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.label}>Tra từ :</Text>
        <View style={styles.searchContainer}>
          <TextInput
            onChangeText={tuNhapVao}
            value={tuSearch}
            style={styles.search}
            placeholder="日本, Nihon..."
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={searchResults}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Search;