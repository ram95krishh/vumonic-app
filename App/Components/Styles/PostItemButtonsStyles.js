import { StyleSheet } from 'react-native'
import { Metrics, Fonts, Colors } from '../../Themes'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginTop: Metrics.doubleBaseMargin,
    alignItems: 'center'
  },
  rightContainer: {
    flex: 1,
    height: '100%',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center'
  },
  iconContainer: {
    paddingHorizontal: Metrics.doubleBaseMargin,
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  leftIcon: {
    paddingLeft: Metrics.doubleBaseMargin,
    paddingRight: Metrics.doubleBaseMargin
  },
  rightIcon: {
    paddingRight: Metrics.doubleBaseMargin,
    paddingLeft: Metrics.doubleBaseMargin,
    paddingTop: Metrics.tinyMargin
  },
  countText: {
    fontWeight: '500',
    color: Colors.banner,
  },
  commentsText: {
    fontSize: Fonts.size.h2
  }
})

export default styles
