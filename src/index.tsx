import React from 'react';
import ReactDom from 'react-dom';
import App from './components/app';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import ErrorBoundry from './components/error-boundry';
import store from './store';

import './index.css';



ReactDom.render(
    <Provider store={store}>
        <ErrorBoundry>
            <Router>
                <App />
            </Router>
        </ErrorBoundry>
    </Provider>, document.getElementById('root')
);
