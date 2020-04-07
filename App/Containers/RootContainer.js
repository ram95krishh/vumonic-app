import React, { Component } from 'react'
import { View, Platform, NativeModules } from 'react-native'
import { connect } from 'react-redux'

import { operations as startUpOperations } from '../Redux/ducks/startup'
import CustomStatusBar, { STATUS_BAR_HEIGHT_IOS } from '../Components/StatusBar'
import AppNavigation from '../Navigation/AppNavigation'
import styles from './Styles/RootContainerStyles'

const { StatusBarManager } = NativeModules;
const statusBarHeight = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;

class RootContainer extends Component {
  componentDidMount () {
    const { initStartUpTasks } = this.props;
    initStartUpTasks()
  }

  render () {
    return (
      <View style={styles.applicationView}>
        {Platform.OS==='ios' ? <CustomStatusBar statusBarHeight={statusBarHeight}/> : null}
        <AppNavigation />
      </View>
    )
  }
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  initStartUpTasks: startUpOperations.initStartUpTasks(dispatch)
})

export default connect(null, mapDispatchToProps)(RootContainer)
