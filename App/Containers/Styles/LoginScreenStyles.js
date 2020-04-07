import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes'

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: Colors.banner
    },
    buttonText: {
      color: Colors.snow
    },
    buttonContainer: {
      width: 250,
      height: 50,
      borderRadius: 4,
      backgroundColor: Colors.snow,
      paddingHorizontal: Metrics.doubleBaseMargin,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row'
    },
    title: {
      color: Colors.border,
      marginLeft: Metrics.baseMargin
    },
    heading: {
      fontFamily: 'zocial',
      fontSize: Fonts.size.h1,
      color: Colors.snow
    }
})
