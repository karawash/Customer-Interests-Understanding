import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './Login/handlers/_helpers';
import { App } from './App';

// setup fake backend
import { configureFakeBackend } from './Login/handlers/_helpers';
configureFakeBackend();

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);