import React from "react";
import { useNavigate } from "react-router-dom";

export default function Header(){

    const navigate = useNavigate()

    function handleClick(){
        navigate('/')
        window.location.reload();
    }

    return <header>
        <nav className="navbar py-3">
            <div className="container">
                <a href="#" onClick={handleClick} className="navbar-brand text-light">Altas de Materias</a>
            </div>
        </nav>
    </header>
}