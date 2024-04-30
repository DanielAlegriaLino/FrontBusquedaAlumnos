import React from "react";
import { useNavigate } from "react-router-dom";

export default function Registro(props){

    const navigate = useNavigate()

    function handleClick(){
        localStorage.setItem("Expediente", props.expediente)
        console.log(localStorage.getItem("Expediente"))
        navigate(`/alumno`)
    }

    return <article onClick={handleClick} className="register row text-center border border-secondary rounded my-3 align-items-center">
        <p className="col mb-0 py-3">{props.expediente}</p>
        <p className="col mb-0 py-3">{props.nombre}</p>
        <p className="col mb-0 py-3">Semestre {props.semestre}</p>
    </article>
}