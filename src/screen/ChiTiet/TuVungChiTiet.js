import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import * as Speech from 'expo-speech';
import { useRoute } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../constants/colors';
import ColorButton from '../../component/UI/Button/ColorButton';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector } from '../../redux/reducers/authReducer';
import tuVungApi from '../../Api/tuvungApi';
import Loading from '../../Modals/Loading';
import { AntDesign } from '@expo/vector-icons';
import {
  addLike,
  likeSelector,
  removeLike,
} from '../../redux/reducers/likeReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
const TuVungChiTiet = () => {
  const [isPeak, setIsPeak] = useState(false);
  const [isStran, setIsStran] = useState(false);
  const [isStranCau, setIsStranCau] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [chiTietTuVung, setChiTietTuVung] = useState();

  const router = useRoute();
  const idTuVung = router.params;
  const navigation = useNavigation();
  const auth = useSelector(authSelector);

  const like = useSelector(likeSelector);
  const isLike = like.includes(idTuVung);
  const dispatch = useDispatch();
  useEffect(() => {
    const stop = navigation.addListener('beforeRemove', (e) => {
      // Dừng đọc nếu trạng thái là đang đọc
      if (isPeak) {
        Speech.stop();
        setIsPeak(false);
      }
    });
    return stop;
  }, [navigation, isPeak]);

  useEffect(() => {
    handlerTuVung();
  }, [auth.token, idTuVung]);

  useEffect(() => {
    const updateLike = async () => {
      await AsyncStorage.setItem('like', JSON.stringify(like));
    };
    updateLike();
  }, [like]);

  const handlerLike = () => {
    if (isLike) {
      dispatch(removeLike({ id: idTuVung }));
    } else {
      dispatch(addLike({ id: idTuVung }));
    }
  };
  const handlerTuVung = async () => {
    setIsLoading(true);
    try {
      if (auth.token && idTuVung) {
        const res = await tuVungApi.TuVungHandler(
          `/${idTuVung}`,
          null,
          'get',
          auth.token
        );
        setChiTietTuVung(res.data.data);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };
  async function xuLyDoc(text) {
    if (!isPeak) {
      setIsPeak(true);
      Speech.speak(text, {
        language: 'ja',
        pitch: 1,
        rate: 1,
        onDone: () => {
          setIsPeak(false); // Khi đọc xong, cập nhật lại nội dung của nút đọc
        },
      });
    }
  }
  // dich câu
  function stranCau() {
    if (!isStranCau) {
      setIsStranCau(true);
    } else {
      setIsStranCau(false);
    }
  }
  // dich chữ
  function stran() {
    if (!isStran) {
      setIsStran(true);
    } else {
      setIsStran(false);
    }
  }
  return (
    <View style={styles.container}>
      {isLoading && <Loading isVisible={isLoading}></Loading>}
      {chiTietTuVung && !isLoading && (
        <View style={styles.viewContainer}>
          <View style={styles.viewImage}>
            <Image
              style={{ ...styles.image }}
              source={{ uri: chiTietTuVung.hinhAnh }}
            ></Image>
            <TouchableOpacity
              onPress={handlerLike}
              style={styles.viewInlineLeft}
            >
              {isLike ? (
                <AntDesign name="heart" size={24} color="white" />
              ) : (
                <AntDesign name="hearto" size={24} color="white" />
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.viewBottom}>
            <View style={styles.viewBottomLeft}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Text style={styles.textCachDoc}>{chiTietTuVung.tu}</Text>
                {isStran && (
                  <Text style={styles.textCachDoc}>
                    :{chiTietTuVung.dinhNghia}
                  </Text>
                )}
              </View>
              <Text style={styles.textCachDoc}>{chiTietTuVung.phienAm}</Text>
              <Text style={styles.textRomaji}>{chiTietTuVung.loaiTu}</Text>
              <Text style={styles.textCau}>{chiTietTuVung.viDu}</Text>
              {isStranCau && (
                <Text style={styles.textDichNghia}>
                  {chiTietTuVung.dichNghiaVD}
                </Text>
              )}
            </View>
            <TouchableOpacity
              style={styles.viewBottomRight}
              onPress={xuLyDoc.bind(this, chiTietTuVung.tu)}
            >
              <Feather
                style={{ padding: 10 }}
                name="volume-2"
                size={32}
                color="white"
              ></Feather>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 0.5,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 5,
            }}
          >
            <TouchableOpacity
              onPress={stran}
              style={{
                ...styles.button,
                borderBottomStartRadius: 20,
                borderTopStartRadius: 20,
                marginStart: 20,
              }}
            >
              <Text style={styles.textButton}>
                {isStran ? 'Tắt dịch' : 'Dịch nghĩa'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={stranCau}
              style={{
                ...styles.button,
                borderBottomEndRadius: 20,
                borderTopEndRadius: 20,
                marginEnd: 20,
              }}
            >
              <Text style={styles.textButton}>
                {isStranCau ? 'Tắt dịch' : 'Dịch câu'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default TuVungChiTiet;
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewContainer: {
    flex: 1,
    borderRadius: 20,
    elevation: 10,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 }, // đẩy xuống 2 px
    shadowRadius: 6,
    shadowOpacity: 0.25,
    marginVertical: 20,
    marginHorizontal: 20,
    borderColor: 'black',
    backgroundColor: 'white',
  },
  viewInlineLeft: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Màu nền của icon
    borderRadius: 50, // Đảm bảo icon là hình tròn
    padding: 10, // Khoảng cách giữa biểu tượng và viền
    elevation: 5, // Shadow để tạo hiệu ứng nổi bật
  },
  textInlineLeft: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Nunito_Regular',
    padding: 20,
    paddingBottom: 40,
    marginHorizontal: 10,
  },
  viewImage: {
    flex: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 20,
  },
  viewBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  viewBottomLeft: {
    flex: 0.7,
    marginTop: 20,
    justifyContent: 'center',
  },
  textCachDoc: {
    fontSize: 25,
    fontFamily: 'Nunito_Bold',
    fontWeight: 'bold',
    color: Colors.Macaw,
  },
  textYnghia: {
    fontSize: 20,
    fontFamily: 'Nunito_Bold',
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  textRomaji: {
    fontSize: 15,
    fontFamily: 'Nunito_Regular',
    fontWeight: '400',
    color: Colors.Swan,
  },
  textCau: {
    fontSize: 15,
    fontFamily: 'Nunito_Regular',
    fontWeight: '400',
    color: 'black',
  },
  textDichNghia: {
    fontSize: 15,
    fontFamily: 'Nunito_Regular',
    fontWeight: '400',
    color: 'black',
  },
  viewBottomRight: {
    flex: 0.2,
    backgroundColor: Colors.Macaw,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  button: {
    flex: 0.5,
    elevation: 10,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 }, // đẩy xuống 2 px
    shadowRadius: 6,
    shadowOpacity: 0.25,
    marginVertical: 50,
    borderColor: 'black',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  textButton: {
    fontSize: 20,
    fontFamily: 'Nunito_Regular',
    fontWeight: '400',
    color: 'black',
  },
});
