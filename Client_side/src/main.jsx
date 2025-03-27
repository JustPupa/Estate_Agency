import React from "react";
import { Provider } from "./components/ui/provider"
import { createRoot } from "react-dom/client"
import './index.css'
import { Login } from "./components/login.jsx"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SearchField } from "./components/SearchField.jsx"

createRoot(document.getElementById('root')).render(
  <div className="w-full flex justify-center">
    <Provider>
      <React.StrictMode>
        <BrowserRouter>
          <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/products" element={<SearchField />} />
          </Routes>
        </BrowserRouter>
      </React.StrictMode>
    </Provider>
  </div>
)
