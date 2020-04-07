import React, { Component, Fragment } from 'react';
import { ScrollView, View, Text } from 'react-native'
import { connect } from 'react-redux'
import { pathOr } from 'ramda'
import { debounce } from 'lodash'
import FastImage from 'react-native-fast-image'

import { operations as postOperations } from '../Redux/ducks/feed'
import DeferRender from '../Components/DeferRender'
import Loader from '../Components/Loader'
import styles from './Styles/LikesScreenStyles'

import { Metrics } from '../Themes'

const initialFooterHeight = Metrics.baseMargin

class LikesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { autoScroll: null, footerHeight: initialFooterHeight }
    this.handleEndReachedDebounced = debounce(this.handleEndReached, 500)
  }

  componentDidMount() {
    const { getLikes, postId } = this.props
    getLikes({
      postId,
      firstCall: true
    })
  }

  handleEndReached = () => {
    const { likes = [], getLikes, postId } = this.props
    if (likes.length === 0) { return }
    getLikes({ postId })
  }

  renderListFooter = () => {
    const { paginating } = this.props
    const { footerHeight } = this.state

    return (
      <Fragment>
        {paginating ? <Loader containerStyle={styles.paginationLoaderContainer} /> : null}
        <View style={{ height: footerHeight }} />
      </Fragment>
    )
  }

  handleScroll = ({ nativeEvent: { layoutMeasurement, contentOffset, contentSize } }) => {
    const endReached = layoutMeasurement.height + contentOffset.y >= contentSize.height - (Metrics.doubleBaseMargin * 2)

    if (endReached) {
      this.handleEndReachedDebounced()
    }
  }

  renderLikes (like) {
    const { totalLikes, likes = [] } = this.props
    if (totalLikes < 1) {
      return (
        <ScrollView contentContainerStyle={styles.emptyContainer}>
          <Text style={styles.emptyText}>Be the first to like this post ;)</Text>
        </ScrollView>
      )
    }
    return (
      <ScrollView
        scrollEventThrottle={300}
        onScroll={this.handleScroll}
        style={{ backgroundColor: 'white' }}
      >
        {likes.map((item, index) => (
          <View key={`${index}-${item.firstName}`} style={styles.containerArea}>
            <FastImage
              style={styles.avatar}
              resizeMode={'cover'}
              source={{ uri: item.picture }}
            />
            <Text style={styles.text}>
              {`${item.firstName} ${item.lastName}`}
            </Text>
          </View>
        ))}
        {this.renderListFooter()}
      </ScrollView>
    )
  }

  render() {
    const { totalLikes, loading } = this.props
    return (
      <DeferRender>
        <View style={styles.container}>
          <View style={styles.titleArea}>
            <Text style={styles.titleText}>{`Likes (${totalLikes})`}</Text>
          </View>
          { loading ? (
            <Loader fullscreen />
          ): this.renderLikes()
          }
        </View>
      </DeferRender>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const postId = ownProps.navigation.getParam('postId')
  const totalLikes = ownProps.navigation.getParam('totalLikes')
  return {
    postId,
    totalLikes,
    loading: pathOr(true, ['feed', 'likes', postId, 'loading'], state),
    paginating: pathOr(false, ['feed', 'likes', postId, 'paginating'], state),
    likes: pathOr([], ['feed', 'likes', postId, 'likes'], state)
  }
}

const mapDispatchToProps = dispatch => ({
  getLikes: postOperations.getLikes(dispatch)
})
 
export default connect(mapStateToProps, mapDispatchToProps)(LikesScreen)
