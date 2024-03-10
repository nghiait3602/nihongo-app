import { StyleSheet, View, TouchableOpacity, Image, Text } from 'react-native';
import React from 'react';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Colors } from '../../../constants/colors';
import ItemKhoaHoaStyles from './ItemKhoaHoa.styles';
import { useNavigation } from '@react-navigation/native';
import data from '../../../../data/lession.json';
const ItemKhoaHoc = ({ exercise }) => {
  const navigator = useNavigation();
  return (
    <TouchableOpacity
      style={ItemKhoaHoaStyles.innerButton}
      onPress={() => navigator.navigate('LessionScreen', data.sections)}
    >
      <AnimatedCircularProgress
        size={120} // Kích thước của vòng tròn
        width={10} // Độ rộng của vòng tròn
        fill={exercise.definition.levels} // Giá trị tiến trình
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
              source={require('../../../../assets/Icons/basics.png')}
              resizeMode="cover"
            />
          </View>
        )}
      </AnimatedCircularProgress>
      <Text style={ItemKhoaHoaStyles.innerText}>Test</Text>
    </TouchableOpacity>
  );
};

export default ItemKhoaHoc;

const styles = StyleSheet.create({});
