import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '../context/ThemeContext';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Home from '../pages/Home'

function App() {

  return (
    <>
      <ThemeProvider>
        <Router>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <Routes>

                <Route path='/' element={<Home />} />
              </Routes>

            </main>
            <Footer />
          </div>
        </Router>
      </ThemeProvider>
    </>
  )
}

export default App
