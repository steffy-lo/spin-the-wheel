import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Wheel, Settings } from './pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Wheel />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
