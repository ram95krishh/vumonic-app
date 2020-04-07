import React, { Component } from 'react'
import { View, Text, FlatList, TouchableWithoutFeedback } from 'react-native'
import { connect } from 'react-redux'
import { Placeholder, Fade } from 'rn-placeholder'
import { debounce } from 'lodash'

import { HomeTabContentPlaceholder } from '../../Components/HomePlaceholder'
import Loader from '../../Components/Loader'
import Header from '../../Components/Header'
import styles from '../Styles/HomeScreenStyles'
import PostListItem from '../../Components/PostListItem'
import { operations as feedOperations } from '../../Redux/ducks/feed'
import { Colors, Metrics } from '../../Themes'

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.loadMorePosts = this.loadMorePosts.bind(this)
    this.handleLoadMore = debounce(this.loadMorePosts, 300)
  }

  loadMorePosts() {
    const { data = [], getFeed } = this.props
    if (data.length === 100) {
      return
    } else {
      getFeed()
    }
  }

  componentDidMount () {
    const { getFeed } = this.props
    getFeed();
  }

  onLikesTextPress (post) {
    const { navigation } = this.props
    navigation.navigate('Likes', { postId: post.id, totalLikes: post.likesCount })
  }

  onCommentIconPress (post) {
    const { navigation } = this.props
    navigation.navigate('Comments', { postId: post.id, totalComments: post.commentsCount })
  }

  renderItem = ({ item, index }) => {
    const { isAuthenticated, onLoadMore, togglePostLike, userInfo } = this.props

    return (
      <PostListItem
        item={item}
        index={index}
        onCommentIconPress={() => this.onCommentIconPress(item)}
        onLikesTextPress={() => this.onLikesTextPress(item)}
        loadMorePosts={this.handleLoadMore}
        showPostListButtons={isAuthenticated}
        togglePostLike={togglePostLike}
      />
    )
  }

  getKey = (item, index) => {
    return `${item}-${index}`
  }

  renderPostList = () => {
    return (
      <View style={[styles.container, { backgroundColor: Colors.snow, paddingBottom: Metrics.doubleBaseMargin }]}>
        <FlatList
          renderItem={this.renderItem}
          onEndReached={this.loadMorePosts}
          onEndReachedThreshold={1}
          keyExtractor={this.getKey}
          initialNumToRender={8}
          maxToRenderPerBatch={4}
          updateCellsBatchingPeriod={500}
          {...this.props}
          ListFooterComponent={this.props.fetching && (
            <Loader containerStyle={styles.paginationLoaderContainer} />
          )}
        />
      </View>
    )
  }

  renderPlaceHolder = (isReady) => {
    if (isReady) {
      return this.renderPostList();
    }
    return (
      <Placeholder
        Animation={Fade}
      >
        <HomeTabContentPlaceholder />
      </Placeholder>
    )
  }

  render() {
    const { data = [], screenProps } = this.props
    const isReady = data.length > 0

    return (
      <View style={styles.container}>
        <Header onLeftIconPress={screenProps.toggleDrawer} />
          {this.renderPlaceHolder(isReady)}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  data: state.feed.posts,
  fetching: state.feed.fetching,
  userInfo: state.auth.userInfo
})

const mapDispatchToProps = (dispatch) => ({
  getFeed: feedOperations.getFeed(dispatch),
  togglePostLike: feedOperations.togglePostLike(dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
