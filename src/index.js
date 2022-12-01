import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './screens/App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App style={{maxHeight: '100%'}}/>
  </React.StrictMode>
);

export default root