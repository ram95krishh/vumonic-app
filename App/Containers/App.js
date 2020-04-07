import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import NetInfo from '@react-native-community/netinfo'
import { NetworkProvider } from 'react-native-offline';

import '../Config'
import DebugConfig from '../Config/DebugConfig'
import RootContainer from './RootContainer'
import createStore from '../Redux'
import Loader from '../Components/Loader'

// create our store
const store = createStore()

class App extends Component {
  render () {
    return (
      <Provider store={store.store}>
        <PersistGate
          loading={<Loader fullscreen />}
          persistor={store.persistor}
        >
          <NetworkProvider>
            <RootContainer />
          </NetworkProvider>
        </PersistGate>
      </Provider>
    )
  }
}

// allow reactotron overlay for fast design in dev mode
export default DebugConfig.useReactotron
  ? console.tron.overlay(App)
  : App
