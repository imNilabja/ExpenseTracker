import React from 'react'
import ExpenseExplorer from './components/ExpenseExplorer'
import Login from './components/Login'
import Register from './components/Register'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/explore" element={<ExpenseExplorer />} />
      </Routes>   
    </BrowserRouter>
  )
}

export default App