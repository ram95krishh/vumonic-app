import { StyleSheet, Platform } from 'react-native'
import { ApplicationStyles, Colors, Metrics } from '../../Themes'
import { HEADER_HEIGHT } from '../../Themes/ApplicationStyles'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  headerHolder: {
    flex: 1,
    backgroundColor: Colors.background
  },
  header: {
    height: HEADER_HEIGHT,
    paddingHorizontal: Metrics.marginHorizontal,
    paddingVertical: Metrics.marginVertical,
    flexDirection: 'row',
    backgroundColor: Colors.white
  },
  shadowBottom: {
    shadowOffset: { width: 0, height: 1 },
    shadowColor: 'black',
    shadowOpacity: 0.4,
    backgroundColor: '#fff',
    elevation: 3,
    zIndex: 10
  },
  titleHeader: {
    height: HEADER_HEIGHT,
    flexDirection: 'row',
    paddingHorizontal: 0,
    paddingVertical: 4,
    justifyContent: 'space-between',
    backgroundColor: Colors.white
  },
  animatedHeader: {
    height: HEADER_HEIGHT,
    flexDirection: 'row',
    paddingHorizontal: 0,
    paddingVertical: 4,
    justifyContent: 'space-between'
  },
  translucentHeader: {
    height: HEADER_HEIGHT,
    backgroundColor: Colors.transparent
  },
  box: {
    zIndex: 999,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  backIcon: {
    borderBottomRightRadius: 100,
    backgroundColor: Colors.white,
    padding: Metrics.baseMargin
  },
  tabHeader: {
    height: HEADER_HEIGHT,
    paddingHorizontal: Metrics.marginHorizontal,
    paddingVertical: Metrics.marginVertical,
    flexDirection: 'row'
  },
  headerTitleContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    flex: 1,
    height: HEADER_HEIGHT,
    alignItems: 'center',
    marginTop: Metrics.baseMargin,
    ...Platform.select({
      android: {
        alignItems: 'flex-start',
        left: 48
      }
    })
  },
  titleBackButtonHidden: {
    ...Platform.select({
      android: {
        alignItems: 'flex-start',
        left: Metrics.doubleBaseMargin
      }
    })
  },
  titleText: {
    fontSize: 18,
    color: Colors.primaryText,
    width: '60%',
    fontWeight: '500',
    marginTop: 3,
    textAlign: 'center',
    ...Platform.select({
      android: {
        textAlign: 'left',
        width: '75%'
      }
    })
  },
  headerLogoHolder: {
    flex: 1,
    flexDirection: 'row',
  },
  headerLogo: {
    width: Metrics.screenHeight * 0.04,
    height: Metrics.screenHeight * 0.04,
    borderRadius:  Metrics.screenHeight * 0.02,
    padding: 2,
    margin: 2,
    borderWidth: 2,
    borderColor: Colors.snow,
    overflow: 'hidden'
  },
  headerBackIcon: {
    marginRight: Metrics.marginHorizontal,
    alignItems: 'flex-start'
  },
  headerText: {
    flex: 1,
    fontSize: 18
  },
  headerIconRight: {
    paddingHorizontal: Metrics.doubleBaseMargin,
    marginRight: -Metrics.doubleBaseMargin,
    alignItems: 'flex-end'
  },
  tabUnderline: {
    backgroundColor: Colors.red
  }
})
