import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '../context/ThemeContext';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Home from '../pages/Home'
import About from '../pages/about'
import Projects from '../pages/Projects';

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
                <Route path='/about' element={<About />} />
                <Route path='/projects' element={<Projects />} />
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
