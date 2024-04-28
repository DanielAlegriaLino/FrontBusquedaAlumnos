import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Registro from "./Registro";

export default function AltasRealizadas(){

    const [alumnos, setAlumnos] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    const [searched, setSearch] = useState(false);
    const [selectedOption, setSelected] = useState(0);
    const [result, setResult] = useState();

    useEffect(() => {
        const url = 'http://127.0.0.1:8000/alumnos'
        axios.get(url)
        .then(res => {
            setAlumnos(res.data)
        })
    }, []);

    function handleSelectChange(event){
        const selectedValue = event.target.value;
        setSelected(selectedValue);
    }

    async function search(){
        try{
            if(selectedOption == 0){
                const url = `http://127.0.0.1:8000/alumnos/expediente/${busqueda}`
                console.log(url)
                const response = await axios.get(url);
                setResult(response.data);
            }
            else{
                const url = `http://127.0.0.1:8000/alumnos/nombre/${busqueda}`
                console.log(url)
                const response = await axios.get(url);
                setResult(response.data);
            }
            setSearch(true);
            setBusqueda('')
        } catch(error) {
            console.error('Error fetching data ', error);
        }
    }

    return <>
        <section className="text-center">
            <h1 className="header-title text-primary pt-4 pb-3">Altas Realizadas</h1>
        </section>
        <main className="container">
            <section className="input-group my-3 search-section">
                <select onChange={handleSelectChange} defaultValue={0} className="form-select form-control">
                    <option value={0}>Expediente</option>
                    <option value={1}>Nombre</option>
                </select>
                <input onChange={(event)=>setBusqueda(event.target.value)} value={busqueda} type="search" className="form-control" id="search-student"/>
                <button onClick={search} type="button" className="btn btn-outline-primary" id="search-btn">Buscar</button>
            </section>
            <section className="container text-center mt-5 registers" style={{margin:'0 auto'}}>
                <article className="row row-cols-3 border-bottom border-secondary">
                    <p className="col fw-bold mb-1">Expediente</p>
                    <p className="col fw-bold mb-1">Nombre</p>
                    <p className="col fw-bold mb-1">Semestre</p>
                </article>
                {alumnos && !searched && alumnos.map((alumno, index) => (
                    <Registro key={index} expediente={alumno.Expediente} nombre={alumno.Nombre_completo} semestre={alumno.Semestre}/>
                ))}
                {result && searched && result.map((alumno, index) => (
                    <Registro key={index} expediente={alumno.Expediente} nombre={alumno.Nombre_completo} semestre={alumno.Semestre}/>
                ))}
                {result && result.length == 0 && (
                    <h3 className="my-5 text-secondary">No hay resultados</h3>
                )}
                {searched && (
                    <h4 className="my-5"><a href="#" onClick={()=>window.location.reload()} style={{textDecoration:'none'}}>Reiniciar</a></h4>
                )}
            </section>
        </main>
    </>
}