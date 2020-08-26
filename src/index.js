import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <canvas id="c" width="500" height="500" style={{ position: "absolute" }} />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
