import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  Platform,
  Image,
  Dimensions,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { Colors } from "../../constants/colors";

const NguPhapChiTiet = () => {
  const router = useRoute();
  const { itemId, nguphapData } = router.params; // Get data từ navigation params

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
      <FlatList
        data={[nguphapData]}
        renderItem={NoiDung}
        keyExtractor={(item) => item._id}
      />
    </SafeAreaView>
  );
};

export default NguPhapChiTiet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Snow,
  },
  label: {
    marginLeft: 12,
    fontWeight: "bold",
    fontSize: 20,
  },
  nguphap: {
    fontSize: 20,
    marginHorizontal: 4,
    marginVertical: 4,
  },
  nguphapContainer: {
    marginHorizontal: 12,
    marginBottom: Platform.OS === "android" ? 7 : 0,
    borderRadius: 5,
    borderWidth: 1.25,
    borderColor: Colors.Feather_Green,
    justifyContent: "center",
    alignItems: "center",
  },
});
