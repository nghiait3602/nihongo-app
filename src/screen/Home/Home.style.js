import { StyleSheet, Platform, Dimensions } from 'react-native';
import { Colors } from '../../constants/colors';
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;
export default StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: Colors.Snow,
    paddingTop: Platform.OS === 'android' ? 50 : 0,
  },
});
