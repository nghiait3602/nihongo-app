import { Camera } from "expo-camera";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

function Scan() {
  const [coQuyen, setCoQuyen] = useState(null);

  return (
    <View>
      <Text>Camera</Text>
    </View>
  );
}

export default Scan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
});
