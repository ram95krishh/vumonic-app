import React, { PureComponent, Fragment } from 'react'
import { View, ScrollView } from 'react-native'
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { withNavigation } from 'react-navigation'
import { compose } from 'redux'
import { connect } from 'react-redux'

import ListItem from '../../Components/ListItem'
import styles from '../Styles/DrawerStyles'
import { Metrics, Colors } from '../../Themes'

class Drawer extends PureComponent {
  render () {
    const { isLoggedIn, userProfile, login, navigation, toggleDrawer } = this.props

    return (
      <Fragment>
        <ScrollView style={[styles.mainContainer, { backgroundColor: Colors.banner, borderRightColor: Colors.snow }]} scrollEnabled={false} scrollsToTop={false}>
            <View style={styles.settingOptionsContainer}>
            { isLoggedIn
                ? (
                  <ListItem
                    title={'Profile'}
                    leftIcon={() => <MCIcon name='account-circle' size={Metrics.icons.small} color={Colors.snow} />}
                    containerStyle={styles.listItem}
                    textStyle={styles.listItemText}
                    onPress={() => {
                      toggleDrawer()
                      navigation.navigate('Profile')
                    }}
                  />
                ) : (
                  <ListItem
                    title={'Login'}
                    leftIcon={() => <MCIcon name='login' size={Metrics.icons.small} color={Colors.snow} />}
                    containerStyle={styles.listItem}
                    textStyle={styles.listItemText}
                    onPress={() => {
                      toggleDrawer()
                      navigation.navigate('Login')
                    }}
                  />
                )
            }
            
            <ListItem
              title={'Feed'}
              leftIcon={() => <MCIcon name='view-list' size={Metrics.icons.small} color={Colors.snow} />}
              containerStyle={styles.listItem}
              textStyle={styles.listItemText}
              onPress={() => {
              toggleDrawer()
              navigation.navigate('Home')
                }}
            />
            <ListItem
              title={'About'}
              leftIcon={() => <MCIcon name='information' size={Metrics.icons.small} color={Colors.snow} />}
              containerStyle={styles.listItem}
              textStyle={styles.listItemText}
              onPress={() => {
              toggleDrawer()
              navigation.navigate('About')
              }}
            />
          </View>
        </ScrollView>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userProfile: state.auth.userInfo,
    isLoggedIn: state.auth.isAuthenticated
  }
}

const mapDispatchToProps = {
//   login: LoginActions.loginSaga
}

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withNavigation
)

export default enhance(Drawer)
