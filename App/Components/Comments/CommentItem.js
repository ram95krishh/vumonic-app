import React from 'react'
import { View, Text } from 'react-native'
import FastImage from 'react-native-fast-image'

import { getTimeDifference } from '../../Helpers/timing' 
import styles from './Styles/CommentItemStyles'
import { fromPairs } from 'ramda'

const MAX_REPLIES = 3

const CommentItem = ({
  comment = { user: {}},
  onLayout,
  comment: { user }
}) => {
  const { firstName, lastName, picture } = user
  const { adding } = comment
  return (
    <View onLayout={onLayout} style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <FastImage
          style={styles.avatar}
          resizeMode={'cover'}
          source={{ uri: picture }}
        />
        <View style={styles.commentTextContainer}>
          <Text style={styles.commentText}>
            <Text style={styles.commenter}>{`${firstName} ${lastName}  `}</Text>
            {comment.body}
          </Text>
          {adding ? (
              <Text style={styles.dateInfo}>Adding....</Text>
            )
            : (
            <Text style={styles.dateInfo}>{getTimeDifference(comment.createdOn)}</Text>
          )}
        </View>
      </View>
    </View>
  )
}

export default CommentItem
