import { compose, createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { fromJS } from 'immutable'

// Router
import { routerMiddleware } from 'connected-react-router'
import history from 'utils/history'

import rootReducer from 'reducers'
import rootSaga from 'sagas'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const sagaMiddleWare = createSagaMiddleware()

export default (initialState = fromJS({})) => {
  const store = createStore(
    rootReducer,
    initialState,
    sagaMiddleWare
      ? composeEnhancers(
          applyMiddleware(routerMiddleware(history), sagaMiddleWare),
        )
      : undefined,
  )

  sagaMiddleWare && sagaMiddleWare.run(rootSaga)

  return store
}
