import React, { PureComponent } from 'react'
import { Animated, StatusBar } from 'react-native'

import { hasNotch } from '../Themes/ApplicationStyles'
import { Colors } from '../Themes'

export const STATUS_BAR_HEIGHT_IOS = hasNotch ? 44 : 32

class CustomStatusBar extends PureComponent {
  animation = new Animated.Value(STATUS_BAR_HEIGHT_IOS)

  componentDidUpdate (prevProps) {
    const { statusBarHeight } = this.props
    const { animation } = this
    if (prevProps.statusBarHeight !== statusBarHeight) {
      if (statusBarHeight === 0) {
        animation.setValue(statusBarHeight)
      } else {
        Animated.spring(
          animation,
          {
            toValue: statusBarHeight,
            duration: 500
          }
        ).start()
      }
    }
  }

  render () {
    const { animation } = this
    const { theme } = this.props
    return (
      <Animated.View
        style={{
          height: animation,
          backgroundColor: Colors.banner
        }}
      >
        <StatusBar
          barStyle='light-content'
          hidden={false}
          showHideTransition='slide'
          translucent={false}
        />
      </Animated.View>
    )
  }
}

export default CustomStatusBar
