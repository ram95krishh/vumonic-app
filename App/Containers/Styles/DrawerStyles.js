import { StyleSheet } from 'react-native'

import { Metrics, Fonts, ApplicationStyles, Colors } from '../../Themes'

const styles = StyleSheet.create({
  ...ApplicationStyles.screen,
  mainContainer: {
    flex: 1,
    borderRightWidth: 1
  },
  settingOptionsContainer: {
    paddingHorizontal: Metrics.marginHorizontal
  },
  menuImage: {
    width: Metrics.icons.small,
    height: Metrics.icons.small,
    marginTop: 1
  },
  listItem: {
    flexDirection: 'row',
    paddingVertical: Metrics.marginVertical
  },
  listItemText: {
    flex: 1,
    fontSize: Fonts.size.input,
    marginLeft: 12,
    fontWeight: '400',
    color: Colors.snow
  },
  profileHeader: {
    padding: Metrics.doubleBaseMargin
  },
  bottomListItem: {
    paddingBottom: 30,
    paddingLeft: Metrics.doubleBaseMargin
  }
})

export default styles
