import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Colors } from '../../Themes/'

export const POST_LIST_LIVE_ITEM_HEIGHT = 100
export const POST_LIST_ITEM_HEIGHT = 150
export const POST_LIST_ITEM_MARGIN = Metrics.baseMargin
export const POST_LIST_ITEM_FOOTER_HEIGHT = 42
const POST_LIST_ITEM_HEADER_HIEGHT = 80

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  itemContainer: {
    paddingTop: 10,
    borderWidth: 2,
    backgroundColor: Colors.snow,
    padding: Metrics.baseMargin,
    margin: Metrics.smallMargin,
    borderRadius: Metrics.baseMargin,
    backgroundColor: Colors.snow,
    borderColor: Colors.banner
  },
  itemFooterContainer: {
    borderTopWidth: 1,
    height: POST_LIST_ITEM_FOOTER_HEIGHT
  },
  postInfo: {
    flex: 1,
    paddingRight: Metrics.baseMargin,
    justifyContent: 'space-between',
    paddingHorizontal: Metrics.doubleBaseMargin,
    paddingTop: Metrics.smallMargin
  },
  metaDataText: {
    color: Colors.text,
    fontWeight: '600',
    fontSize: 14,
    paddingBottom: 2
  },
  postImage: {
    width: POST_LIST_ITEM_HEADER_HIEGHT,
    height: POST_LIST_ITEM_HEADER_HIEGHT,
    borderRadius: 4,
    alignItems: 'flex-end'
  },
  loaderContainer: {
    height: 300
  },
  metaDataContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    paddingTop: Metrics.smallMargin,
    justifyContent: 'flex-end'
  },
  authorNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'nowrap',
    paddingTop: Metrics.smallMargin
  }
})
