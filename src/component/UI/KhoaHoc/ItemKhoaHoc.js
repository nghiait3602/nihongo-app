import { StyleSheet, View, TouchableOpacity, Image, Text } from 'react-native';
import React from 'react';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Colors } from '../../../constants/colors';
import ItemKhoaHoaStyles from './ItemKhoaHoa.styles';
import { useNavigation } from '@react-navigation/native';
import hokkaido from '../../../../assets/Img/hokkaido.png';
import kyoto from '../../../../assets/Img/kyoto.png';
import nagasaki from '../../../../assets/Img/nagasaki.png';
import osaka from '../../../../assets/Img/osaka.png';
import tokyo from '../../../../assets/Img/tokyo.png';
import data from '../../../../data/lession.json';
const ItemKhoaHoc = ({ KhoaHoc }) => {
  const navigator = useNavigation();
  function handlerNavigation() {
    navigator.navigate('LessionScreen', KhoaHoc.id);
    console.log(KhoaHoc.id);
  }
  const getImage = (name) => {
    switch (name) {
      case 'HokkaiDo':
        return hokkaido;
      case 'KyoTo':
        return kyoto;
      case 'OsaKa':
        return osaka;
      case 'ToKyo':
        return tokyo;
      case 'Nagasaki':
        return nagasaki;
      default:
        break;
    }
  };
  const image = getImage(KhoaHoc.tenKhoahoc);
  return (
    <TouchableOpacity
      style={ItemKhoaHoaStyles.innerButton}
      onPress={handlerNavigation}
    >
      <AnimatedCircularProgress
        size={120} // Kích thước của vòng tròn
        width={10} // Độ rộng của vòng tròn
        // fill={KhoaHoc.definition.levels} // Giá trị tiến trình/
        fill={100}
        rotation={135}
        tintColor={Colors.Beak_Upper} // Màu sắc của vòng tròn
        backgroundColor={Colors.Hare} // Màu nền của vòng tròn
      >
        {() => (
          <View
            style={{
              ...ItemKhoaHoaStyles.innerCircle,
              backgroundColor: Colors.Feather_Green,
            }}
          >
            <Image
              style={ItemKhoaHoaStyles.innerLogo}
              source={image}
              resizeMode="cover"
            />
          </View>
        )}
      </AnimatedCircularProgress>
      <Text style={ItemKhoaHoaStyles.innerText}>{KhoaHoc.tenKhoahoc}</Text>
    </TouchableOpacity>
  );
};

export default ItemKhoaHoc;

const styles = StyleSheet.create({});
