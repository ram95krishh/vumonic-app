import React, { Component, Fragment } from 'react'
import { ScrollView, KeyboardAvoidingView, View, Text, Keyboard, Platform } from 'react-native'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { get, debounce } from 'lodash'
import { NetworkConsumer } from 'react-native-offline'

import { operations as commentOperations } from '../../Redux/ducks/comments'

import Loader from '../../Components/Loader'
import CommentItem from '../../Components/Comments/CommentItem'
import CommentTextbox from '../../Components/Comments/CommentTextBox'
import NoNetwork from '../../Components/NoNetwork'
import DeferRender from '../../Components/DeferRender'

import { Metrics } from '../../Themes'
import styles, { COMMENT_TEXT_BOX_HEIGHT } from '../Styles/CommentScreenStyles'

const initialFooterHeight = Metrics.baseMargin + COMMENT_TEXT_BOX_HEIGHT

class CommentsScreen extends Component {
  constructor (props) {
    super(props)

    const { getParam } = props.navigation

    this.layout = []

    this.handleEndReachedDebounced = debounce(this.handleEndReached, 500)

    this.state = { autoScroll: null, footerHeight: initialFooterHeight }
  }

  componentDidMount () {
    this.fetchLatestComments()

    Keyboard.addListener('keyboardDidShow', this.handleKeyboardShow)
    Keyboard.addListener('keyboardDidHide', this.handleKeyboardHide)
  }

  componentWillUnmount () {
    Keyboard.removeListener('keyboardDidShow')
    Keyboard.removeListener('keyboardDidHide')
  }

  handleKeyboardShow = (e) => {
    this.keyboardHeight = get(e, 'endCoordinates.height') || 0
    this.setState({ footerHeight: initialFooterHeight + this.keyboardHeight })
  }

  handleKeyboardHide = () => {
    this.setState({ footerHeight: initialFooterHeight })
  }

  handleLayout = (e) => {
    const { comments } = this.props
    const { autoScroll } = this.state
    this.layout.push(e.nativeEvent.layout.y)
    if (this.layout.length === comments.length && !autoScroll) {
      this.setState({ autoScroll: 'begin' })
    }
  }

  fetchLatestComments = (isRefreshing = false) => {
    const { postId, getComments } = this.props
    getComments({
      postId,
      isRefreshing
    })
  }

  fetchMoreComments = () => {
    const { postId, comments, getMoreComments } = this.props

    getMoreComments({
      postId,
    })
  }

  handleRefresh = () => {
    this.fetchLatestComments(true)
  }

  renderItem = ({ item }) => {
    return (
      <CommentItem
        comment={item}
      />
    )
  }

  renderComments = () => {
    const { totalComments, comments = [], refreshing } = this.props
    if (totalComments < 1) {
      return (
        <ScrollView contentContainerStyle={styles.emptyContainer}>
          <Text style={styles.emptyText}>Be the first one to comment</Text>
        </ScrollView>
      )
    }
    return (
      <ScrollView
        keyboardShouldPersistTaps="handled"
        scrollEventThrottle={300}
        onScroll={this.handleScroll}
        style={{ backgroundColor: 'white' }}
      >
        {comments.map((item, index) => (
          <CommentItem
            key={`${index}`}
            comment={item}
            onLayout={this.handleLayout}
          />
        ))}
        {this.renderListFooter()}
      </ScrollView>
    )
  }

  handleEndReached = () => {
    const { comments } = this.props
    if (comments.length === 0) { return }
    this.fetchMoreComments()
  }

  handleScroll = ({ nativeEvent: { layoutMeasurement, contentOffset, contentSize } }) => {
    const endReached = layoutMeasurement.height + contentOffset.y >= contentSize.height - (Metrics.doubleBaseMargin * 2)

    if (endReached) {
      this.handleEndReachedDebounced()
    }
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

  render () {
    const { postId, loading, totalComments = 0, user, addComment } = this.props
    return (
      <DeferRender>
        <View style={styles.container}>
          <View style={styles.titleArea}>
            <Text style={styles.titleText}>Comments</Text>
          </View>
          {
            loading
            ? <Loader fullscreen />
            : (
                <Fragment>
                  <View style={{ flex: 1 }}>
                    <NetworkConsumer>
                      {({ isConnected }) => (
                        !isConnected
                          ? <NoNetwork showRefresh onRefresh={() => this.fetchLatestComments()}/>
                          : this.renderComments()
                      )}
                    </NetworkConsumer>
                    <KeyboardAvoidingView
                      enabled={Platform.OS==='ios'}
                      behavior="position"
                      keyboardVerticalOffset={
                        COMMENT_TEXT_BOX_HEIGHT + Metrics.doubleBaseMargin * 2
                      }
                    >
                      <CommentTextbox
                        addComment={addComment}
                        height={COMMENT_TEXT_BOX_HEIGHT}
                        postId={postId}
                        userAvatar={user.picture}
                      />
                    </KeyboardAvoidingView>
                  </View>
                </Fragment>
            )
          }
        </View>
      </DeferRender>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const postId = ownProps.navigation.getParam('postId')
  const totalComments = ownProps.navigation.getParam('totalComments')
  const {
    loading, refreshing, paginating, disablePagination
  } = ((state.comments && state.comments[postId]) || {})

  const comments = (state.comments[postId] && state.comments[postId].comments) || []

  return {
    postId,
    loading,
    refreshing,
    paginating,
    disablePagination,
    comments,
    totalComments,
    user: state.auth.userInfo
  }
}

const mapDispatchToProps = dispatch => ({
  getComments: commentOperations.getComments(dispatch),
  addComment: commentOperations.addComment(dispatch),
  getMoreComments: commentOperations.getMoreComments(dispatch)
})

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
)

export default enhance(CommentsScreen)
