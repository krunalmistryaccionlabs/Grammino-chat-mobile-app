import { createStore, compose } from "redux";
import reducer from "../reducers/storageReducer";

export default function configureStore(initialState) {
  //prepare middleware to ensure redux can use it.
  const composeMiddleware = compose(
    ...(window.__REDUX_DEVTOOLS_EXTENSION__
      ? [window.__REDUX_DEVTOOLS_EXTENSION__()]
      : [])
  );
  const store = createStore(reducer, initialState, composeMiddleware);
  console.log("Store configured!");
  global.window.store = store;
  return store;
}
