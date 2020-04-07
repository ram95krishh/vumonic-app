import { StyleSheet } from 'react-native'
import { Metrics, Fonts, Colors } from '../../../Themes'

export const AVATAR_DIMENSIONS = 40

const styles = StyleSheet.create({
  container: {
    margin: Metrics.doubleBaseMargin,
    marginBottom: 0
  },
  avatar: {
    overflow: 'hidden',
    width: AVATAR_DIMENSIONS,
    height: AVATAR_DIMENSIONS,
    borderRadius: AVATAR_DIMENSIONS / 2
  },
  commentTextContainer: {
    marginTop: -1,
    marginLeft: Metrics.baseMargin,
    marginRight: Metrics.doubleBaseMargin * 2
  },
  commentText: {
    paddingRight: Metrics.doubleBaseMargin,
    lineHeight: 21,
  },
  commenter: {
    fontWeight: '500'
  },
  dateInfo: {
    color: Colors.text,
    alignItems: 'center',
    fontSize: Fonts.size.small,
    paddingTop: Metrics.smallMargin
  },
  commentFooterContainer: {
    flexDirection: 'row',
    marginTop: Metrics.baseMargin,
    marginLeft: Metrics.baseMargin
  },
  replyText: {
    fontSize: Fonts.size.small,
    color: Colors.secondaryText
  },
  repliesContainer: {
    width: Metrics.screenWidth - Metrics.baseMargin - AVATAR_DIMENSIONS
  },
  mentionText: {
    fontWeight: 'normal',
    color: Colors.secondaryText
  }
})

export default styles
