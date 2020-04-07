import React, { Component } from 'react'
import { View, Image, StyleSheet, Dimensions, Text } from 'react-native'
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  ShineOverlay,
} from 'rn-placeholder';

import { Images, Metrics, Colors } from '../Themes'
import Header from './Header'

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.white
  },
  tabHeader: {
    height: 50,
    borderBottomWidth: 1,
    borderColor: Colors.lightGrey
  },
  row: {
    flexDirection: 'row',
    paddingTop: Metrics.doubleBaseMargin,
    paddingHorizontal: Metrics.doubleBaseMargin
  },
  smartMenu: {
    width: width / 3,
    backgroundColor: Colors.lightGrey,
    marginRight: Metrics.doubleBaseMargin,
    borderRadius: 4,
    height: 35
  },
  carousal: {
    width: 300,
    height: 120,
    backgroundColor: Colors.lightGrey,
    paddingHorizontal: Metrics.baseMargin,
    borderRadius: 4
  },
  postsContainer: {
    marginTop: 20
  },
  postContainer: {
    marginHorizontal: Metrics.doubleBaseMargin,
    marginBottom: Metrics.doubleBaseMargin,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  postTextContainer: {
    marginTop: 6
  },
  postText: {
    borderRadius: 4,
    backgroundColor: Colors.lightGrey,
    height: 20,
    width: width - 120,
    marginBottom: 20 / 3
  },
  postImage: {
    backgroundColor: Colors.lightGrey,
    width: 80,
    height: 80,
    borderRadius: 4
  },
  card: {
    backgroundColor: Colors.snow,
    borderRadius: 3,
    elevation: 3,
    marginBottom: 12,
    padding: 20
  }
})

const Card = ({ children, style, ...props }) => (
  <View style={[styles.card, style]} {...props}>
    {children}
  </View>
);

export const PostPlaceholder = () => {
  const stripeStyle = { backgroundColor: Colors.banner }
  return (
    <Card>
      <Placeholder
        Left={PlaceholderMedia}
        Animation={ShineOverlay}>
        <Placeholder
          Animation={ShineOverlay}
          Right={() => <PlaceholderLine width={30} />}
        />
        <PlaceholderLine />
        <PlaceholderLine width={80} />
        <PlaceholderLine width={30} />
      </Placeholder>
    </Card>
  )
}

export const HomeTabContentPlaceholder = () => {
  const stripeStyle = { backgroundColor: Colors.banner }
  return (
    <View style={{ backgroundColor: Colors.snow }}>
      <View style={styles.postsContainer}>
        <PostPlaceholder />
        <PostPlaceholder />
        <PostPlaceholder />
        <PostPlaceholder />
        <PostPlaceholder />
        <PostPlaceholder />
        <PostPlaceholder />
      </View>
    </View>
  )
}

class HomePlaceholder extends Component {
  render () {
    return (
      <View style={[styles.mainContainer, { backgroundColor: Colors.snow }]}>
        <View style={styles.tabHeader} />
        <HomeTabContentPlaceholder />
      </View>
    )
  }
}

export default HomePlaceholder
