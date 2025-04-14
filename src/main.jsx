import React from 'react';
import ReactDOM from 'react-dom/client';
import ClientView  from './home/components/client/clientView';

import  AppRouter  from './router/AppRouter';
import { BrowserRouter } from 'react-router-dom';
import './styles.css';
import { Provider } from 'react-redux';
import { store } from './store/store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
      <AppRouter />
      
    </Provider>
    </BrowserRouter>
  </React.StrictMode>
)
