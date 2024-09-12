import React from 'react';
import { createRoot } from 'react-dom/client';
import App from "./App";
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import { ChatContextProvider } from './context/ChatContext';

const root = createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <AuthProvider>
      <ChatContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ChatContextProvider>
    </AuthProvider>
  </React.StrictMode>
);
// import React from 'react';
// import { createRoot } from 'react-dom/client';
// import App from "./App";
// import { BrowserRouter } from 'react-router-dom';
// import { AuthProvider } from './context/AuthProvider';

// const root = createRoot(document.getElementById('root') as HTMLElement)
// root.render(
//   <React.StrictMode>
//     <AuthProvider>
//       <BrowserRouter>
//         <App />
//       </BrowserRouter>
//     </AuthProvider>
//   </React.StrictMode>
// );