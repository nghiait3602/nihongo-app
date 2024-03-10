import { StyleSheet, SafeAreaView, Platform, Text, View } from 'react-native';
import { Colors } from '../../constants/colors';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import Header from '../../component/UI/Header/header';
import { FlatList } from 'react-native-gesture-handler';
const LessionScreen = () => {
  const navigation = useNavigation();
  const router = useRoute();
  const datas = router.params;
  function navigationHandler() {
    navigation.goBack();
  }
  const renderItem = ({ item }) => {
    return (
      <View>
        <Text>{item.lesson}</Text>
      </View>
    );
  };
  return (
    <SafeAreaView style={{ ...styles.container }}>
      <Header
        onPress={navigationHandler}
        textLeft="Go back"
        left={require('../../../assets/Icons/japan.png')}
      />
      <FlatList
        data={datas[0].data}
        keyExtractor={(item, index) => index}
        renderItem={renderItem}
      ></FlatList>
    </SafeAreaView>
  );
};

export default LessionScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: Colors.Snow,
    paddingTop: Platform.OS === 'android' ? 50 : 0,
  },
});
