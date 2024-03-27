import { Alert, Image, View, StyleSheet, Text, Dimensions } from 'react-native';
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from 'expo-image-picker';
import { useState } from 'react';
import OutLineButton from '../UI/Button/OutLineButton';
import { Colors } from '../../constants/colors';
import * as FileSystem from 'expo-file-system';
import axios from 'axios';

function ImagePicker({ onTakeImage }) {
  const [pickedImage, setPickedImage] = useState();
  const [cameraPermissionInfomation, requestPermission] =
    useCameraPermissions();

  async function verifyPermissions() {
    if (cameraPermissionInfomation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }
    if (cameraPermissionInfomation.status === PermissionStatus.DENIED) {
      Alert.alert(
        'Insufficient Permission!',
        'Bạn cần cấp quyền cho máy ảnh và thư viện ảnh để sử dụng chức năng này.'
      );
      return false;
    }
    return true;
  }
  async function takeImageHandler() {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [14, 16],
      quality: 0.5,
    });

    setPickedImage(image.assets[0].uri); // Fix lỗi từ cú pháp cũ setPickedImage(image.uri)
    // onTakeImage(image.assets[0].uri);
  }

  let imagePreview = <Text>Không có ảnh nào. Hãy chụp ảnh để bắt đầu!</Text>;

  if (pickedImage) {
    imagePreview = <Image style={styles.image} source={{ uri: pickedImage }} />;
  }

  const setText = () => {
    return pickedImage === undefined ? '' : `Đây là: ${pickedImage}`;
  };
  const handlerImage = async () => {
    try {
      if (!pickedImage) {
        Alert('Vui lòng chọn ảnh, hoặc chụp ảnh mới!');
        return;
      }
      const key = 'AIzaSyBWEeLdE-L6yrPCfcU_13kLTWPzWGI_UMc';
      const apiUrl = `https://vision.googleapis.com/v1/files:annotate?key=${key}`;
      const base64Image = await FileSystem.readAsStringAsync(pickedImage, {
        encoding: FileSystem.EncodingType.Base64,
      });
      const requestData = {
        requests: [
          {
            image: {
              content: base64Image,
            },
            features: [{ type: 'LABEL_DETECTION', maxResults: 5 }],
          },
        ],
      };
      const res = await axios.post(apiUrl, requestData);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <OutLineButton icon="camera" onPress={takeImageHandler}>
        Chụp Ảnh
      </OutLineButton>
      {pickedImage && (
        <OutLineButton icon="camera" onPress={handlerImage}>
          Tra cứu
        </OutLineButton>
      )}
      <Text style={styles.text}>{setText()}</Text>
    </View>
  );
}

export default ImagePicker;

var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  imagePreview: {
    width: width,
    height: height / 2,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.backgroundSliver,
    borderRadius: 30,
    overflow: 'hidden',
  },
  image: {
    width: width,
    height: height,
  },
  text: {
    paddingTop: 10,
    fontSize: 10, //khi co du lieu that thay doi thanh 20
    alignItems: 'center',
    justifyContent: 'center',
    color: Colors.title,
    lineHeight: 18,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 10,
  },
});
