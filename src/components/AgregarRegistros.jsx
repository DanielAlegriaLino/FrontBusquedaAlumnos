import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AgregarRegistros(){

    const [file, setFile] = useState(null);
    const navigate = useNavigate()
    const [error, setError] = useState(false)

    function sendData(event){
        event.preventDefault();

        const formData = new FormData();
        formData.append("file", file);

        axios.post('http://localhost:8000/data/', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        })
        .then(res => {
            res.data.message ? navigate('/') : setError(true)
        })
    }

    return <>
        <section>
            <h1 className="header-title text-primary pt-4 pb-3 text-center">Agregar Registros</h1>
        </section>
        <main>
            { error && <h5 className="text-danger text-center">Hubo un error al enviar los datos</h5>}
            <form className="container d-flex flex-column text-center my-4" onSubmit={sendData}>
                <label htmlFor="inputArchivo" className="fs-4 mb-3">Elige el archivo a enviar</label>
                <input required onChange={e => setFile(e.target.files[0])} type="file" id="inputArchivo" name="inputArchivo" accept=".csv" className="form-control my-3" style={{width:'30%', margin:'0 auto'}}/>
                <button type="submit" className="btn btn-primary my-3" style={{width:'12%', margin:'0 auto'}}>Enviar</button>
            </form>
        </main>
    </>

}