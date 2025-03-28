import React from "react";
import { Provider } from "./components/ui/provider"
import { createRoot } from "react-dom/client"
import './index.css'
import Login from "./components/Login.jsx"
import UserPage from "./components/UserPage.jsx"
import { BrowserRouter, Routes, Route } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <div className="w-full flex justify-center">
    <Provider>
      {/* Only in dev mode */}
      {/* <React.StrictMode> */}
        <BrowserRouter>
          <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/client" element={<UserPage />} />
          </Routes>
        </BrowserRouter>
      {/* </React.StrictMode> */}
    </Provider>
  </div>
)