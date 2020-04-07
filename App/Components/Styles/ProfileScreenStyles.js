import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Metrics, Fonts } from '../../Themes'

const AVATAR_DIMENSIONS = Metrics.screenHeight * 0.15

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  profileContainer: {
    flex: 1,
    padding: Metrics.baseMargin,
    height: '80%',
    alignItems: 'center'
  },
  shadowBottom: {
    shadowOffset: { width: 0, height: 1 },
    shadowColor: 'black',
    shadowOpacity: 0.4,
    backgroundColor: '#fff',
    elevation: 3,
    zIndex: 10
  },
  avatarContainer: {
    height: '30%'
  },
  fields: {
    color: Colors.banner,
    marginTop: Metrics.doubleBaseMargin,
    fontSize: 14,
    fontWeight: '600'
  },
  saveButton: {
    justifyContent: 'center',
    marginRight: Metrics.baseMargin,
    padding: Metrics.baseMargin,
    backgroundColor: Colors.secondaryGrey,
    borderRadius: 20
  },
  uploadIcon: {
    borderRadius: 10,
    backgroundColor: Colors.white
  },
  uploadTextArea: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  uploadTextBox: {
    borderRadius: 100,
    backgroundColor: Colors.grey,
    width: 100,
    padding: Metrics.baseMargin
  },
  uploadText: {
    textAlign: 'center',
    fontSize: Fonts.size.small10
  },
  uploadChip: {
    position: 'absolute',
    top: -25,
    left: 25,
    borderRadius: 10
  },
  avatarArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatar: {
    padding: Metrics.baseMargin,
    height: AVATAR_DIMENSIONS,
    width: AVATAR_DIMENSIONS,
    borderRadius: (AVATAR_DIMENSIONS / 2),
    backgroundColor: 'white'
  },
  avatarBorder: {
    borderRadius: AVATAR_DIMENSIONS / 2 + 10,
    borderColor: Colors.banner,
    padding: 2,
    borderWidth: 2
  },
  bioInput: {
    marginVertical: Metrics.baseMargin,
    backgroundColor: Colors.banner,
    borderRadius: Metrics.baseMargin,
    padding: Metrics.baseMargin,
    height: 200,
    overflow: 'scroll',
    width: 300
  },
  textInput: {
    marginVertical: Metrics.baseMargin,
    backgroundColor: Colors.banner,
    borderRadius: Metrics.baseMargin,
    padding: Metrics.baseMargin,
    overflow: 'scroll',
    width: 300
  }
})
