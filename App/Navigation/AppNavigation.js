import React, { Component } from 'react';
import { Text, View } from 'react-native'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import InitialLoadingScreen from '../Containers/InitialLoadingScreen'
import LoginScreen from '../Containers/LoginScreen'
import ProfileScreen from '../Components/ProfileScreen'
import HomeScreen from '../Containers/HomeScreen'
import CommentsScreen from '../Containers/CommentsScreen'
import LikesScreen from '../Containers/LikesScreen'
import About from '../Containers/About'
import withDrawer from '../Components/withDrawer'

import styles from './Styles/NavigationStyles'

const MainTabNavigation = createSwitchNavigator(
  {
    Home: HomeScreen
  }, {
      headerMode: 'none',
      initialRouteName: 'Home',
      navigationOptions: {
        headerStyle: styles.header
    }
  })

  class CustomTabNavigator extends Component {
    static router = MainTabNavigation.router;
    render () {
      const { navigation, toggleDrawer } = this.props
      return <MainTabNavigation navigation={navigation} screenProps={{ toggleDrawer }}/>
    }
  }

  const DrawerNavigator = withDrawer(CustomTabNavigator)

// Manifest of possible screens
const AppNav = createStackNavigator({
  Home: DrawerNavigator,
  Profile: ProfileScreen,
  Comments: CommentsScreen,
  Likes: LikesScreen,
  About: About
}, {
  headerMode: 'none',
  initialRouteName: 'Home',
  navigationOptions: {
    headerStyle: styles.header
  }
})

const PrimaryNav = createSwitchNavigator({
  InitialLoading: InitialLoadingScreen,
  App: AppNav,
  Login: LoginScreen,
}, {
  headerMode: 'none',
  initialRouteName: 'InitialLoading',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default createAppContainer(PrimaryNav)
