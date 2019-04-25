import { createStore, applyMiddleware, compose } from "redux";
import { persistStore } from "redux-persist";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";

let store;

export default (rootReducer, rootSaga) => {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; //eslint-disable-line
  const sagaMiddleware = createSagaMiddleware();
  const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware));
  store = createStore(rootReducer, enhancer);
  sagaMiddleware.run(rootSaga);
  const persistor = persistStore(store);

  return { persistor, store };
};
