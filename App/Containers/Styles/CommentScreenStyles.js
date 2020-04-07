import { StyleSheet } from 'react-native'
import { Metrics, Colors, Fonts } from '../../Themes'
import { HEADER_HEIGHT } from '../../Themes/ApplicationStyles'

export const COMMENT_TEXT_BOX_HEIGHT = 60

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.snow
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyText: {
    color: Colors.text,
    fontSize: Fonts.size.text
  },
  paginationLoaderContainer: {
    flex: 1,
    alignItems: 'center',
    padding: Metrics.doubleBaseMargin
  },
  titleArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    maxHeight: HEADER_HEIGHT,
    borderBottomColor: Colors.text,
    borderBottomWidth: 2,
    margin: Metrics.smallMargin
  },
  titleText: {
    fontSize: Fonts.size.regular,
    fontWeight: '600',
    color: Colors.text
  }
})

export default styles
