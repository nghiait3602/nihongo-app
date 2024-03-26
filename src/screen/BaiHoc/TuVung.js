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
import { Colors } from '../../constants/colors';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { authSelector } from '../../redux/reducers/authReducer';
import BaiHocApi from '../../Api/baihocApi';
import Loading from '../../Modals/Loading';
import LottieView from 'lottie-react-native';
import SectionnsComponent from '../../component/UI/Auth/SectionnsComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import tuVungApi from '../../Api/tuvungApi';
import CheckData from '../../component/UI/NoData/noData';
const TuVung = () => {
  const [tuVung, setTuVung] = useState([]); // Khởi tạo state Baihoc với giá trị ban đầu là null
  const [isLoading, setIsLoading] = useState(true);
  const [ChuDe, setChuDe] = useState('');
  const router = useRoute();
  const idBaiHoc = router.params; // id của khóa bài học được truyền qua để tìm các bài kanji ngữ pháp từ vựng
  const navigator = useNavigation();
  const auth = useSelector(authSelector);

  useEffect(() => {
    handlerAll();
    if (idBaiHoc === 'ChuDe' && ChuDe) {
      handerChude();
    } else if (idBaiHoc === 'all') {
      handlerAll();
    } else {
      handlerTungVung();
    }
  }, [auth.token, idBaiHoc, ChuDe]);
  const getChude = async () => {
    const getItem = await AsyncStorage.getItem('chude');
    const data = JSON.parse(getItem);
    return data;
  };
  getChude().then((result) => {
    setChuDe(result);
  });
  const handlerAll = async () => {
    try {
      if (auth.token && idBaiHoc !== 'ChuDe' && idBaiHoc === 'all') {
        const res = await tuVungApi.TuVungHandler(`/`, null, 'get', auth.token);
        setTuVung(res.data.data);
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    }
  };
  const handerChude = async () => {
    try {
      if (auth.token && idBaiHoc === 'ChuDe') {
        const res = await tuVungApi.TuVungHandler(
          `/chude/?chuDeDaChon=${ChuDe}`,
          null,
          'get',
          auth.token
        );
        setTuVung(res.data.selectChuDe);
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    }
  };
  const handlerTungVung = async () => {
    setIsLoading(true);
    try {
      if (auth.token && idBaiHoc) {
        const res = await BaiHocApi.BaiHocHandler(
          `/${idBaiHoc}/tuvung`,
          null,
          'get',
          auth.token
        );
        setTuVung(res.data.data);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };
  if (tuVung.length === 0 && !isLoading) {
    return <CheckData></CheckData>;
  }

  const ItemBaiHoc = ({ item, index }) => {
    function navigationHandler() {
      navigator.navigate('TuVungChiTiet', item._id); // Chuyển item id dưới dạng tham số
    }
    return (
      <TouchableOpacity style={styles.container} onPress={navigationHandler}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.textTitle}>{index + 1}. </Text>
          <Text style={styles.textTitle}>{item.tu}</Text>
        </View>
        <Text style={styles.textDesc}>{item.dinhNghia}</Text>
      </TouchableOpacity>
    );
  };
  // console.log(tuVung);
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      {isLoading && <Loading isVisible={isLoading}></Loading>}
      {tuVung.length > 0 && !isLoading && (
        <FlatList
          data={tuVung}
          keyExtractor={(item) => item._id}
          renderItem={ItemBaiHoc}
        ></FlatList>
      )}
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
