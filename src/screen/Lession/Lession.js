import {
  StyleSheet,
  SafeAreaView,
  Platform,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { Colors } from '../../constants/colors';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import Header from '../../component/UI/Header/header';
import { FlatList } from 'react-native-gesture-handler';
const LessionScreen = () => {
  const navigation = useNavigation();
  const router = useRoute();
  const datas = router.params;

  function handlerNavigation(item) {
    navigation.navigate('LessionObject', item);
    console.log(item);
  }
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={handlerNavigation.bind(this, item.id)}
      >
        <View style={styles.infoContainer}>
          <Image
            style={styles.logoLession}
            source={require(`../../../assets/Icons/japan.png`)}
          ></Image>
          <View style={styles.inforContent}>
            <Text style={styles.text}>{item.lesson}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={{ ...styles.container }}>
      <FlatList
        data={datas[0].data}
        keyExtractor={(item, index) => index}
        renderItem={renderItem}
      ></FlatList>
    </SafeAreaView>
  );
};

export default LessionScreen;
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Snow,
    paddingTop: Platform.OS === 'android' ? 50 : 0,
  },
  item: {
    display: 'flex',
    flex: 1,
    padding: 10,
    color: 'black',
    justifyContent: 'center',
    margin: 10,
    borderRadius: 12,
    borderWidth: 1,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  logoLession: {
    width: width * 0.06,
    height: height * 0.04,
  },
  inforContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Nunito_ExtraBold',
  },
});
