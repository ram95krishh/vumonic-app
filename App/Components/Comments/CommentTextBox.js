import React, { PureComponent, createRef, Fragment } from 'react'
import { View, Text, TextInput, TouchableOpacity, Keyboard } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import FastImage from 'react-native-fast-image'
import uuid from 'uuid'
import { NetworkConsumer } from 'react-native-offline'
import get from 'lodash/get'

import { Metrics, Colors } from '../../Themes'
import styles from './Styles/CommentTextBoxStyles'

const getAvatarStyles = (dimension) => {
  return {
    height: dimension,
    width: dimension,
    borderRadius: dimension / 2,
    marginLeft: Metrics.baseMargin
  }
}

class CommentTextbox extends PureComponent {
  inputRef = createRef()
  isFocused = false
  state = {
    height: this.props.height,
    inputText: ''
  }

  avatarStyles = getAvatarStyles(this.props.height / 2)

  componentDidMount () {
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.toggleSubmitHide)
  }

  componentDidUpdate (prevProps) {
    const { showKeyBoard } = this.props
    const input = this.inputRef.current

    if (showKeyBoard) {
      input.focus()
    }
  }

  componentWillUnmount () {
    this.keyboardDidHideListener.remove()
  }

  resetInputText = (text = '') => {
    this.setState({ inputText: text })
    this.inputRef.current.setNativeProps({ text })
  }

  handleCommentSubmit = () => {
    const { inputText } = this.state
    const {
      postId,
      addComment,
    } = this.props

    const successCallback = () => {
      this.resetInputText('')
      Keyboard.dismiss()
    }

    addComment({
      postId,
      inputText,
      successCallback
    })
  }

  handleChangeText = (inputText) => {
    const { hideSubmit = true } = this.state
    this.setState({ inputText })
    if (hideSubmit && inputText.trim()) {
      this.toggleSubmitHide()
    }
    if (!hideSubmit && !inputText.trim()) {
      this.toggleSubmitHide()
    }
  }

  toggleSubmitHide = () => {
    const { onKeyboardDismiss } = this.props
    const { hideSubmit, inputText } = this.state

    this.setState({ hideSubmit: !hideSubmit && !inputText.length })
    if (onKeyboardDismiss) {
      onKeyboardDismiss()
    }
  }

  handleFocus = () => {
    this.isFocused = true
    this.toggleSubmitHide()
  }

  handleBlur = () => {
    this.isFocused = false
  }

  render () {
    const { height, hideSubmit } = this.state
    const {
      containerStyle = {},
      onCommentPress,
      userAvatar
    } = this.props

    return (
      <View style={containerStyle}>
        <View style={[styles.container, { height }]}>
          <NetworkConsumer>
          {({ isConnected }) => (
            <Fragment>
              <View style={styles.avatarContainer}>
                <FastImage
                  style={this.avatarStyles}
                  source={{ uri: userAvatar }}
                  resizeMode="cover"
                />
              </View>
              <TextInput
                blurOnSubmit
                multiline
                numberOfLines={3}
                maxHeight={60}
                style={styles.textBox}
                placeholder={'Say something'}
                placeholderTextColor={Colors.banner}
                editable={isConnected}
                ref={this.inputRef}
                onChangeText={this.handleChangeText}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                onEndEditing={this.toggleSubmitHide}
              />
              {
                hideSubmit
                ? null
                : (
                  <TouchableOpacity
                    style={styles.postButton}
                    onPress={this.handleCommentSubmit}
                  >
                    <Text style={styles.postText}>Post</Text>
                  </TouchableOpacity>
                )
              }
            </Fragment>
            )}
          </NetworkConsumer>
        </View>
      </View>
    )
  }
}

CommentTextbox.defaultProps = {
  containerStyle: {}
}

export default CommentTextbox
