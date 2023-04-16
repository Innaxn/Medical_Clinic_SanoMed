import React, { useEffect, useState } from "react"
import PatientAPI from '../apis/PatientAPI';
import PatientList from "../components/PatientsList";
import { DeleteToken } from '../authentication/LocalStorageManager';
import { useNavigate } from 'react-router-dom';

function PatientsPage() {
  const [patients, setPatients] = useState([])
  const [errorMsg, setErr] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    PatientAPI.getPatients()
      .then((res) => {
        setPatients(res.patients)
        setErr("")
      })
      .catch((error) => {
        if (error.response.status === 401) {
          DeleteToken();
          navigate("/login");
        } 
      })
  }, []);

  const handleSearch = (bsn) => {
    setTimeout(() => {
      PatientAPI.getPatientsByBsn(bsn)
        .then(res => {
          setPatients(res.patients)
          setErr("")
        })
      .catch((error) => {
        console.log(error)
        if (error.response.status === 401) {
          DeleteToken();
          navigate("/login");
        }
        else if(error.response.status === 400){
          console.log("sasa")
          setErr("The bsn you wrote is too long")
        }
      })
    }, 1000);
  }


  return (
      <div className="container text-center">
         <div className="row p-4">
          <label>{errorMsg}</label>
        <input className="rounded-pill" type="number" min="0" placeholder="search by bsn..." onChange={(e) => handleSearch(e.target.value)} />
        </div>
        
        <PatientList patients={patients} />
      </div>
  )
}

export default PatientsPage