import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import './index.css';
import App from './App';
import store from './store/index';

// By linking below with store below we are providing the redux store
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
