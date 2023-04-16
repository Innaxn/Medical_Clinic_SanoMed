import React, { useEffect, useState } from "react"
import { Chart } from 'react-google-charts';
import { ColumnChartOptions } from 'react-google-charts';
import { ColumnChart } from 'react-google-charts';
import StatisticsAPI from '../apis/StatisticsAPI';
import { DeleteToken } from '../authentication/LocalStorageManager';
import { useNavigate } from 'react-router-dom';
import EmpStats from "../components/EmpStats";
import PatientsStats from "../components/PatientsStats";

function StatisticsPage() {
    const [emps, setEmp] = useState([])
    const [messeage, setMessage] = useState("")
    const navigate = useNavigate()
    const [patients, setPatients] = useState([])

    const refreshPatients = () => {
        StatisticsAPI.getTopPatients()
          .then(stats => {
            setPatients(stats)
            console.log(stats)
          })
          .catch((error) => {
            console.log(error)
            if (error.response.status === 401) {
              DeleteToken();
              navigate("/login");
            } 
          })
      };

    const refreshEmp = () => {
        StatisticsAPI.getTopEmployees()
          .then(stats => {
            setEmp(stats)
            console.log(stats)
          })
          .catch((error) => {
            console.log(error)
            if (error.response.status === 401) {
              DeleteToken();
              navigate("/login");
            } 
          })
      };
    
      useEffect(() => {
        refreshEmp();
        refreshPatients();
      }, []);


    return (
        <>
       <EmpStats e={emps}></EmpStats>
       <PatientsStats p={patients}></PatientsStats>
       </>
    )
}

export default StatisticsPage