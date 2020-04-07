import { StyleSheet } from 'react-native'
import { Metrics, Colors } from '../../../Themes'

const styles = StyleSheet.create({
  container: {
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: Colors.text,
    borderWidth: 2,
    borderRadius: Metrics.doubleBaseMargin,
    marginBottom: Metrics.doubleBaseMargin,
    marginRight: Metrics.smallMargin,
    marginLeft: Metrics.smallMargin,
    backgroundColor: Colors.snow
  },
  textBox: {
    flex: 1,
    paddingHorizontal: Metrics.doubleBaseMargin,
    maxHeight: 60,
    maxHeight: 60,
    overflow: 'hidden'
  },
  postButton: {
    height: '100%',
    justifyContent: 'center',
    paddingHorizontal: Metrics.doubleBaseMargin
  },
  postText: {
    color: Colors.banner
  },
  avatarContainer: {
    height: '100%',
    justifyContent: 'center'
  }
})

export default styles
