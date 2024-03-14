import {
  StyleSheet,
  Text,
  View,
  Platform,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import React from 'react';
import { useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import BaiTap from '../../../data/BaiTap.json';
import { Colors } from '../../constants/colors';
import Header from '../../component/UI/Header/header';
import { useNavigation } from '@react-navigation/native';
import ColorButton from '../../component/UI/Button/ColorButton';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

const BaiTapTongHop = () => {
  const navigation = useNavigation();
  const router = useRoute();
  const data = router.params;
  const [Baihoc, setBaihoc] = useState(null); // Khởi tạo state Baihoc với giá trị ban đầu là null

  function navigationHandler() {
    navigation.goBack();
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Lấy dữ liệu từ API hoặc nguồn dữ liệu khác ở đây
        // Ví dụ: const response = await fetch('API_URL');
        // const data = await response.json();
        // Sau đó, tìm phần tử trong mảng dữ liệu có id trùng với data
        const item = BaiTap.sections[0].data.find((item) => item.id === data);
        // Gán giá trị cho state Baihoc
        setBaihoc(item);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Gọi hàm fetchData trong useEffect
  }, [data]); // Sử dụng useEffect với dependency là data

  // Kiểm tra nếu Baihoc chưa được gán giá trị, trả về null hoặc hiển thị thông báo loading
  if (!Baihoc) {
    return (
      <View>
        <Text>Loading....</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text>{Baihoc.name} +4</Text>
      <Text>1. Cau hoi............</Text>
      <View style={styles.answerButtons}>
        <View style={styles.buttonContainer}>
          <ColorButton color={Colors.Beak_Upper}>A</ColorButton>
          <ColorButton color={Colors.Cardinal}>B</ColorButton>
          <ColorButton color={Colors.Feather_Green}>C</ColorButton>
          <ColorButton color={Colors.Humpback}>D</ColorButton>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BaiTapTongHop;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Snow,
    paddingTop: Platform.OS === 'android' ? 50 : 0,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: width,
  },
});
