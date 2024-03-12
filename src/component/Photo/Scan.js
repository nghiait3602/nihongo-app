// import { Camera, CameraType } from "expo-camera";
// import { useState, useEffect } from "react";
// import { StyleSheet, View, TouchableOpacity, Text } from "react-native";

// const Scan = () => {
//   const [type, setType] = useState(CameraType.back);
//   const [permission, requestPermission] = Camera.useCameraPermissions();

//   async function verifyPermissions() {
//     if (cameraPermissionInfomation.status === PermissionStatus.UNDETERMINED) {
//       const permissionResponse = await requestPermission();

//       return permissionResponse.granted;
//     }
//     if (cameraPermissionInfomation.status === PermissionStatus.DENIED) {
//       Alert.alert(
//         "Insufficient Permission!",
//         "Bạn cần cấp quyền cho máy ảnh để sử dụng chức năng này."
//       );
//       return false;
//     }
//     return true;
//   }

//   function chuyenDoiCamera() {
//     setType((current) =>
//       current === CameraType.back ? CameraType.front : CameraType.back
//     ); //Thay đổi camera trước hoac sau
//   }

//   const cameraText = () => {
//     return type === CameraType.back ? "Camera trước" : "Camera sau";
//   };

//   return (
//     <View style={styles.container}>
//       <Camera style={styles.camera} type={type}>
//         <View style={styles.buttonContainer}>
//           <TouchableOpacity onPress={chuyenDoiCamera}>
//             <Text style={styles.buttonText}>{cameraText()}</Text>
//           </TouchableOpacity>
//         </View>
//       </Camera>
//     </View>
//   );
// };

// export default Scan;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   camera: {
//     width: "100%",
//     height: "100%",
//     marginVertical: 10,
//     overflow: "hidden",
//   },
//   buttonContainer: {
//     flex: 1,
//     justifyContent: "flex-start",
//     alignItems: "center",
//     marginTop: 10,
//   },
//   buttonText: {
//     fontSize: 18,
//     color: '#FFF',
//   },
// });

import { Camera, CameraType } from "expo-camera";
import { useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import TakePhotoButton from "../UI/Button/TakePhotoButton";


const Scan = () => {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [camera, setCamera] = useState(null);

  async function verifyPermissions() {
    if (permission.status === "undetermined") {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    } else if (permission.status === "denied") {
      Alert.alert(
        "Insufficient Permission!",
        "Bạn cần cấp quyền cho máy ảnh để sử dụng chức năng này."
      );
      return false;
    }
    return true;
  }

  function chupHinh() {
    if (camera) {
      camera.takePictureAsync()
        .then((data) => {
          // Do something with the captured image data (e.g., save, display)
          console.log("Hình chụp:", data);
        })
        .catch((error) => console.error(error));
    }
  }

  function chuyenDoiCamera() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  const cameraText = () => {
    return type === CameraType.back ? "Camera trước" : "Camera sau";
  };

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} ref={setCamera}>
        <View style={styles.buttonContainer}>
 
          <TouchableOpacity onPress={chuyenDoiCamera} style={styles.switchButton}>
            <Text style={styles.switchButtonText}>{cameraText()}</Text>
          </TouchableOpacity>

          <TakePhotoButton icon="camera" onPress={chupHinh}>
            <Text>Chụp ảnh</Text>
          </TakePhotoButton>
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
    overflow: "hidden",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between", 
  },
  switchButton: { 
    padding: 10,
    borderRadius: 5,
    alignItems: 'center'
  },
  switchButtonText: {
    fontSize: 18,
    color: "#FFF",
  },
  captureButtonText: {
    fontSize: 16,
    color: "#000",
  },
});