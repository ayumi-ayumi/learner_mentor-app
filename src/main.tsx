import React from 'react';
import { createRoot } from 'react-dom/client';
import App from "./App";
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import { UsersDataProvider } from './context/UsersProvider';

const root = createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <AuthProvider>
      {/* <UsersDataProvider> */}
        <BrowserRouter>
          <App />
        </BrowserRouter>
      {/* </UsersDataProvider> */}
    </AuthProvider>
  </React.StrictMode>
);
// root.render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </React.StrictMode>
// );