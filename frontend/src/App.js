import React from 'react';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import routes from './routes';
import { Provider } from 'react-redux';
import './App.css';
import store from './store';

const AppWrapper = () => {
  const routing = useRoutes(routes);

  return routing;
};

const App = () => (
  <Provider store={store}>
    <Router>
      <ThemeProvider>
        <AppWrapper />
      </ThemeProvider>
    </Router>
  </Provider>
);

export default App;
