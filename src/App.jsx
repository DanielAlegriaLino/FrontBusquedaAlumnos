import './App.css'
import Header from './components/Header'
import AltasRealizadas from './components/AltasRealizadas'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Alumno from './components/Alumno'
import AgregarRegistros from './components/AgregarRegistros';

function App() {

  return (
    <> 
      <Router>
        <Header/>
        <Routes>
          <Route path='/' element={<AltasRealizadas/>}/>
          <Route path='/alumno' element={<Alumno/>} />
          <Route path='/registros' element={<AgregarRegistros/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
