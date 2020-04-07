import React, { Component } from 'react'
import { View, TextInput, TouchableOpacity, Text, Button } from 'react-native'
import { connect } from 'react-redux'
import FastImage from 'react-native-fast-image'
import { withNavigation } from 'react-navigation'

import { operations as authOperations } from '../../Redux/ducks/auth'
import { Images } from '../../Themes'
import styles from '../Styles/LoginScreenStyles';

class LoginScreen extends Component {
  constructor (props) {
    super(props);
    this.onSkipPress = this.onSkipPress.bind(this)
  }

  componentDidUpdate () {
    const { isAuthenticated, navigation } = this.props
    if (isAuthenticated) {
      navigation.navigate('Home')
    }
  }

  onSkipPress () {
    const { navigation } = this.props
    navigation.navigate('Home')
  }

  render() {
    const { login } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>
          Vumonic App
        </Text>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={login}
        >
          <FastImage
            style={{ height: 20, width: 20 }}
            source={Images.google}
          />
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={styles.title}>Login with Google</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onSkipPress}>
          <Text style={styles.buttonText}>
            {'<< Skip >>'}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
})

const mapDispatchToProps = (dispatch) => ({
  login: authOperations.login(dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(LoginScreen))
