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
import { useRoute } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import * as Speech from 'expo-speech';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../constants/colors';
import ColorButton from '../../component/UI/Button/ColorButton';
const TuVungChiTiet = () => {
  const router = useRoute();
  const data = router.params;
  const navigation = useNavigation();
  const [isPeak, setIsPeak] = useState(false);
  const [isStran, setIsStran] = useState(false);
  const [isStranCau, setIsStranCau] = useState(false);
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
  async function xuLyDoc(text) {
    if (!isPeak) {
      setIsPeak(true);
      Speech.speak(text, {
        language: 'ja',
        pitch: 1,
        rate: 0.75,
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
      <View style={styles.viewContainer}>
        <View style={styles.viewInlineLeft}>
          <ImageBackground
            style={{
              resizeMode: 'cover',
              justifyContent: 'center',
            }}
            source={require('../../../assets/Icons/ribbon.png')}
          >
            <Text style={styles.textInlineLeft}>Left</Text>
          </ImageBackground>
        </View>
        <View style={styles.viewImage}>
          <Image
            style={styles.image}
            source={require('../../../assets/character2.png')}
          ></Image>
        </View>
        <View style={styles.viewBottom}>
          <View style={styles.viewBottomLeft}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Text style={styles.textCachDoc}>{data.tuvung}</Text>
              {isStran && <Text style={styles.textYnghia}>:{data.dich}</Text>}
            </View>
            <Text style={styles.textRomaji}>{data.romaji}</Text>
            <Text style={styles.textCau}>{data.cau}</Text>
            {isStranCau && (
              <Text style={styles.textDichNghia}>{data.dichnghia}</Text>
            )}
          </View>
          <TouchableOpacity
            style={styles.viewBottomRight}
            onPress={xuLyDoc.bind(this, data.tuvung)}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    maxWidth: width * 0.3,
    maxHeight: height * 0.3,
    resizeMode: 'cover',
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
