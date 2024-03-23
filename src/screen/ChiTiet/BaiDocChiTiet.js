import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  Platform,
  Dimensions,
} from "react-native";
import * as Speech from "expo-speech";
import React from "react";
import {
  useRoute,
  useNavigation,
  useFocusEffect,
} from "@react-navigation/native";
import { useEffect, useState } from "react";
import BaiTap from "../../../data/BaiTap.json";
import { Colors } from "../../constants/colors";
import OutLineButton from "../../component/UI/Button/OutLineButton";

var width = Dimensions.get("window").width;
var height = Dimensions.get("window").height;

const BaiDocChiTiet = () => {
  const navigation = useNavigation();

  const router = useRoute();
  const { itemId, baidocData } = router.params; // Get data tu navigation params
  const [data, setData] = useState(baidocData);

  const [showBaiDich, setShowBaiDich] = useState(false);
  const [readState, setReadState] = useState(false); //set ngung doc or doc

  useEffect(() => {
    const stop = navigation.addListener("beforeRemove", (e) => {
      // Dừng đọc nếu trạng thái là đang đọc
      if (readState) {
        Speech.stop();
        setReadState(false);
      }
    });

    return stop;
  }, [navigation, readState]);

  if (!baidocData) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            Dữ liệu bài đọc không tồn tại hoặc không hợp lệ.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const NoiDung = () => (
    <View>
      <View>
        <Text style={styles.title}>{baidocData.tenBaiDoc}</Text>
        <Text style={styles.tinhHuong}>Tình huống: {baidocData.tinhHuong}</Text>
      </View>
      <View style={styles.baiDocContainer}>
        <Text style={styles.baiDoc}>{baidocData.vanBanTiengNhat}</Text>
      </View>
      {showBaiDich && (
        <View style={styles.baiDocContainer}>
          <Text style={styles.subContent}>{baidocData.dichNghia}</Text>
        </View>
      )}
    </View>
  );

  const dichBai = () => {
    setShowBaiDich(!showBaiDich);
  };

  const xuLyDoc = async (text) => {
    // Bắt đầu đọc bài
    if (!readState) {
      setReadState(true);
      Speech.speak(text, {
        language: "ja",
        pitch: 1,
        rate: 0.75,
        onDone: () => {
          setReadState(false); // Khi đọc xong, cập nhật lại nội dung của nút đọc
        },
      });
    } else {
      setReadState(false);
      Speech.stop(text);
    }
  };

  const setText = () => {
    return readState ? "Ngưng đọc" : "Đọc bài";
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
          data={[data]}
          renderItem={NoiDung}
          keyExtractor={(item) => item._id}
        />
        <View style={styles.buttonContainer}>
          <OutLineButton icon="book" onPress={dichBai}>
            Dịch bài
          </OutLineButton>
          <OutLineButton
            icon="volume-high"
            onPress={() => xuLyDoc(data.vanBanTiengNhat)}
          >
            {setText()}
          </OutLineButton>
        </View>
    </SafeAreaView>
  );
};

export default BaiDocChiTiet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Snow,
  },
  tinhHuong: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 8,
    marginBottom: Platform.OS === "android" ? 60 : 60, //chinh lai sau khi test ios
  },
  title: {
    fontSize: 32,
    color: Colors.XanhNgocDam,
    fontWeight: "bold",
    textAlign: "center",
  },
  baiDoc: {
    fontSize: 24,
    marginHorizontal: 4,
    marginVertical: 4,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
    textAlign: "center",
    color: "red",
  },
  baiDocContainer: {
    marginHorizontal: 12,
    marginBottom: Platform.OS === "android" ? 70 : 70, //chinh lai sau khi test ios
    marginTop: Platform.OS === "android" ? -50 : -50, //chinh lai sau khi test ios
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.XanhNgocDam,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 20,
    width: width,
  },
  subContent: {
    fontSize: 20,
    marginHorizontal: 8,
    marginVertical: 8,
    color: Colors.XanhNgocDam,
  },
});
