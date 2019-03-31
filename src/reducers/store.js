import { compose, createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { fromJS } from 'immutable'

import rootReducer from 'reducers'
import rootSaga from 'sagas'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const sagaMiddleWare = createSagaMiddleware()

export default (initialState = fromJS({})) => {
  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(sagaMiddleWare)),
  )

  sagaMiddleWare.run(rootSaga)

  return store
}
