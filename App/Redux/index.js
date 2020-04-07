import { persistReducer } from 'redux-persist'
import configureStore from './CreateStore'
import ReduxPersist from '../Config/ReduxPersist'
import { reducers, sagas } from './ducks'

/* ------------- Assemble The Reducers ------------- */

export default () => {
  let finalReducers = reducers
  // If rehydration is on use persistReducer otherwise default combineReducers
  if (ReduxPersist.active) {
    const persistConfig = ReduxPersist.storeConfig
    finalReducers = persistReducer(persistConfig, reducers)
  }

  let { store, sagasManager, sagaMiddleware, persistor } = configureStore(finalReducers, sagas)

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./').reducers
      store.replaceReducer(nextRootReducer)

      const newYieldedSagas = require('./ducks/sagas').default
      sagasManager.cancel()
      sagasManager.done.then(() => {
        sagasManager = sagaMiddleware(newYieldedSagas)
      })
    })
  }

  return { store, persistor }
}
