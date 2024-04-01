import { Pressable, Text, StyleSheet, Dimensions } from "react-native";
import { Colors } from "../../../constants/colors";

function ColorButton({ onPress, children, color, selected }) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        { 
          backgroundColor: color || Colors.Feather_Green, // Set mau mac dinh
          borderColor: selected ? Colors.Mask_Green : "white", // Thêm viền xanh khi nút được chọn
         }, 
        pressed && styles.pressed,
      ]}
      onPress={onPress}
    >
      <Text style={[styles.text, {color: selected ? Colors.Mask_Green : "white"}]}>{children}</Text>
    </Pressable>
  );
}

export default ColorButton;
var width = Dimensions.get("window").width;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 8,
    margin: 5,
    elevation: 4,
    borderRadius: 4,
    borderWidth: 2.5,
    borderColor: 'white',
    width: width/2.5
  },
  pressed: {
    opacity: 0.5,
  },
  text: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  },
});
