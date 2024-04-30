import React from "react";
import { useNavigate } from "react-router-dom";

export default function Header(){

    const navigate = useNavigate()

    function returnHome(){
        navigate('/')
        window.location.reload();
    }

    function addRegisters(){
        navigate('/registros')
    }

    return <header>
        <nav className="navbar py-3">
            <div className="container">
                <a href="#" onClick={returnHome} className="navbar-brand text-light">Altas de Materias</a>
                <button type="button" onClick={addRegisters} className="btn btn-primary">Añadir Registros</button>
            </div>
        </nav>
    </header>
}