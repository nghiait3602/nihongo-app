import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  Modal,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  ActivityIndicator,
  Dimensions,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";

import Scan from "../../component/Photo/Scan";
import SearchButton from "../../component/UI/Button/SearchButton";
import styles from "../Search/Search.styles";
import { Colors } from "../../constants/colors";
import * as Clipboard from "expo-clipboard";

const Search = () => {
  const [tuSearch, setTuSearch] = useState("");
  const [vanbanSearch, setVanBanSearch] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [camera, setCamera] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [definitions, setDefinitions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingTranslate, setIsLoadingTranslate] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("vi"); // Mặc định là tiếng Việt

  useEffect(() => {
    if (searchResults.length > 0) {
      translateDefinitions();
    }
  }, [searchResults]);

  const tuNhapVao = async (tuTra) => {
    setTuSearch(tuTra);
  };

  const xuLySearch = async () => {
    try {
      setIsLoading(true); // Bắt đầu hiệu ứng loading
      // Dịch sang tiếng Anh được khi search, vì từ điển jisho chỉ dịch từ Anh sang Nhật
      const responseTrans = await axios.get(
        `https://translation.googleapis.com/language/translate/v2?key=AIzaSyDnD3yxmMCDTuojIKKS0ZsZbYzU_Wkw36w&q=${encodeURIComponent(
          tuSearch
        )}&source=vi&target=en`
      );
      const translatedText =
        responseTrans.data.data.translations[0].translatedText;

      if (!translatedText.trim()) {
        Alert.alert("(✿◠‿◠)", "Vui lòng nhập từ cần tìm kiếm bạn nhé.");
        setIsLoading(false); // Kết thúc hiệu ứng loading
        return;
      }
      setModalVisible(true); // Mở modal hiển thị kết quả
      const response = await axios.get(
        `https://jisho.org/api/v1/search/words?keyword=${translatedText}`
      );
      const data = response.data;
      if (data.data.length === 0) {
        Alert.alert("Không tìm thấy kết quả", "Vui lòng thử lại với từ khác.", [
          {
            onPress: () => {
              setModalVisible(false);
            },
          },
        ]);
      } else {
        setSearchResults(data.data);
      }
      setIsLoading(false); // Kết thúc hiệu ứng loading sau khi nhận được dữ liệu
    } catch (error) {
      console.error("Lỗi khi tìm kiếm từ:", error);
      Alert.alert("Đã xảy ra lỗi", "Vui lòng thử lại sau.");
      setIsLoading(false); // Kết thúc hiệu ứng loading nếu xảy ra lỗi
    }
  };

  const openCamera = () => {
    setCamera(!camera); // Thay đổi trạng thái của camera
  };

  const buttonText = () => {
    return !camera ? "Scan đồ vật" : "Dịch văn bản";
  };

  const translateDefinitions = async () => {
    try {
      setIsLoadingTranslate(true); // Bắt đầu hiệu ứng loading khi dịch
      const translatedDefs = [];
      for (const result of searchResults) {
        const definition = result.senses[0].english_definitions.join(", ");
        const response = await axios.get(
          `https://translation.googleapis.com/language/translate/v2?key=AIzaSyDnD3yxmMCDTuojIKKS0ZsZbYzU_Wkw36w&q=${encodeURIComponent(
            definition
          )}&source=en&target=vi`
        );
        const translatedText =
          response.data.data.translations[0].translatedText;
        translatedDefs.push(translatedText);
      }
      setDefinitions(translatedDefs);
      setIsLoadingTranslate(false); // Kết thúc hiệu ứng loading sau khi dịch xong
    } catch (error) {
      console.error("Lỗi khi dịch định nghĩa từ:", error);
      setIsLoadingTranslate(false); // Kết thúc hiệu ứng loading nếu xảy ra lỗi
    }
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => handleItemClick(item)}>
      <View>
        {Array.isArray(item.japanese) && item.japanese.length > 0 ? (
          <>
            <Text style={{ color: "green", fontSize: 18 }}>
              {index + 1}. {item.japanese[0].word}
            </Text>
            {/* <Text>{index + 1}. {item.slug}</Text> // su dung slug de hon nhung 1 so du lieu se tra ve la chuoi số ko có nghĩa */}
            <Text>{definitions[index]}</Text>
          </>
        ) : (
          <>
            <Text style={{ color: "red" }}>Không tìm thấy. (┬┬﹏┬┬)</Text>
            {console.log("Không tìm thấy từ trong cơ sở dữ liệu")}
          </>
        )}
      </View>
    </TouchableOpacity>
  );

  const handleItemClick = (item) => {
    console.log("Đã chọn:", item);
  };

  const closeModal = () => {
    setSearchResults([]);
    setModalVisible(false); // Thoat tim kiem
  };

  const vanBanInput = (vanban) => {
    setVanBanSearch(vanban);
  };

  const dichVanBan = async () => {
    try {
      setIsLoading(true); // Bắt đầu hiệu ứng loading
      const response = await axios.get(
        `https://translation.googleapis.com/language/translate/v2?key=AIzaSyDnD3yxmMCDTuojIKKS0ZsZbYzU_Wkw36w&q=${encodeURIComponent(
          vanbanSearch
        )}&source=${currentLanguage === "vi" ? "vi" : "ja"}&target=${
          currentLanguage === "vi" ? "ja" : "vi"
        }`
      );
      const translatedText = response.data.data.translations[0].translatedText;
      setTranslatedText(translatedText);
      setIsLoading(false); // Kết thúc hiệu ứng loading
    } catch (error) {
      console.error("Lỗi khi dịch văn bản:", error);
      Alert.alert("Đã xảy ra lỗi", "Vui lòng thử lại sau.");
      setIsLoading(false); // Kết thúc hiệu ứng loading nếu xảy ra lỗi
    }
  };

  const doiNgonNgu = () => {
    setCurrentLanguage(currentLanguage === "vi" ? "ja" : "vi"); // Đảo ngược ngôn ngữ hiện tại
  };

  const copyToClipboard = (text) => {
    if (text !== "") {
      Clipboard.setString(text);
      Alert.alert(
        "Sao chép thành công",
        "Nội dung đã được sao chép vào clipboard."
      );
    }
  };

  var height = Dimensions.get("window").height;
  var width = Dimensions.get("window").width;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.headerContainer}>
          <Text style={styles.label}>Tra từ :</Text>
          <View style={styles.searchContainer}>
            <TextInput
              onChangeText={tuNhapVao}
              value={tuSearch}
              style={styles.search}
              placeholder="日本語, Nihongo, Tiếng Nhật..."
            />
            {tuSearch !== "" && (
              <Icon
                name="times"
                size={24}
                color="white"
                style={styles.icon}
                onPress={() => {
                  setTuSearch("");
                }}
              />
            )}
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

        {!camera && (
          <View
            style={[
              styles.headerContainer,
              {
                marginTop: 10,
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
              },
            ]}
          >
            <Text style={styles.label}>Dịch văn bản :</Text>
            <View style={styles.searchContainer}>
              <TextInput
                onChangeText={vanBanInput}
                value={vanbanSearch}
                style={[styles.search, { height: height / 9 }]}
                multiline={true} // Cho phép nhiều hàng
              />
              {vanbanSearch !== "" && (
                <Icon
                  name="times"
                  size={24}
                  color="white"
                  style={styles.icon}
                  onPress={() => {
                    setVanBanSearch("");
                  }}
                />
              )}
            </View>

            <View style={{ flexDirection: "row", top: 5 }}>
              <TouchableOpacity
                onPress={doiNgonNgu}
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                <Text style={[styles.label, { marginRight: 10, fontSize: 18 }]}>
                  {currentLanguage === "vi" ? "Tiếng Việt" : "Tiếng Nhật"}
                </Text>
                <Icon
                  name="exchange"
                  size={24}
                  color={Colors.XanhNgocDam}
                  style={{ marginRight: 10 }}
                />
                <Text style={[styles.label, { fontSize: 18 }]}>
                  {currentLanguage === "vi" ? "Tiếng Nhật" : "Tiếng Việt"}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={[styles.searchContainer, { marginTop: 10 }]}>
              <TextInput
                value={translatedText}
                style={[
                  styles.search,
                  { height: height / 9, color: Colors.title },
                ]}
                multiline={true} // Cho phép nhiều hàng
              />
              {translatedText !== "" && (
                <Icon
                  name="copy"
                  size={20}
                  color="white"
                  style={styles.icon}
                  onPress={() => copyToClipboard(translatedText)}
                />
              )}
            </View>
            <View style={styles.buttonsContainer}>
              <View style={styles.buttonContainer}>
                <SearchButton onPress={dichVanBan}>Dịch</SearchButton>
              </View>
            </View>
          </View>
        )}

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
            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <Icon name="times" size={24} color="white" />
            </TouchableOpacity>
            <View style={styles.modalContent}>
              {isLoading || isLoadingTranslate ? (
                <ActivityIndicator size="large" color="green" />
              ) : (
                <FlatList
                  data={searchResults}
                  renderItem={renderItem}
                  keyExtractor={(item, index) => index.toString()}
                />
              )}
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Search;
