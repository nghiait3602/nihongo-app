import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Modal,
  FlatList,
  Image,
} from 'react-native';
import { AntDesign, Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import data from './../../../data/Profile.json';

const ItemProfile = ({
  title,
  icon,
  font,
  color,
  khoaHoc,
  tenKH,
  tenbaihoctt,
  baihoctt,
  tenbtht,
  btht,
  datadl,
}) => {
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);

  const handlePress = () => {
    if (title === 'Sửa thông tin người dùng') {
      navigation.navigate('SettingsScreen');
    }
    if (title === `Khóa học đang học: ${tenKH}` && tenKH !== 'chưa học') {
      navigation.navigate('LessionScreen', khoaHoc.id);
    }
    if (title === `Tiếp theo: ${tenbaihoctt}`) {
      navigation.navigate('LessionObject', baihoctt.id);
    }
    if (title === `Hoàn thành: ${tenbtht}` && tenbtht !== 'chưa học') {
      navigation.navigate('LessionObject', btht.id);
    }
    if (title === 'Từ vựng yêu thích') {
      navigation.navigate('TuVung', { title: 'like' });
    }

    if (title === 'Từ vựng' && datadl !== null) {
      navigation.navigate('TuVung', { title: 'tvdh', data: datadl });
    }
    if (title === 'Kanji' && datadl !== null) {
      navigation.navigate('Kanji', { title: 'kjdh', data: datadl });
    }
    if (title === 'Ngữ Pháp' && datadl !== null) {
      navigation.navigate('NguPhap', { title: 'npdh', data: datadl });
    }
    if (title === `Liên hệ`) {
      setIsModalVisible(true);
    }
    if (title === `Trung tâm dịch vụ`) {
      setIsModalVisible2(true);
    }
  };

  const catChuoi = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength - 5) + '...';
    } else {
      return text;
    }
  };

  const closeModal = () => {
    setIsModalVisible(false); //exit
    setIsModalVisible2(false);
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text
        style={[
          styles.text2,
          {
            color: Colors.Humpback,
            paddingBottom: 10,
            paddingTop: 10,
            fontSize: 20,
            textAlign: 'left',
          },
        ]}
      >
        {item.title}
      </Text>
      <Text style={styles.text2}>{item.content}</Text>
    </View>
  );

  return (
    <View>
      <TouchableOpacity onPress={handlePress}>
        <View style={styles.outer}>
          <View style={styles.inner}>
            {font === 1 ? (
              <Ionicons
                name={icon}
                size={24}
                color={color || Colors.backgroundSliver}
              />
            ) : font === 2 ? (
              <SimpleLineIcons
                name={icon}
                size={24}
                color={color || Colors.backgroundSliver}
              />
            ) : (
              <AntDesign
                name={icon}
                size={24}
                color={color || Colors.backgroundSliver}
              />
            )}
            <Text
              style={[styles.text, { color: color || Colors.backgroundSliver }]}
            >
              {catChuoi(title, 35)}
            </Text>
          </View>

          <AntDesign
            name="rightcircleo"
            size={18}
            color={Colors.backgroundSliver}
            style={{ bottom: -3, marginRight: 10 }}
          />
        </View>
        {!title.includes('Khóa học đang học') &&
          !title.includes('Hoàn thành') &&
          !title.includes('Tiếp theo') && <View style={styles.divider} />}
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
            <Icon name="times" size={28} color="white" />
          </TouchableOpacity>
          <View style={styles.modalInnerContent}>
            <Text
              style={[
                styles.text,
                { color: Colors.Feather_Green, paddingBottom: 20 },
              ]}
            >
              @ THÔNG TIN DEVELOPER @
            </Text>
            <Text style={styles.text}>Nguyễn Trung Nghĩa - 0385 637 299</Text>
            <Text style={styles.text}>Lê Quốc Việt - 0783 319 045</Text>
            <Text style={styles.text}>Phạm Hồng Thắng - 0778 054 039</Text>
            <Image
              source={require('./../../../assets/Icons/iconapp.png')}
              style={{
                width: 140,
                height: 140,
              }}
            />
            <Text style={[styles.text, { paddingTop: 40, fontSize: 12 }]}>
              © 2024 NihonGo App. Đồ án CNTT-VJIT-HUTECH.
            </Text>
          </View>
        </View>
      </Modal>

      <Modal
        visible={isModalVisible2}
        transparent={true}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
            <Icon name="times" size={28} color="white" />
          </TouchableOpacity>
          <View style={styles.modalInnerContent}>
            <FlatList
              data={data.sections[0].data}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
            />
            <Text style={[styles.text, { paddingTop: 40, fontSize: 12 }]}>
              © 2024 NihonGo App. Đồ án CNTT-VJIT-HUTECH.
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ItemProfile;

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  divider: {
    borderColor: Colors.backgroundSliver,
    opacity: 0.7,
    borderWidth: 0.3,
    width: width - 35,
    marginLeft: 10,
    marginBottom: 5,
    marginTop: 7,
  },
  box: {
    marginLeft: 10,
    paddingTop: 10,
  },
  outer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inner: {
    flexDirection: 'row',
    marginHorizontal: 20,
    alignItems: 'center',
    marginVertical: 18,
  },
  text: {
    marginLeft: 10,
    fontSize: 17,
    color: Colors.backgroundSliver,
    fontWeight: '600',
    fontFamily: 'Nunito_Black',
    textAlign: 'center',
  },
  text2: {
    marginLeft: 5,
    fontSize: 16,
    color: Colors.backgroundSliver,
    fontFamily: 'Nunito_ExtraBold',
    textAlign: 'justify',
  },
  inputContainer: {
    borderBottomWidth: 0.3,
    borderColor: Colors.backgroundSliver,
    marginLeft: 10,
    marginBottom: 5,
    marginTop: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: Colors.backgroundSliver,
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Màu nền mờ
  },
  closeButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignSelf: 'center',
    marginBottom: 10,
  },
  modalInnerContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: width - 40,
    maxHeight: height - 200,
    borderWidth: 0.5,
    borderColor: Colors.backgroundSliver,
    alignItems: 'center',
  },
});
