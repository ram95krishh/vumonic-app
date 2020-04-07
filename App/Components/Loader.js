import React from 'react'
import { View } from 'react-native'
import Spinner from 'react-native-spinkit'

import { Colors } from '../Themes'

const Loader = ({ fullscreen, color = Colors.ember, containerStyle, ...props }) => {
  let containerStyles = fullscreen ? { flex: 1, alignItems: 'center', justifyContent: 'center' } : containerStyle
  containerStyle = [containerStyles, { backgroundColor: 'white' }]

  return (
    <View style={containerStyles}>
      <Spinner color="#1ab394" type="Arc" size={fullscreen ? 50 : 30} {...props} />
    </View>
  )
}

export default Loader
