import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from './Redux/store'
import { BrowserRouter as Router } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import { createBrowserHistory } from 'history';
import reportWebVitals from './reportWebVitals';

import './index.css';

const history = createBrowserHistory();

ReactDOM.render(
    <Router history={history}>
        <Provider store={store}>
            <React.StrictMode>
                <CookiesProvider>
                <App/>
                </CookiesProvider>
            </React.StrictMode>
        </Provider>
    </Router>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
