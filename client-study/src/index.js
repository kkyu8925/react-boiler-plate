import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import 'antd/dist/antd.css';
import { applyMiddleware , createStore} from 'redux';
import PromiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import Reducer from './_reducers';

// 원래 store은 객체만 받기때문에 promise,thunk 추가
const createStoreWithMiddleware = applyMiddleware(PromiseMiddleware, ReduxThunk)(createStore);

ReactDOM.render(
  <Provider 
    store={createStoreWithMiddleware(Reducer,
      // redux 구글 extension 추가
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__() 
      )}
  >
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
  ,document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
