import React from 'react'
import { TouchableOpacity, View, Text } from 'react-native'
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'

import styles from './Styles/PostItemButtonsStyles'
import { Colors } from '../Themes'

const PostItemButtons = ({
  likesCount = 0,
  isLiked = false,
  onCommentIconPress,
  onLikesTextPress,
  onLikePress,
  commentsCount = 0,
  containerStyle = {},
  hideComments = false
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity
        style={[styles.iconContainer, styles.leftIcon, { flexDirection: 'row' }]}
        onPress={onLikePress}
      >
        <MCIcon
          size={22}
          color={Colors.banner}
          name={isLiked ? 'thumb-up' : 'thumb-up-outline'}
        />
      </TouchableOpacity>

      {likesCount ? (
        <TouchableOpacity onPress={onLikesTextPress}>
          <Text style={styles.countText}>
            {likesCount}
            &nbsp;
            {likesCount > 1 ? 'likes' : 'like'}
          </Text>
        </TouchableOpacity>
      ): null}

      <View style={styles.rightContainer}>
        <TouchableOpacity
          onPress={onCommentIconPress}
          style={[styles.iconContainer, styles.rightIcon, { flexDirection: 'row' }]}
        >
          {
            commentsCount ? (<Text style={styles.countText}>
              {commentsCount}
            </Text>) : null
          }
          <MCIcon size={21} color={Colors.banner} style={styles.rightIcon} name={'comment-outline'} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default PostItemButtons
