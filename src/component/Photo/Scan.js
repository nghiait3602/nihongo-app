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
            <Text style={styles.buttonText}>{cameraText()}</Text>
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
  buttonText: {
    fontSize: 18,
    color: '#FFF',
  },
});






// import { Camera, CameraType } from "expo-camera";
// import { useState, useEffect } from "react";
// import { StyleSheet, View, TouchableOpacity, Text, Alert } from "react-native";
// import * as tf from "@tensorflow/tfjs";
// import * as FileSystem from "expo-file-system";
// import * as ImagePicker from "expo-image-picker";
// const modelPath = "assets/model.tflite";

// const Scan = () => {
//   const [type, setType] = useState(CameraType.back);
//   const [isAnalyzing, setIsAnalyzing] = useState(false);
//   const [analysisResults, setAnalysisResults] = useState(null);
//   const [permission, requestPermission] = Camera.useCameraPermissions();
//   const [imageUri, setImageUri] = useState(null); // State to store image URI

//   async function verifyPermissions() {
//     if (permission === null) {
//       return false;
//     }

//     if (permission.status === "undetermined") {
//       const permissionResponse = await requestPermission();
//       return permissionResponse.granted;
//     }

//     if (permission.status === "denied") {
//       Alert.alert(
//         "Insufficient Permission!",
//         "Bạn cần cấp quyền cho máy ảnh và thư viện ảnh để sử dụng chức năng này."
//       );
//       return false;
//     }

//     return true;
//   }

//   function chuyenDoiCamera() {
//     setType((current) =>
//       current === CameraType.back ? CameraType.front : CameraType.back
//     );
//   }

//   async function captureFrame() {
//     if (!camera) {
//       console.error("Không thể truy cập camera!");
//       return;
//     }
  
//     try {
//       const photo = await camera.takePictureAsync({ quality: 1 });
//       const { uri } = photo;
//       setImageUri(uri);
//       analyzeImage(uri);
//     } catch (error) {
//       console.error("Lỗi khi chụp ảnh:", error);
//     }
//   }
  
//   async function pickImageFromLibrary() {
//     try {
//       const result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//         allowsEditing: true,
//         aspect: [4, 3],
//         quality: 1,
//       });

//       if (!result.canceled) {
//         const { uri } = result;
//         setImageUri(uri); // Set imageUri for analysis
//         analyzeImage(uri); // Pass uri directly to analyzeImage
//       }
//     } catch (error) {
//       console.error("Lỗi khi chọn ảnh:", error);
//     }
//   }

//   async function analyzeImage(imageUri) {
//     setIsAnalyzing(true);
//     setAnalysisResults(null);
  
//     try {
//       // Tải mô hình TensorFlow.js
//       const model = await tf.loadGraphModel(modelPath);
  
//       // Tạo tensor từ URI ảnh
//       const imageTensor = await imageToTensor(imageUri);
  
//       // Đưa ra dự đoán bằng cách sử dụng mô hình
//       const predictions = await model.predict(imageTensor);
//       setAnalysisResults(predictions.dataSync());
//     } catch (error) {
//       console.error("Lỗi khi phân tích:", error);
//     } finally {
//       setIsAnalyzing(false);
//     }
//   }
  
//   async function imageToTensor(imageUri) {
//     const response = await fetch(imageUri);
//     const blob = await response.blob();
//     const image = tf.browser.fromPixels(await blobToImage(blob));
//     return image.expandDims(0);
//   }
  
//   function blobToImage(blob) {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         const base64data = reader.result;
//         const image = new Image();
//         image.onload = () => resolve(image);
//         image.onerror = reject;
//         image.src = base64data;
//       };
//       reader.readAsDataURL(blob);
//     });
//   }  

//   function renderAnalysisResults() {
//     if (analysisResults) {
//       return (
//         <View>
//           <Text>Kết quả phân tích:</Text>
//           {analysisResults.map((result) => (
//             <Text key={result.id}>{result.label}</Text>
//           ))}
//         </View>
//       );
//     } else if (isAnalyzing) {
//       return <Text>Đang phân tích ảnh...</Text>;
//     }
//     return null;
//   }

//   const [camera, setCamera] = useState(null);

//   useEffect(() => {
//     (async () => {
//       const hasPermission = await verifyPermissions();
//       if (hasPermission) {
//         console.log("Quyền camera và thư viện ảnh đã được cấp");
//       }
//     })();
//   }, []);

//   const cameraText = () => {
//     return type === CameraType.back ? "Camera trước" : "Camera sau";
//   };

//   return (
//     <View style={styles.container}>
//       <Camera style={styles.camera} type={type} ref={setCamera}>
//         <View style={styles.buttonContainer}>
//           <TouchableOpacity onPress={captureFrame}>
//             <Text style={styles.buttonText}>Chụp ảnh</Text>
//           </TouchableOpacity>
//           <TouchableOpacity onPress={chuyenDoiCamera}>
//             <Text style={styles.buttonText}>{cameraText()}</Text>
//           </TouchableOpacity>
//           <TouchableOpacity onPress={pickImageFromLibrary}>
//             <Text style={styles.buttonText}>Chọn ảnh từ thư viện</Text>
//           </TouchableOpacity>
//         </View>
//       </Camera>
//       {renderAnalysisResults()}
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
//     height: "80%",
//     marginVertical: 10,
//   },
//   buttonContainer: {
//     flex: 1,
//     justifyContent: "flex-end",
//     alignItems: "center",
//     marginTop: 10,
//   },
//   buttonText: {
//     fontSize: 18,
//     color: "#FFF",
//   },
// });