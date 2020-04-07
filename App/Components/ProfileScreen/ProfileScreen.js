import React, { Component } from 'react'
import { View, Text } from 'react-native'
import FastImage from 'react-native-fast-image'
import { connect } from 'react-redux'
import { toTitleCase } from '../../Helpers/string'

import styles from '../Styles/ProfileScreenStyles'
import Icon from 'react-native-vector-icons/MaterialIcons'

class ProfileScreen extends Component {
  render () {
    const { userInfo } = this.props
    const { picture, firstName, lastName, email } = userInfo
    const name = `${firstName} ${lastName}`
  
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.profileContainer} >
          <View style={styles.KeyboardAvoidingViewArea}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatarArea}>
                <View style={styles.avatarBorder}>
                  <FastImage
                    style={styles.avatar}
                    source={{ uri: picture }}
                    resizeMode={'cover'}
                  />
                </View>
              </View>
            </View>
            <Text style={styles.fields}> Display Name </Text>
            <Text
              style={styles.textInput}
            >
              {toTitleCase(name)}
            </Text>
            <Text style={styles.fields}> Email </Text>
            <Text
              style={styles.textInput}
            >
              {email}
            </Text>
            <Text style={styles.fields}> Bio </Text>
            <Text style={styles.bioInput}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur
            </Text>
          </View>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.auth.userInfo
  }
}

export default connect(mapStateToProps, null)(ProfileScreen)
