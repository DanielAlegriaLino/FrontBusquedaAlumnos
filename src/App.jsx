import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import AltasRealizadas from './components/AltasRealizadas'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Alumno from './components/Alumno'

function App() {
  const [count, setCount] = useState(0)

  return (
    <> 
      <Router>
        <Header/>
        <Routes>
          <Route path='/' element={<AltasRealizadas/>}/>
          <Route path='/alumno' element={<Alumno/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
