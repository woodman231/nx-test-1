import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import { SocketProvider } from './socket';

import App from './app/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <SocketProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </SocketProvider>    
  </Provider>
);
