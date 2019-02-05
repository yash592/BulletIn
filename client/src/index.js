import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Router } from 'react-router-dom';

import { mainRoutes } from './routes';

const routes = mainRoutes();


ReactDOM.render(
  routes, document.getElementById('root'));
registerServiceWorker();
