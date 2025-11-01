import { useState } from 'react'
import { BrowserRouter, HashRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '../context/ThemeContext';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
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
        {(() => {
          // Use HashRouter in production to avoid server-side rewrite issues
          const RouterComponent = import.meta.env.PROD ? HashRouter : BrowserRouter;
          return (
            <RouterComponent>
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
            </RouterComponent>
          );
        })()}
      </ThemeProvider>
    </>
  )
}

export default App
