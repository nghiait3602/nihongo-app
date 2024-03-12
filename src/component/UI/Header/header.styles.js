import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '../../../constants/colors';
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;
export default StyleSheet.create({
  header: {
    flexDirection: 'row',
    backgroundColor: Colors.Snow,
    borderBottomColor: Colors.Hare,
    borderBottomWidth: 1.5,
    width: width,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countryLogo: {
    width: width * 0.06,
    height: height * 0.04,
  },
  countryText: {
    fontSize: 16,
    color: Colors.Macaw,
    margin: 5,
    fontFamily: 'Nunito_ExtraBold',
  },
  fireText: {
    fontSize: 16,
    color: Colors.Fox,
    margin: 5,
    fontFamily: 'Nunito_ExtraBold',
  },
});
