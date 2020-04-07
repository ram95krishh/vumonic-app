import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

import { Colors, Metrics, Fonts } from '../Themes'
import { LIST_ITEM_MIN_HEIGHT } from '../Themes/ApplicationStyles'

const ListItem = ({
  title,
  onPress,
  leftIcon,
  rightIcon,
  centerElement,
  touchable = true,
  textStyle = {},
  containerStyle = {}
}) => {
  const Parent = touchable === false ? View : TouchableOpacity
  return (
    <Parent
      style={StyleSheet.flatten([styles.container, containerStyle])}
      onPress={onPress}
    >
      { typeof leftIcon === 'function' && (
        <View style={styles.leftIcon}>
          {leftIcon()}
        </View>
      ) }

      { typeof centerElement === 'function' ? (
        <View style={{ flex: 1 }}>
          {centerElement()}
        </View>
      ) : <Text style={textStyle}>{title}</Text>}

      { typeof rightIcon === 'function' && (
        <View style={styles.rightIcon}>
          {rightIcon()}
        </View>
      )}
    </Parent>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Metrics.marginVertical,
    minHeight: LIST_ITEM_MIN_HEIGHT,
    color: Colors.text,
  },
  title: {
    flex: 1,
    color: Colors.text,
    fontSize: Fonts.size.regular
  },
  leftIcon: {
    marginRight: Metrics.baseMargin
  },
  rightIcon: {
    paddingRight: Metrics.doubleBaseMargin,
    flex: 1,
    alignItems: 'flex-end'
  }
})

export default ListItem
