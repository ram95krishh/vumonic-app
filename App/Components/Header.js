import React from 'react'
import { TouchableOpacity, View, Image } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { connect } from 'react-redux'

import styles from './Styles/HeaderStyles'
import { Colors } from '../Themes'

const USER_PLACEHOLDER_IMAGE = "https://www.materialui.co/materialIcons/action/account_circle_white_192x192.png"

const Header = ({ onLeftIconPress, userProfile = {}, ...props }) => {
  const { picture: avatar } = userProfile

  return (
    <View style={[{ ...styles.header, ...styles.shadowBottom }, { backgroundColor: Colors.banner }]} >
      <TouchableOpacity style={styles.headerLogoHolder} onPress={onLeftIconPress}>
        {
          avatar
          ? <Image source={{ uri: avatar || USER_PLACEHOLDER_IMAGE }} style={styles.headerLogo} resizeMode={'cover'}/>
          : <Icon name={'account-circle'} size={36} color={Colors.snow}/>
        }
      </TouchableOpacity>
    </View>
  )
}

const mapStateToProps = state => ({
  userProfile: state.auth.userInfo
})

export default connect(mapStateToProps)(Header)
