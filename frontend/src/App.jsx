import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '../context/ThemeContext';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ScrollToTop from '../components/ScrollToTop'
import Home from '../pages/Home'
import About from '../pages/About'
import Projects from '../pages/Projects';
import Skills from '../pages/Skills';
import Contact from '../pages/contact';
import NotFound from '../pages/NotFound';

function App() {

  return (
    <>
      <ThemeProvider>
        <Router>
          <ScrollToTop />
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <Routes>

                <Route path='/' element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route path='/projects' element={<Projects />} />
                <Route path='/skills' element={<Skills />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='*' element={<NotFound />} />
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
