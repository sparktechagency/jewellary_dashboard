import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'


import {
  
  RouterProvider,
} from "react-router-dom";
import { router } from './routes/Router';

import { Provider } from 'react-redux';
import { persistor, store } from './page/redux/store';
import { PersistGate } from 'redux-persist/integration/react';




createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} future={{v7_startTransition:true, v7_relativeSplatPath:true,v7_normalizeFormMethod:true, v7_fetcherPersist:true}} />
      </PersistGate>
    </Provider>
  </StrictMode>,
)
