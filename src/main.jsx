import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/App.jsx';
import { BrowserRouter, HashRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <HashRouter> */}
      <App />
    </BrowserRouter>
    {/* </HashRouter> */}
  </React.StrictMode>,
);
