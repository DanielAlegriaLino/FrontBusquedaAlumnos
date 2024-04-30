import axios from "axios";
import React, { useState } from "react";

export default function AgregarRegistros(){

    const [file, setFile] = useState(null);

    function sendData(event){
        event.preventDefault();
        axios.post('http://localhost:8000/data/', {file})
    }

    return <>
        <section>
            <h1 className="header-title text-primary pt-4 pb-3 text-center">Agregar Registros</h1>
        </section>
        <main>
            <form className="container d-flex flex-column text-center my-4" onSubmit={sendData}>
                <label htmlFor="inputArchivo" className="fs-4 mb-3">Elige el archivo a enviar</label>
                <input onChange={e => setFile(e.target.files[0])} type="file" id="inputArchivo" name="inputArchivo" accept=".csv" className="form-control my-3" style={{width:'30%', margin:'0 auto'}}/>
                <button type="submit" className="btn btn-primary my-3" style={{width:'12%', margin:'0 auto'}}>Enviar</button>
            </form>
        </main>
    </>

}