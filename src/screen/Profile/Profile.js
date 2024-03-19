import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, { useState } from 'react';
import { Colors } from '../../constants/colors';
import { AntDesign } from '@expo/vector-icons';
import ItemDangKy from '../../component/Profile/ItemDangKy';
import ItemProfile from '../../component/Profile/ItemProfile';
import { removeAuth } from '../../redux/reducers/authReducer';
import { useDispatch } from 'react-redux';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

const Profile = () => {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  const profile =
    'https://d326fntlu7tb1e.cloudfront.net/uploads/b5065bb8-4c6b-4eac-a0ce-86ab0f597b1e-vinci_04.jpg';
  const bkImg =
    'https://d326fntlu7tb1e.cloudfront.net/uploads/ab6356de-429c-45a1-b403-d16f7c20a0bc-bkImg-min.png';

  function logOut() {
    dispatch(removeAuth());
  }
  return (
    <View>
      <View style={{ backgroundColor: Colors.Snow, height: height }}>
        <View
          style={{
            backgroundColor: Colors.Macaw,
            height: height - 80,
            borderBottomEndRadius: 30,
            borderBottomStartRadius: 30,
          }}
        >
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
              <Image
                source={require('./../../../assets/Icons/avatar.png')}
                style={{ width: 45, height: 45 }}
              />
              <View style={{ marginLeft: 10, marginTop: 3 }}>
                <Text style={styles.text}>
                  {user === null ? 'username' : user.username}
                </Text>
                <Text style={styles.email}>
                  {user === null ? 'email' : user.email}
                </Text>
              </View>
            </View>

            <TouchableOpacity onPress={logOut}>
              <AntDesign name="logout" size={24} color="red" />
            </TouchableOpacity>
          </View>

          <ItemDangKy
            heading={'Đăng ký tài khoản'}
            desc={
              'Hãy tham gia cộng đồng của chúng tôi và giới thiệu những bài học tiếng Nhật của bạn tới bạn bè.'
            }
          />

          <View style={styles.box}>
            <ItemProfile
              title={'Tên người dùng'}
              icon={'create-outline'}
              font={1}
            />
            <ItemProfile title={'Email'} icon={'envelope-letter'} font={2} />
            <ItemProfile title={'Ngày sinh'} icon={'calendar'} />
          </View>

          <View style={styles.box}>
            <ItemProfile title={'Khóa học đang học'} icon={'book'} />
            <ItemProfile title={'Bài học hoàn thành'} icon={'check'} font={2} />
            <ItemProfile
              title={'Bài học tiếp theo'}
              icon={'rocket-outline'}
              font={1}
            />
          </View>

          <ItemDangKy
            heading={'Tham gia nhóm trợ giảng'}
            desc={
              'Cùng chúng tôi xây dựng cộng đồng học tiếng Nhật online hiệu quả.'
            }
          />

          <View style={styles.box}>
            <ItemProfile
              title={'Phản hồi'}
              icon={'chatbubbles-outline'}
              font={1}
            />
            <ItemProfile title={'Trung tâm dịch vụ'} icon={'customerservice'} />
            <ItemProfile title={'Cài đặt'} icon={'setting'} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  text: {
    marginLeft: 10,
    color: 'black',
  },
  email: {
    marginLeft: 10,
    color: 'gray',
  },
  box: {
    height: 140,
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
