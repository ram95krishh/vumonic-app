import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'
import { offlineActionTypes } from 'react-native-offline'

import Loader from '../Components/Loader'

class InitialLoadingScreen extends Component {
  constructor (props) {
    super(props)
    props.setNetworkToOffline()
  }

  componentDidMount () {
    const { isAuthenticated, navigation } = this.props

    if (isAuthenticated) {
      setTimeout(() => navigation.navigate('App'), 1000);
    } else {
      setTimeout(() => navigation.navigate('Login'), 1000);
    }
  }

  render () {
    return <Loader fullscreen />
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
})

const mapDispatchToProps = (dispatch) => ({
  setNetworkToOffline: () => dispatch({ type: offlineActionTypes.CONNECTION_CHANGE, payload: false })
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(InitialLoadingScreen))
