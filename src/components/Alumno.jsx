import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Alumno(){

    const [studentData, setData] = useState()
    const [semesterData, setSemData] = useState()
    const [currentTab, setTab] = useState(1)
    const id = localStorage.getItem('Expediente');

    useEffect(() => {
        try{
            const url = `http://127.0.0.1:8000/alumnos/info/${id}`;
            console.log(url);
            axios.get(url)
            .then(res => {
                setData(res.data)
                console.log(res)
            })
            axios.get(semesterURL)
            .then(res => {
                setSemData(res.data)
                console.log(res)
            })
        }catch(error){
            setSemData(false)
        }
    }, []);

    async function fetchMoreData(tabIndex){
        try{
            const semesterURL = `http://127.0.0.1:8000/alumnos/info/${id}/${tabIndex}`
            const response = await axios.get(semesterURL)
            setSemData(response.data)
        }catch{
            setSemData(false);
        }
    }

    function handleTabChange(tabIndex){
        setTab(tabIndex)
        fetchMoreData(tabIndex)
    }

    function createTabs(){
        const tabs = []
        for(let i = 0; i < 9; i ++){
            tabs.push(<li key={i} className="nav-item">
            <a onClick={()=>handleTabChange(i+1)} className={`nav-link ${i+1 <= studentData['Semestre'] ? '' : 'disabled'} ${currentTab == i+1 ? 'active' : ''}`}>Semestre {i+1}</a>
            </li>)
        }
        return tabs;
    }

    return <>
        <section className="text-center">
            <h1 className="text-primary pt-4 pb-2 fs-2">Información del alumno</h1>
            { studentData && <>
                <div className="container">
                    <div className="row text-center gy-2">
                        <div className="col"><h2 className="student-name fs-4 pt-2 pb-3">{studentData['Nombre_completo']}</h2></div>
                    </div>
                    <div className="row justify-content-around student-data text-center ">
                        <div className="col-lg-4"><h3 className="data text-muted fs-5 student-id"><b>Expediente:</b> {studentData['Expediente']}</h3></div>
                        <div className="col-lg-4"><h3 className="data text-muted fs-5 student-semester"><b>Semestre:</b> {studentData['Semestre']}</h3></div>
                        <div className="col-lg-4"><h3 className="data text-muted fs-5 student-status"><b>Reinscrito:</b> Si</h3></div>
                    </div>
                </div>
                <main className="container justify-content-center">
                    <nav className="navbar navbar-expand-lg bg-white semester-tabs mt-3 d-flex justify-content-around">
                        <ul className="nav nav-tabs">
                            {createTabs()}
                        </ul>
                    </nav>
                    <section className="tab-content d-flex justify-content-center flex-column mt-4">
                        {semesterData && (
                            <>
                                <section className="container">
                                    <div className="row row-cols-lg-4 tab-pane d-flex justify-content-center " id="tab-info">
                                        <p className="col margin-0"><b>Confirmación: </b>Si</p>
                                        <p className="col margin-0"><b>Fecha: </b>{semesterData["Marca_temporal"]}</p>
                                        <p className="col margin-0"><b>Correo: </b>{semesterData['Dirección_de_correo_electrónico']}</p>
                                        <p className="col margin-0"><a target="_blank" href={semesterData["Evidencia_de_confirmación_de_materias"]}>Evidencia</a></p>
                                    </div>
                                </section>
                                <iframe className="mt-2" src="https://drive.google.com/file/d/1GyI6CjgDSeCRvsHmhKZWoABE-3p38ClV/preview" width="80%" height="300" style={{margin:'0 auto'}}></iframe>
                            </>
                        )}
                        {!semesterData && (
                            <div>
                                <h3>No se encontraron datos para este semestre</h3>
                            </div>
                        )}
                    </section>
                </main>
            </>}
        </section>
    </>
}