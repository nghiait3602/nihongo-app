import { Camera, CameraType } from "expo-camera";
import { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";

const Scan = () => {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  async function verifyPermissions() {
    if (cameraPermissionInfomation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }
    if (cameraPermissionInfomation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permission!",
        "Bạn cần cấp quyền cho máy ảnh để sử dụng chức năng này."
      );
      return false;
    }
    return true;
  }

  function chuyenDoiCamera() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    ); //Thay đổi camera trước hoac sau
  }

  const cameraText = () => {
    return type === CameraType.back ? "Camera trước" : "Camera sau";
  };

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={chuyenDoiCamera}>
            <Text>{cameraText()}</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
};

export default Scan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: { 
    width: "100%",
    height: "100%",
    marginVertical: 10,
    overflow: "hidden",
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 10, 
  },
});
