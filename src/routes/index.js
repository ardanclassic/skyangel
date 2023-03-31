import React from 'react'
import { Route, Routes } from "react-router-dom";
import HomePage from 'pages/homepage';
import GameShow from 'pages/gameshow';
import Rankings from 'pages/rankings';

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/ranks" element={<Rankings />} />
      <Route path="/game" element={<GameShow />} />
    </Routes>
  )
}

export default MainRoutes