// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
// import './index.css'

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// )

import React from 'react';
import {createRoot} from 'react-dom/client';
import App from "./App";
// import {APIProvider, Map} from '@vis.gl/react-google-maps';

// const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

// const App = () => (
//   <APIProvider apiKey={API_KEY}>
//   <div style={{ height: '100vh', width: '100%'}}>
//     <Map
//       zoom={9}
//       center={{lat: 53.54, lng: 10}}
//       gestureHandling={'greedy'}
//       disableDefaultUI={false} //trueにすると、ズームのアイコンなどが全て非表示になる
//       mapId={import.meta.env.VITE_GOOGLE_MAPS_ID} //To use a marker, map ID is needed
//     />

//   </div>
//   </APIProvider>
// );

// createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
const root = createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
