import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes'

export default styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  feed: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.banner
  },
  paginationLoaderContainer: {
    width: '100%',
    alignItems: 'center',
    padding: Metrics.baseMargin
  },
})
