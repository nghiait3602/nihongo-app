import { Alert, Image, View, StyleSheet, Text } from "react-native";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import { useState } from "react";
import TakePhotoButton from "../UI/Button/TakePhotoButton";
import { Colors } from "../../constants/colors";

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
        "Insufficient Permission!",
        "Bạn cần cấp quyền cho máy ảnh và thư viện ảnh để sử dụng chức năng này."
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

    console.log("Hinh anh:", image);

    setPickedImage(image.assets[0].uri); // Fix lỗi từ cú pháp cũ setPickedImage(image.uri)
    // onTakeImage(image.assets[0].uri);
  }

  let imagePreview = <Text>Không có ảnh nào. Hãy chụp ảnh để bắt đầu!</Text>;

  if (pickedImage) {
    imagePreview = <Image style={styles.image} source={{ uri: pickedImage }} />;
  }

  const setText = () => {
    return pickedImage == undefined ? "" : `Đây là: ${pickedImage}`;
  };

  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <TakePhotoButton icon="camera" onPress={takeImageHandler}>
        Chụp Ảnh
      </TakePhotoButton>
      <Text style={styles.text}>{setText()}</Text>
    </View>
  );
}

export default ImagePicker;

const styles = StyleSheet.create({
  imagePreview: {
    width: "100%",
    height: "80%",
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.backgroundSliver,
    borderRadius: 30,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  text: {
    paddingTop: 10,
    fontSize: 10,
    alignItems: "center",
    justifyContent: "center",
    color: Colors.title,
    lineHeight: 18,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 10,
  },
});