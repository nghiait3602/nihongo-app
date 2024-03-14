import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import { Colors } from '../../constants/colors';
import OutLineButton from '../../component/UI/Button/OutLineButton';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
const Data = [
  {
    id: 1,
    chude: 'Thể Thao',
  },
  {
    id: 2,
    chude: 'Ẩm Thực',
  },
  {
    id: 3,
    chude: 'Thời Trang',
  },
  {
    id: 4,
    chude: 'Giao Tiếp',
  },
  {
    id: 5,
    chude: 'Phim Ảnh',
  },
  {
    id: 6,
    chude: 'Game',
  },
];

const ChuDe = () => {
  const [selectItem, setSelectItem] = useState([]);
  const [itemList, setItemList] = useState([]);
  const navigation = useNavigation();
  function hanlderOnPress(item) {
    const newSelectItem = selectItem.includes(item.id)
      ? selectItem.filter((id) => id !== item.id)
      : [...selectItem, item.id];
    setSelectItem(newSelectItem);
    setItemList((prevItemList) => {
      if (newSelectItem.includes(item.id)) {
        return [...prevItemList, item];
      } else {
        return prevItemList.filter((preItem) => preItem.id !== item.id);
      }
    });
  }
  const countItems = () => {
    const count = {};
    Data.forEach((item) => {
      count[item.chude] = itemList.some(
        (selectedItem) => selectedItem.id === item.id
      )
        ? 1
        : 0;
    });
    return count;
  };

  function nextHandler() {
    const test = countItems();
    console.log(test);
    navigation.navigate('BottomNavigation', itemList);
  }
  function renderItem({ item }) {
    return (
      <TouchableOpacity
        style={[
          styles.itemContent,
          {
            borderColor: selectItem.includes(item.id) ? Colors.Bee : 'gray',
          },
        ]}
        onPress={hanlderOnPress.bind(this, item)}
      >
        <View style={styles.viewInner}>
          <Image
            style={styles.image}
            source={require('../../../assets/Icons/japan.png')}
          ></Image>
          <Text style={styles.textTitle}>{item.chude}</Text>
        </View>
      </TouchableOpacity>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.viewText}>
        <Text style={styles.textTitle}>Bạn thích chủ đề gì?</Text>
        <Text style={styles.textDesc}>Vui lòng chọn ít nhất 3 chủ đề?</Text>
      </View>
      <FlatList
        data={Data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={styles.item}
      />
      <View style={styles.viewBottom}>
        <OutLineButton onPress={nextHandler}>TIẾP THEO</OutLineButton>
      </View>
    </View>
  );
};
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
export default ChuDe;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  viewText: {
    marginLeft: width / 10,
  },
  textTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Nunito_Bold',
  },
  textDesc: {
    fontSize: 16,
    opacity: 0.8,
    fontFamily: 'Nunito_Regular',
    fontWeight: '400',
  },
  itemContent: {
    width: width * 0.3,
    height: height * 0.1,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'gray',
    marginHorizontal: height * 0.05,
    marginVertical: width * 0.05,
  },
  image: {
    width: width * 0.06,
    height: height * 0.04,
  },
  viewInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewBottom: {
    flex: 1,
    justifyContent: 'space-around',
    marginBottom: -1,
  },
});
