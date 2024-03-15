import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import BaiTap from '../../../data/BaiTap.json';
import data from '../../../data/tuvung.json';
import { Colors } from '../../constants/colors';
import { useNavigation } from '@react-navigation/native';
const TuVung = () => {
  const navigator = useNavigation();
  // const router = useRoute();
  // const data = router.params; // id của khóa bài học được truyền qua để tìm các bài kanji ngữ pháp từ vựng
  // const [Baihoc, setBaihoc] = useState(null); // Khởi tạo state Baihoc với giá trị ban đầu là null
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // Lấy dữ liệu từ API hoặc nguồn dữ liệu khác ở đây
  //       // Ví dụ: const response = await fetch('API_URL');
  //       // const data = await response.json();
  //       // Sau đó, tìm phần tử trong mảng dữ liệu có id trùng với data
  //       const item = BaiTap.sections[0].data.find((item) => item.id === data);
  //       // Gán giá trị cho state Baihoc
  //       setBaihoc(item);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData(); // Gọi hàm fetchData trong useEffect
  // }, [data]); // Sử dụng useEffect với dependency là data

  // // Kiểm tra nếu Baihoc chưa được gán giá trị, trả về null hoặc hiển thị thông báo loading
  // if (!Baihoc) {
  //   return (
  //     <View>
  //       <Text>Loading....</Text>
  //     </View>
  //   );
  // }
  const ItemBaiHoc = ({ item, index }) => {
    function navigationHandler() {
      console.log(item.id);
      navigator.navigate('TuVungChiTiet', { itemId: item.id }); // Chuyển item id dưới dạng tham số
    }

    return (
      <TouchableOpacity style={styles.container} onPress={navigationHandler}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.textTitle}>{index + 1}.</Text>
          <Text style={styles.textTitle}>{item.tuvung}</Text>
        </View>
        <Text style={styles.textDesc}>{item.dich}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <FlatList
        data={data.sections[0].data}
        keyExtractor={(item) => item.id}
        renderItem={ItemBaiHoc}
      ></FlatList>
    </View>
  );
};

export default TuVung;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  textTitle: {
    fontSize: 20,
    color: 'black',
    fontFamily: 'Nunito_Bold',
    fontWeight: 'bold',
  },
  textDesc: {
    marginLeft: 10,
    fontSize: 15,
    color: Colors.Wolf,
    fontFamily: 'Nunito_Bold',
  },
});
