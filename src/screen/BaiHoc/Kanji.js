import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import BaiHocApi from '../../Api/baihocApi';
import KanjiApi from '../../Api/kanjiApi';
import { Colors } from '../../constants/colors';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';

import { useSelector } from 'react-redux';
import { authSelector } from '../../redux/reducers/authReducer'; // Thêm authSelector từ reducer
import Loading from '../../Modals/Loading';

import LottieView from 'lottie-react-native';
import SectionnsComponent from '../../component/UI/Auth/SectionnsComponent';
import CheckData from '../../component/UI/NoData/noData';

const Kanji = () => {
  const navigator = useNavigation();
  const [kanji, setKanji] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRoute();
  const idBaiHoc = router.params;
  const [error, setError] = useState(null);
  const { token } = useSelector(authSelector); // Sử dụng authSelector để lấy token từ Redux store

  useEffect(() => {
    if (token && idBaiHoc === 'kanji') {
      // Kiểm tra xem token có tồn tại không
      handlerAll();
    } else if (token) {
      handlerKanji();
    } else {
      console.error('Authentication token is missing or invalid.');
      setError('Authentication token is missing or invalid.'); // Thông báo lỗi
      setLoading(false); // Dừng hiển thị indicator loading
    }
  }, [token, idBaiHoc]); // Chạy lại effect khi token thay đổi
  const handlerAll = async () => {
    try {
      const response = await KanjiApi.KanjiHandler(`/`, null, 'get', token); // Truyền token từ Redux store vào API
      console.log(response.data.data);

      if (response.data && idBaiHoc) {
        const data = response.data.data; // Lấy mảng dữ liệu từ trường "data"
        setKanji(data);
        setLoading(false);
        setError(null);
      } else {
        setError('Dữ liệu trả về từ server không hợp lệ.');
        setLoading(false);
      }
      if (response.results === 0) {
        setError('Trong bài học này không có Kanji.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Đã xảy ra lỗi khi tải dữ liệu. Vui lòng thử lại sau.');
      setLoading(false);
    }
  };

  const handlerKanji = async () => {
    try {
      const response = await BaiHocApi.BaiHocHandler(
        `/${idBaiHoc}/kanji`,
        null,
        'get',
        token
      ); // Truyền token từ Redux store vào API
      console.log('Response về:', response);

      if (response.data && idBaiHoc) {
        const data = response.data.data; // Lấy mảng dữ liệu từ trường "data"
        setKanji(data);
        setLoading(false);
        setError(null);
      } else {
        setError('Dữ liệu trả về từ server không hợp lệ.');
        setLoading(false);
      }
      if (response.results === 0) {
        setError('Trong bài học này không có Kanji.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Đã xảy ra lỗi khi tải dữ liệu. Vui lòng thử lại sau.');
      setLoading(false);
    }
  };

  if (kanji.length === 0 && !loading) {
    return <CheckData></CheckData>;
  }

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigateToDetail(item)}
    >
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.textTitle}>{index + 1}. </Text>
        <Text style={styles.textTitle}>{item.hanTu}</Text>
      </View>
      <Text style={styles.textDesc}>{item.viDu}</Text>
    </TouchableOpacity>
  );

  const navigateToDetail = (item) => {
    navigator.navigate('KanjiChiTiet', { kanjiData: item }); // Truyen du lieu sang KanjiChiTiet
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      {loading && <Loading isVisible={loading}></Loading>}
      {error && <Text style={styles.errorText}>{error}</Text>}
      {!loading && !error && kanji.length > 0 && (
        <FlatList
          data={kanji}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

export default Kanji;

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
    fontSize: 30,
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
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
});
