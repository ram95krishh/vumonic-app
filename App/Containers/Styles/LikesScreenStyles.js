import { StyleSheet } from 'react-native'
import { Metrics, Colors, Fonts } from '../../Themes'
import { HEADER_HEIGHT } from '../../Themes/ApplicationStyles'

const AVATAR_DIMENSIONS = 40

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.snow
  },
  containerArea: {
    margin: Metrics.doubleBaseMargin,
    marginBottom: 0,
    flexDirection: 'row',
    alignItems: 'center'
  },
  avatar: {
    overflow: 'hidden',
    width: AVATAR_DIMENSIONS,
    height: AVATAR_DIMENSIONS,
    borderRadius: AVATAR_DIMENSIONS / 2
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
  text: {
    paddingLeft: Metrics.doubleBaseMargin,
    lineHeight: 21,
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
