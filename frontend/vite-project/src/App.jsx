import React from 'react'
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import Home from './components/Home'
import HomePage from './components/HomePage'
import ProtectedRoute from './components/ProtectedRoute'
import CountryDetails from './components/CountryDetails'
import FavoriteCountries from './components/FavoriteCountries'
import PublicCountryExplorer from './components/PublicCountryExplorer'
import PublicCountryDetails from './components/PublicCountryDetails'
import AllCountries from './components/AllCountries'
import './App.css'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/explore" element={<PublicCountryExplorer />} />
            <Route path="/countries" element={<AllCountries />} />
            <Route path="/public/country/:countryCode" element={<PublicCountryDetails />} />
            
            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/home" element={<HomePage />} />
              <Route path="/country/:countryCode" element={<CountryDetails />} />
              <Route path="/favorites" element={<FavoriteCountries />} />
            </Route>
            
            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
