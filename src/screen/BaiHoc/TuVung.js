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

import AsyncStorage from '@react-native-async-storage/async-storage';
import tuVungApi from '../../Api/tuvungApi';
import CheckData from '../../component/UI/NoData/noData';
import userAPI from '../../Api/authApi';
const TuVung = () => {
  const [tuVung, setTuVung] = useState([]); // Khởi tạo state Baihoc với giá trị ban đầu là null
  const [isLoading, setIsLoading] = useState(true);
  const [ChuDe, setChuDe] = useState('');
  const [idsTV, setIsTV] = useState([]);
  const [listTV, setListTV] = useState([]);
  const router = useRoute();
  const idBaiHoc = router.params; // id của khóa bài học được truyền qua để tìm các bài kanji ngữ pháp từ vựng
  const navigator = useNavigation();
  const auth = useSelector(authSelector);

  useEffect(() => {
    if (idBaiHoc === 'ChuDe' && ChuDe) {
      handerChude();
    } else if (idBaiHoc === 'all') {
      handlerAll();
    } else if (idBaiHoc.title === 'like' && idsTV) {
      handlerLikeTV();
    } else if (idBaiHoc.title === 'tvdh' && idBaiHoc.data.length > 0) {
      setTuVung(idBaiHoc.data);
      setIsLoading(false);
    } else {
      handlerTungVung();
    }
  }, [auth.token, idBaiHoc, ChuDe, idsTV]);
  const getChude = async () => {
    const getItem = await AsyncStorage.getItem('chude');
    const data = JSON.parse(getItem);
    return data;
  };
  getChude().then((result) => {
    setChuDe(result);
  });
  useEffect(() => {
    const fetchLikeData = async () => {
      try {
        const savedLikeData = await AsyncStorage.getItem('like');
        if (savedLikeData !== null) {
          const parsedLikeData = JSON.parse(savedLikeData);
          setIsTV(parsedLikeData);
        }
      } catch (error) {
        console.error('Error retrieving like data from AsyncStorage:', error);
      }
    };

    fetchLikeData(); // Gọi hàm fetchLikeData khi component được render lần đầu tiên
  }, []);
  useEffect(() => {
    fetchData();
  }, [auth.token]);
  const handlerLikeTV = async () => {
    setIsLoading(true);
    try {
      if (auth.token && idBaiHoc && idsTV) {
        const data = [];
        for (const id of idsTV) {
          const res = await tuVungApi.TuVungHandler(
            `/${id}`,
            null,
            'get',
            auth.token
          );
          data.push(res.data.data);
        }
        setTuVung(data);
        // setTuVung(res.data.data);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

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

  const fetchData = async () => {
    try {
      const response = await userAPI.HandlerAuthentication(
        `/me`,
        null,
        'get',
        auth.token
      );
      if (response.data.data.tuVungS) setListTV(response.data.data.tuVungS);
    } catch (error) {
      console.error('Error fetching user data: ', error);
    }
  };
  if (tuVung.length === 0 && !isLoading) {
    return <CheckData></CheckData>;
  }

  function checkTV(id) {
    const newMap = listTV.map((item) => item._id);
    const check = newMap.includes(id);
    return check;
  }

  const ItemBaiHoc = ({ item, index }) => {
    function navigationHandler() {
      navigator.navigate('TuVungChiTiet', item._id); // Chuyển item id dưới dạng tham số
    }
    return (
      <TouchableOpacity
        style={[styles.container, checkTV(item._id) ? { opacity: 0.3 } : null]}
        onPress={navigationHandler}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.textTitle}>{index + 1}. </Text>
          <Text style={styles.textTitle}>{item.tu}</Text>
        </View>
        <Text style={styles.textDesc}>{item.dinhNghia}</Text>
      </TouchableOpacity>
    );
  };
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
