import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/App.jsx';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { injectStyle } from 'react-toastify/dist/inject-style';
injectStyle();
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <HashRouter> */}
      <App />
    </BrowserRouter>
    {/* </HashRouter> */}
  </React.StrictMode>,
);
