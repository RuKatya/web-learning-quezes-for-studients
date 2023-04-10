import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import RouterPage from './Router/RouterPage';
import "./style/index.scss"

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterPage />
    </Provider>
  </React.StrictMode>
);