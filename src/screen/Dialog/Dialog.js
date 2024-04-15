import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
} from 'react-native';
import React from 'react';
import ItemList from './item';
import { useNavigation } from '@react-navigation/native';
const Dialog = () => {
  const navigation = useNavigation();
  const chude = ['TV', 'NP, GY', 'BD', 'KJ'];
  function navigationHandler(it) {
    switch (it) {
      case chude[0]:
        return;
      case chude[1]:
        return;
      case chude[2]:
        return navigation.navigate('TuVung');
      case chude[3]:
        return navigation.navigate('BaiDoc');
      case chude[4]:
        return navigation.navigate('Kanji');
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topView}>
        <View style={styles.topInlineLeft}>
          <Text style={styles.titleTop}>Vừa học vừa chill</Text>
          <Text style={styles.titleTop}>Càng học càng fun</Text>
          <Text style={styles.descTop}>
            Ứng dụng ngay kiến thức vừa học của mình.
          </Text>
        </View>
        <View style={styles.topInlineRight}>
          <Image
            style={styles.image}
            source={require('../../../assets/Icons/iconapp.png')}
          ></Image>
        </View>
      </View>
      <View style={styles.bottomView}>
        <ScrollView style={styles.bottomViewInline}>
          <ItemList
            icon="text-outline"
            onPress={() => navigation.navigate('TuVung', 'ChuDe')}
          >
            TỪ VỰNG GỢI Ý
          </ItemList>
          <ItemList
            icon="library-outline"
            onPress={() => navigation.navigate('BaiDoc', 'baidoc')}
          >
            BÀI ĐỌC
          </ItemList>
          <ItemList
            icon="bag-outline"
            onPress={() => navigation.navigate('TuVung', 'all')}
          >
            KHO TỪ VỰNG
          </ItemList>
          <ItemList
            icon="bag-handle-outline"
            onPress={() => navigation.navigate('NguPhap', 'nn')}
          >
            KHO NGỮ PHÁP
          </ItemList>
          <ItemList
            icon="briefcase-outline"
            onPress={() => navigation.navigate('Kanji', 'kanji')}
          >
            KHO KANJI
          </ItemList>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Dialog;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topView: {
    flex: 0.5,
    backgroundColor: 'green',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  topInlineLeft: {
    flex: 0.7,
    marginLeft: 10,
  },
  titleTop: {
    fontSize: 25,
    fontWeight: 'bold',
    fontFamily: 'Nunito_Bold',
    color: 'white',
  },
  descTop: {
    fontSize: 16,
    fontWeight: '400',
    fontFamily: 'Nunito_Regular',
    color: 'white',
  },
  topInlineRight: {
    flex: 0.3,
  },
  bottomView: {
    flex: 1,
    backgroundColor: 'white',
  },
  bottomViewInline: { marginTop: -40 },
  image: {
    width: 100,
    height: 100,
  },
});
