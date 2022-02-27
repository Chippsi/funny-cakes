import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/system';
import { theme } from './theme';
import { initializeApp } from 'firebase/app';

(function () {
  const firebaseConfig = {
    apiKey: "AIzaSyDTkWA73ihGs6qs5qztIQrhLV2qiYjKNDo",
    authDomain: "funny-cakes.firebaseapp.com",
    databaseURL: "https://funny-cakes-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "funny-cakes",
    storageBucket: "funny-cakes.appspot.com",
    messagingSenderId: "176977359010",
    appId: "1:176977359010:web:2aed240dce2f650d3e27fb"
  };
  const app = initializeApp(firebaseConfig);
})();

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
