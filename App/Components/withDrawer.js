import React, { Component } from 'react'
import SideMenu from 'react-native-side-menu'
import hoistNonReactStatic from 'hoist-non-react-statics'

import Drawer from '../Containers/Drawer'
import { Metrics } from '../Themes'

const withDrawer = (ContainerComponent) => {
  class Menu extends Component {
    state = {
      isDrawerOpen: false
    }

    toggleDrawer = () => {
      this.setState(
        (prevState) => ({ isDrawerOpen: !prevState.isDrawerOpen })
      )
    }

    onChange = (drawerState) => {
      const { isDrawerOpen } = this.state
      if (isDrawerOpen !== drawerState) {
        this.setState({ isDrawerOpen: drawerState })
      }
    }

    render () {
      const { isDrawerOpen } = this.state

      return (
        <SideMenu
          isOpen={isDrawerOpen}
          menu={<Drawer toggleDrawer={this.toggleDrawer}/>}
          edgeHitWidth={100}
          bounceBackOnOverdraw={false}
          openMenuOffset={Metrics.screenWidth * (4 / 5)}
          onChange={this.onChange}
        >
          <ContainerComponent {...this.props} toggleDrawer={this.toggleDrawer}/>
        </SideMenu>
      )
    }
  }
  hoistNonReactStatic(Menu, ContainerComponent)
  return Menu
}

export default withDrawer
