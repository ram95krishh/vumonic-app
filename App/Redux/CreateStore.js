import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore } from 'redux-persist'
import createSagaMiddleware from 'redux-saga'
import {
  createNetworkMiddleware,
  offlineActionTypes,
  checkInternetConnection
} from 'react-native-offline';

import Reactotron from '../Config/ReactotronConfig'
import Rehydration from '../Services/Rehydration'
import ReduxPersist from '../Config/ReduxPersist'
import Config from '../Config/DebugConfig'
// creates the store
export default (rootReducer, rootSaga) => {
  /* ------------- Redux Configuration ------------- */

  const middleware = []
  const enhancers = []

  /* ---------- Network Middleware -------------- */
  // const networkMiddleware = createNetworkMiddleware({
  //   regexActionType: /(FETCH|GET)/,
  //   actionTypes: [],
  //   queueReleaseThrottle: 200
  // })
  // middleware.push(networkMiddleware)

  /* ------------- Saga Middleware ------------- */

  const sagaMonitor = Config.useReactotron ? console.tron.createSagaMonitor() : null
  const sagaMiddleware = createSagaMiddleware({ sagaMonitor })
  middleware.push(sagaMiddleware)

  /* ------------- Assemble Middleware ------------- */

  enhancers.push(applyMiddleware(...middleware))

  // if Reactotron is enabled (default for __DEV__), we'll create the store through Reactotron
  const createAppropriateStore = createStore
  if (Config.useReactotron) {
    enhancers.push(Reactotron.createEnhancer())
  }
  const store = createAppropriateStore(rootReducer, compose(...enhancers))

  // configure persistStore and check reducer version number
  if (ReduxPersist.active) {
    Rehydration.updateReducers(store)
  }

  // kick off root saga
  const sagasManager = sagaMiddleware.run(rootSaga)

  // https://github.com/rt2zz/redux-persist#persiststorestore-config-callback
  const persistor = persistStore(store, null, () => {
    checkInternetConnection().then(isConnected => {
      store.dispatch({
        type: offlineActionTypes.CONNECTION_CHANGE,
        payload: isConnected,
      });
    });
  })

  return {
    store,
    sagasManager,
    sagaMiddleware,
    persistor
  }
}
