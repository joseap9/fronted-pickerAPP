import ReactDOM from 'react-dom/client';
import "bootswatch/dist/lux/bootstrap.min.css";

import App from './App';
import { Provider } from 'react-redux';
import { store } from './store/store';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={ store }>
        <App />
    </Provider>
  
);

