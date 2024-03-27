import { Alert, Image, View, StyleSheet, Text, Dimensions } from 'react-native';
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from 'expo-image-picker';

import { useEffect, useState } from 'react';
import OutLineButton from '../UI/Button/OutLineButton';
import { Colors } from '../../constants/colors';
import * as FileSystem from 'expo-file-system';
import axios from 'axios';
import SectionComponent from '../UI/Auth/SectionnsComponent';
import Loading from '../../Modals/Loading';

function ImagePicker({ onTakeImage }) {
  const [pickedImage, setPickedImage] = useState();
  const [data, setData] = useState([]);
  const [dataDich, setDataDich] = useState([]);
  const [dataVN, setDataVN] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cameraPermissionInfomation, requestPermission] =
    useCameraPermissions();

  useEffect(() => {
    if (data !== null) {
      translateDefinitions('&source=en&target=ja');
    } else if (dataDich !== null) {
      translateDefinitions('&source=ja&target=vi');
    }
  }, [data]);
  useEffect(() => {
    if (dataDich !== null) translateDefinitions('&source=ja&target=vi');
  }, [dataDich]);
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
      mediaTypes: 'Images',
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

    setPickedImage(image.assets[0].uri); // Fix lỗi từ cú pháp cũ setPickedImage(image.uri)
    // onTakeImage(image.assets[0].uri);
  }

  let imagePreview = <Text>Không có ảnh nào. Hãy chụp ảnh để bắt đầu!</Text>;

  if (pickedImage) {
    imagePreview = <Image style={styles.image} source={{ uri: pickedImage }} />;
  }

  const handlerImage = async () => {
    setIsLoading(true);
    try {
      if (!pickedImage) {
        Alert.alert('Vui lòng chọn ảnh, hoặc chụp ảnh mới!');
        setIsLoading(false);
        return;
      }
      const key = 'AIzaSyBWEeLdE-L6yrPCfcU_13kLTWPzWGI_UMc';
      const apiUrl = `https://vision.googleapis.com/v1/images:annotate?key=${key}`;
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
      setData(res.data.responses[0].labelAnnotations);
      setIsLoading(false);
    } catch (error) {
      console.log('Error:', error.message);
      setIsLoading(false);
    }
  };
  const translateDefinitions = async (target) => {
    setIsLoading(true);
    try {
      const temp = [];
      for (const definition of data) {
        const response = await axios.get(
          `https://translation.googleapis.com/language/translate/v2?key=AIzaSyDnD3yxmMCDTuojIKKS0ZsZbYzU_Wkw36w&q=${encodeURIComponent(
            definition.description
          )}${target}`
        );
        const translatedText =
          response.data.data.translations[0].translatedText;
        temp.push(translatedText);
      }
      if (target === '&source=en&target=ja') {
        setDataDich(temp);
        setIsLoading(false);
      } else if (target === '&source=ja&target=vi') {
        setDataVN(temp);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Lỗi khi dịch định nghĩa từ:', error);
      setIsLoading(false);
    }
  };

  return (
    <View>
      {isLoading && <Loading isVisible={isLoading}></Loading>}
      <View style={styles.imagePreview}>{imagePreview}</View>
      <OutLineButton icon="camera" onPress={takeImageHandler}>
        Chụp Ảnh
      </OutLineButton>
      <SectionComponent>
        {pickedImage && (
          <OutLineButton icon="camera" onPress={handlerImage}>
            Phân Tích
          </OutLineButton>
        )}
      </SectionComponent>
      {dataDich.length > 0 && dataVN.length > 0 && !isLoading && (
        <SectionComponent>
          {dataDich.map((text, index) => (
            <Text key={text}>
              {text}:{dataVN[index]}
            </Text>
          ))}
        </SectionComponent>
      )}
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
