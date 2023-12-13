// App.js
import React from 'react';
import { Route, Routes } from "react-router-dom"
import HomePage from './Components/HomePage';
import ChatManager from './Components/Manager';

const App = () => {
  return (
    <Routes>
        <Route path="/"  element={<HomePage/> } />
        <Route path="/chat-manager" element={<ChatManager/>} />
    </Routes>
  );
}

export default App;
