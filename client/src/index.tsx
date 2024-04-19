
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import Store from './store/store';

const store = new Store();

export const Context = React.createContext({
  store,
});

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <Context.Provider value={{ store }}>
      <App />
    </Context.Provider>
  );
} else {
  throw new Error('Root element not found');
}