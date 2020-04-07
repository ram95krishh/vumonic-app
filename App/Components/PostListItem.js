import React, { Component, Fragment } from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withNavigation } from 'react-navigation'
import FastImage from 'react-native-fast-image'
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'

import { toTitleCase } from '../Helpers/string'
import { getTimeDifference } from '../Helpers/timing'

import styles from './Styles/PostListStyles'
import { Metrics, Colors } from '../Themes'
import PostItemButtons from './PostItemButtons'

class PostListItem extends Component {
  constructor (props) {
    super(props)
    this.onLikePress = this.onLikePress.bind(this)
  }

  onLikePress = () => {
    const { item, togglePostLike } = this.props
    togglePostLike({
      postId: item.id,
      like: !item.isLiked
    });
  }

  renderItem = () => {
    const { item } = this.props
    const { author: { firstName, lastName }} = item
    const thumbnail = `https://picsum.photos/id/${item.id}/900/1600`
    const authorName = `${firstName} ${lastName}`
  
    const metaData = (
      <View style={styles.metaDataContainer}>
        <Text style={styles.metaDataText}>
          {getTimeDifference(item.publishedDate)}
        </Text>
      </View>
    )

    return (
      <View style={{ flex: 1 }}>
        <Fragment>
          {metaData}
          <View style={{ flex: 1, flexDirection: 'row', paddingBottom: Metrics.baseMargin }}>
            { !!thumbnail &&
              <FastImage
                style={styles.postImage}
                source={{ uri: thumbnail }}
                resizeMode={'cover'}
              />
            }
            <View style={styles.postInfo
            }>
              <Text style={{ color: Colors.text, fontWeight: '600', fontSize: 14 }} numberOfLines={3}>{toTitleCase(item.title)}</Text>
            </View>
          </View>
          <View style={styles.authorNameContainer}>
            <MCIcon name="pen" color={Colors.text} size={15} style={{ paddingRight: Metrics.baseMargin }} />
            <Text style={[styles.metaDataText, { paddingRight: Metrics.smallMargin }]}>{authorName}</Text>
          </View>
        </Fragment>
      </View>
    )
  }

  render () {
    const { item = {}, showPostListButtons, onCommentIconPress, onLikesTextPress } = this.props
    const { commentsCount, likesCount, isLiked } = item

    return (
      <View style={styles.itemContainer}>
        {
          this.renderItem()
        }
        {
          showPostListButtons ? (
            <PostItemButtons
              isLiked={isLiked}
              likesCount={likesCount}
              onLikesTextPress={onLikesTextPress}
              onLikePress={this.onLikePress}
              onCommentIconPress={onCommentIconPress}
              commentsCount={commentsCount}
              containerStyle={[
                styles.itemFooterContainer,
                {
                  borderColor: Colors.secondaryBackground
                }
              ]}
            />
          ): null
        }
      </View>
    )
  }
}

// const mapDispatchToProps = {
  
// }

const enhance = compose(
//   connect(null, mapDispatchToProps),
  withNavigation
)

export default enhance(PostListItem)
