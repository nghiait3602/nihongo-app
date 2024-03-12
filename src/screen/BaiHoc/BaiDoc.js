import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import BaiTap from '../../../data/BaiTap.json';
const BaiDoc = () => {
  const router = useRoute();
  const data = router.params;
  const [Baihoc, setBaihoc] = useState(null); // Khởi tạo state Baihoc với giá trị ban đầu là null

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
    <View style={{ flex: 1, marginTop: 100 }}>
      <Text>{Baihoc.name} +4</Text>
    </View>
  );
};

export default BaiDoc;

const styles = StyleSheet.create({});
