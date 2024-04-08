import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, { useEffect } from 'react';
import { Colors } from '../../constants/colors';
import OutLineButton from '../../component/UI/Button/OutLineButton';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import chuDecApi from '../../Api/suggetApi';
import { useSelector } from 'react-redux';
import { authSelector } from '../../redux/reducers/authReducer';
import AsyncStorage, {
  useAsyncStorage,
} from '@react-native-async-storage/async-storage';
import BottomComponent from '../../component/UI/Auth/BottomComponent';
const Data = [
  {
    id: 1,
    chude: 'Thể Thao',
    sport: 0,
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
    chude: 'game',
  },
];

const ChuDe = () => {
  const [selectItem, setSelectItem] = useState([]);
  const [itemList, setItemList] = useState([]);
  const [disable, setDisable] = useState(true);
  const navigation = useNavigation();

  const auth = useSelector(authSelector);

  useEffect(() => {
    handlerSelected();
  }, [selectItem]);

  const handlerChuDe = async (ds) => {
    try {
      const res = await chuDecApi.ChuDeHandler(
        '/suggest',
        ds,
        'post',
        auth.token
      );
      const data = res.data;
      if (data) {
        await AsyncStorage.setItem('chude', JSON.stringify(res.data));
        console.log(data);
      }
    } catch (error) {}
  };

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
    const data = countItems();
    const ds = {
      'thể thao': data['Thể Thao'],
      'ẩm thực': data['Ẩm Thực'],
      'thời trang': data['Thời Trang'],
      'giao tiếp': data['Giao Tiếp'],
      'phim ảnh': data['Phim Ảnh'],
      game: data['game'],
    };
    handlerChuDe(ds);
    navigation.navigate('BottomNavigation');
  }

  function handlerImage(key) {
    switch (key) {
      case 'Thể Thao':
        return require('../../../assets/chude/sport.png');
      case 'Ẩm Thực':
        return require('../../../assets/chude/at.png');
      case 'Giao Tiếp':
        return require('../../../assets/chude/sport.png');
      case 'Thời Trang':
        return require('../../../assets/chude/tt.png');
      case 'Phim Ảnh':
        return require('../../../assets/chude/movie.png');
      case 'game':
        return require('../../../assets/chude/game.png');
    }
  }
  function handlerSelected() {
    if (selectItem.length < 3) {
      setDisable(true);
      return;
    }
    setDisable(false);
  }
  function renderItem({ item }) {
    const image = handlerImage(item.chude);
    return (
      <TouchableOpacity
        style={[
          styles.itemContent,
          {
            borderColor: selectItem.includes(item.id) ? Colors.Bee : 'white',
          },
        ]}
        onPress={hanlderOnPress.bind(this, item)}
      >
        <View style={styles.viewInner}>
          <Image style={styles.image} source={image}></Image>
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
        <BottomComponent
          onPress={nextHandler}
          text="TIẾP THEO"
          disable={disable}
        ></BottomComponent>
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
    height: height * 0.07,
    borderRadius: 50,
    borderWidth: 1,
    marginHorizontal: height * 0.05,
    marginVertical: width * 0.05,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 }, // đẩy xuống 2 px
    shadowRadius: 6,
    shadowOpacity: 0.25,
    backgroundColor: 'white',
    elevation: 10,
  },
  image: {
    width: width * 0.06,
    height: height * 0.04,
    resizeMode: 'cover',
  },
  viewInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    flex: 1,
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewBottom: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 10,
  },
});
