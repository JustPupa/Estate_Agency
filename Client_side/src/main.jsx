import React from "react";
import { Provider } from "./components/ui/provider"
import { createRoot } from "react-dom/client"
import './index.css'
import Login from "./components/Common/Login.jsx"
import UserPage from "./components/User/UserPage.jsx"
import RealtPage from "./components/Realtor/RealtPage.jsx"
import Registration from "./components/Common/Registration.jsx"
import { BrowserRouter, Routes, Route } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <div className="w-full flex flex-col">
    <Provider>
      {/* Only in dev mode */}
      {/* <React.StrictMode> */}
        <BrowserRouter>
          <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/client" element={<UserPage />} />
              <Route path="/realt" element={<RealtPage />} />
              <Route path="/registration" element={<Registration />} />
          </Routes>
        </BrowserRouter>
      {/* </React.StrictMode> */}
    </Provider>
  </div>
)