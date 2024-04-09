import React, {useEffect} from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { useRoute } from "@react-navigation/native";
import { Colors } from "../../constants/colors";

import NguPhapApi from '../../Api/nguPhapApi';
import { useSelector } from 'react-redux';
import { authSelector } from '../../redux/reducers/authReducer';

const NguPhapChiTiet = () => {
  const router = useRoute();
  const { nguphapData } = router.params; // Lấy dữ liệu từ navigation params
  const { token } = useSelector(authSelector);

  useEffect(() => {
    if (nguphapData && nguphapData._id) addDSNguPhap();
  });

  const addDSNguPhap = async () => {
    try {
      await NguPhapApi.nguPhapHandler(
        `/addDSNguPhap/${nguphapData._id}`,
        null,
        "patch",
        token
      );
      console.log("Đã học kanji:",nguphapData._id);
    } catch (error) {
      console.error("Lỗi:", error);
    }
  };

  if (!nguphapData) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Dữ liệu ngữ pháp không tồn tại hoặc không hợp lệ.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const NguPhapDetail = ({ label, value }) => (
    <View>
      <Text style={styles.label}>{label}:</Text>
      <View style={styles.nguphapContainer}>
        <Text style={styles.nguphap}>{value}</Text>
      </View>
    </View>
  );

  const NoiDung = () => (
    <View>
      <NguPhapDetail label="Cấu trúc ngữ pháp" value={nguphapData.cauTruc} />
      <NguPhapDetail label="Tình huống sử dụng" value={nguphapData.tinhHuong} />
      <NguPhapDetail label="Định nghĩa" value={nguphapData.dinhNghia} />
      <NguPhapDetail label="Ví dụ" value={nguphapData.viDu} />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <NoiDung />
      </View>
    </SafeAreaView>
  );
};

export default NguPhapChiTiet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Snow,
  },
  content: {
    flex: 1,
    margin: 16,
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
  label: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 4,
  },
  nguphap: {
    fontSize: 18,
  },
  nguphapContainer: {
    borderRadius: 5,
    borderWidth: 1.25,
    borderColor: Colors.Feather_Green,
    padding: 8,
    marginTop: 4,
  },
});