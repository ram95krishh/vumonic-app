import React, { memo } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { Colors, Fonts, Metrics } from '../Themes'

const styles = StyleSheet.create({
  contanier: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: 'auto'
  },
  text: {
    color: Colors.primaryText,
    fontSize: Fonts.size.input,
    paddingBottom: Metrics.baseMargin
  },
  button: {
    alignItems: 'center',
    backgroundColor: Colors.red,
    padding: Metrics.baseMargin,
    borderRadius: Metrics.borderRadius
  },
  buttonText: {
    color: Colors.white
  },
})

const NoNetwork = ({ showRefresh = false, title, onRefresh, containerStyle = {}, theme }) => {
  return (
    <View style={[styles.contanier, containerStyle]}>
      <Icon name={'cloud-off'} color={Colors.grey} size={Metrics.icons.xl}/>
      <Text style={styles.text}>{title || OFFLINE_TITLE}</Text>
      { showRefresh &&
        <TouchableOpacity
          style={styles.button}
          onPress={onRefresh}
        >
          <Text style={styles.buttonText}>Try Again</Text>
        </TouchableOpacity>
      }
    </View>
  )
}

export default memo(NoNetwork)
