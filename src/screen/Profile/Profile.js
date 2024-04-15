import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert,
  Platform,
  ScrollView,
  RefreshControl,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Colors } from '../../constants/colors';
import { AntDesign } from '@expo/vector-icons';
import ItemDangKy from '../../component/Profile/ItemDangKy';
import ItemProfile from '../../component/Profile/ItemProfile';
import { removeAuth, authSelector } from '../../redux/reducers/authReducer';
import { useDispatch, useSelector } from 'react-redux';

import userAPI from '../../Api/authApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImageAPI from '../../Api/updateMeApi';
import Loading from '../../Modals/Loading';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

const Profile = () => {
  const [user, setUser] = useState(null);
  const [image, setImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const { token } = useSelector(authSelector);

  const [refreshing, setRefreshing] = useState(false); // State để theo dõi trạng thái của action làm mới

  // Hàm để xử lý làm mới dữ liệu
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchData();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Quyền truy cập thư viện ảnh đã bị từ chối!');
        }
      }
    })();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await userAPI.HandlerAuthentication(
        `/me`,
        null,
        'get',
        token
      );
      setUser(response.data.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching user data: ', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [token]);

  const updateUserData = async () => {
    try {
      const response = await ImageAPI.updateUserData(image, token);

      if (response && response.status === 'success') {
        console.log(
          `Upload cloudinary thành công: ${response.data.user.photo}`
        );
      } else {
        console.error('Lỗi update user data: Dữ liệu trả về không hợp lệ.');
      }
    } catch (err) {
      console.log('Đang upload ảnh lên cloudinary...');
    }
  };

  useEffect(() => {
    if (image !== '') {
      updateUserData();
      Alert.alert('Thông báo', 'Cập nhật ảnh thành công!');
    }
  }, [image]);

  const pickImage = async () => {
    Alert.alert(
      'Đổi ảnh đại diện',
      'Bạn có muốn đổi ảnh đại diện không?',
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            let result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.All,
              allowsEditing: true,
              aspect: [4, 3],
              quality: 1,
            });
            if (!result.canceled) {
              try {
                setImage(result.assets[0].uri);
                const updateAnh = {};
                if (image !== '') {
                  updateAnh.photo = image;
                }
                const response = await userAPI.HandlerAuthentication(
                  `/updateMe`,
                  updateAnh,
                  'patch',
                  token
                );
                if (response.data.user) {
                  console.log(
                    'Update local thành công:',
                    response.data.user.photo
                  );
                }
              } catch (err) {
                console.error('Update local Thất bại:', err);
              }
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const profile = image
    ? { uri: image }
    : user && user.photo
    ? { uri: user.photo }
    : require('./../../../assets/Icons/avatar.png');

  const bkImg =
    'https://d326fntlu7tb1e.cloudfront.net/uploads/ab6356de-429c-45a1-b403-d16f7c20a0bc-bkImg-min.png';

  const removeItemFromAsyncStorage = async () => {
    try {
      await AsyncStorage.removeItem('chude');
      await AsyncStorage.removeItem('like');
    } catch (error) {
      console.error(`Error removing item from AsyncStorage: ${error}`);
    }
  };
  function logOut() {
    Alert.alert(
      'Đăng xuất',
      'Bạn có chắc chắn muốn đăng xuất?',
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            removeItemFromAsyncStorage();
            dispatch(removeAuth());
          },
        },
      ],
      { cancelable: false }
    );
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={{
        backgroundColor: Colors.XanhNgoc,
        height: height,
      }}
    >
      {isLoading && <Loading isVisible={isLoading}></Loading>}
      <Image
        source={{ uri: bkImg }}
        style={[
          StyleSheet.absoluteFillObject,
          {
            opacity: 0.7,
          },
        ]}
      />
      <View style={styles.profile}>
        <View
          style={{
            flexDirection: 'row',
          }}
        >
          <View
            style={{
              alignItems: 'center',
              alignContent: 'center',
              flex: 1,
            }}
          >
            <TouchableOpacity onPress={pickImage}>
              <Image source={profile} style={styles.image} />
            </TouchableOpacity>
            <Text style={styles.text}>
              {user === null ? 'username' : user.name}
            </Text>
            <Text style={styles.email}>
              {user === null ? 'email' : user.email}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={logOut}
          style={{ right: 30, top: height < 800 ? -80 : -100 }}
        >
          <AntDesign name="logout" size={26} color={Colors.Cardinal} />
        </TouchableOpacity>
      </View>

      <View style={styles.box}>
        <ItemProfile
          title={`Khóa học đang học: ${
            user && user.tienTrinhCuaToi && user.tienTrinhCuaToi.length > 0
              ? user.tienTrinhCuaToi[0].baiHoc.khoaHoc.tenKhoahoc
              : 'chưa học'
          }`}
          icon={'book'}
          color={Colors.Fox}
          khoaHoc={
            user && user.tienTrinhCuaToi && user.tienTrinhCuaToi.length > 0
              ? user.tienTrinhCuaToi[0].baiHoc.khoaHoc
              : 'chưa học'
          }
          tenKH={
            user && user.tienTrinhCuaToi && user.tienTrinhCuaToi.length > 0
              ? user.tienTrinhCuaToi[0].baiHoc.khoaHoc.tenKhoahoc
              : 'chưa học'
          }
        />
      </View>
      <View style={styles.box}>
        <ItemProfile
          title={`Hoàn thành: ${
            user && user.tienTrinhCuaToi && user.tienTrinhCuaToi.length > 0
              ? user.tienTrinhCuaToi[0].baiHoc.tenBaiHoc
              : 'chưa học'
          }`}
          icon={'check'}
          color={Colors.Feather_Green}
          font={2}
          tenbtht={
            user && user.tienTrinhCuaToi && user.tienTrinhCuaToi.length > 0
              ? user.tienTrinhCuaToi[0].baiHoc.tenBaiHoc
              : 'chưa học'
          }
          btht={
            user && user.tienTrinhCuaToi && user.tienTrinhCuaToi.length > 0
              ? user.tienTrinhCuaToi[0].baiHoc
              : 'chưa học'
          }
        />
      </View>
      <View style={styles.box}>
        <ItemProfile
          title={`Tiếp theo: ${
            user && user.baiHocTiepTheo
              ? user.baiHocTiepTheo.tenBaiHoc
              : 'chưa học'
          }`}
          icon={'rocket-outline'}
          color={Colors.Humpback}
          font={1}
          tenbaihoctt={
            user && user.baiHocTiepTheo
              ? user.baiHocTiepTheo.tenBaiHoc
              : 'chưa học'
          }
          baihoctt={
            user && user.baiHocTiepTheo ? user.baiHocTiepTheo : 'chưa học'
          }
        />
      </View>
      {user && !isLoading && (
        <View style={styles.box}>
          <ItemProfile
            title={`Từ vựng`}
            icon={'bag-outline'}
            font={1}
            datadl={
              user.tuVungS !== undefined &&
              user.tuVungS !== null &&
              user.tuVungS.length > 0
                ? user.tuVungS
                : ''
            }
          />
          <ItemProfile
            title={`Kanji`}
            icon={'briefcase-outline'}
            font={1}
            datadl={
              user.kanjiS !== undefined &&
              user.kanjiS !== null &&
              user.kanjiS.length > 0
                ? user.kanjiS
                : ''
            }
          />
          <ItemProfile
            title={`Ngữ Pháp`}
            icon={'bag-handle-outline'}
            font={1}
            datadl={
              user.nguPhapS !== undefined &&
              user.nguPhapS !== null &&
              user.nguPhapS.length > 0
                ? user.nguPhapS
                : ''
            }
          />
        </View>
      )}
      <View style={styles.box}>
        <ItemProfile title={`Từ vựng yêu thích`} icon={'heart'} font={1} />
        <ItemProfile title={'Liên hệ'} icon={'chatbubbles-outline'} font={1} />
        <ItemProfile title={'Trung tâm dịch vụ'} icon={'customerservice'} />
        <ItemProfile title={'Sửa thông tin người dùng'} icon={'setting'} />
      </View>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  image: {
    width: 140,
    height: 140,
    borderRadius: 140 / 2,
    borderColor: Colors.Snow,
    borderWidth: 4,
  },
  text: {
    color: 'black',
    fontSize: 18,
  },
  email: {
    color: 'gray',
    marginBottom: 30,
  },
  box: {
    height: 'auto',
    backgroundColor: Colors.Snow,
    margin: 10,
    borderRadius: 12,
    elevation: 3,
  },
  profile: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 60,
  },
});
