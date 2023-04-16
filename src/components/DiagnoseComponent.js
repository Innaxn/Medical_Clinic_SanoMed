import React, { useEffect, useState, useContext } from "react"
import PrescriptionAPI from "../apis/PrescriptionAPI";
import { UserContext } from '../App'
import Prescriptions from "./Prescriptions";
import UpdateDiagnose from "./UpdateDiagnose";
import DeleteDiagnose from "./DeleteDiagnose";
import CreatePrescription from "./CreatePrescription";
import NotAuthorizedPage from "../pages/NotAuthorizedPage";
import { DeleteToken } from '../authentication/LocalStorageManager';
import { useNavigate } from 'react-router-dom';

function DiagnoseComponent(props) {
    const { user } = useContext(UserContext)
    const navigate = useNavigate()
    const [prescription, setPrescriptions] = useState([])
    const [errorMsg, setErrorMsg] = useState("")
    const [errMsg, setErrMsg] = useState("");

    const refreshPrescriptions = () => {
        if (props.d.id !== undefined) {
            PrescriptionAPI.getPrescriptions(props.d.id)
                .then(prescriptions => {
                    setPrescriptions(prescriptions)
                })
                .catch((error) => {
                    if (!error?.response) {
                        setErrMsg('No Server Response');
                    }
                    else if (error.response?.status === 401 || error.message === "ID_NOT_FROM_LOGGED_IN_USER") {
                        DeleteToken();
                        navigate("/login");
                    }
                    else if (error.response.status === 403) {
                        <NotAuthorizedPage></NotAuthorizedPage>
                    }
                    else if (error.response.status === 400 || error.response.status === 404) {
                        setErrorMsg("There are no prescriptions for this diagnose.")
                    }
                })
        }
    };
    let roles = [];
    if (user) {
      roles = user.roles;
    }

    useEffect(() => {
        refreshPrescriptions();
    }, [])

    return (
        <div>
            <h3>Diagnose</h3>
            <div className="d-flex justify-content-between"> <div>Name: {props.d.name} <br />  
             Details: {props.d.details} <br /> 
             Made by: <strong>{props.d.doctor.person.lastName}</strong></div>
             {roles.includes("DOCTOR")&& (
                <div>
                    <UpdateDiagnose d={props.d} refr={props.refr}></UpdateDiagnose>
                    <DeleteDiagnose d={props.d} refr={props.refr}> </DeleteDiagnose>
                </div>)}
            </div>

            <br />

            {prescription.length > 0 ? <div>
                <strong>Prescriptions</strong>: <Prescriptions prescription={prescription} refreshPrescriptions={refreshPrescriptions} />
            </div>

                : <div>{errorMsg} </div>}
            <br />

            {roles.includes("DOCTOR")&& (
            <CreatePrescription d={props} refreshPrescriptions={refreshPrescriptions}></CreatePrescription>)}

            <br />
            <hr />
        </div>
    )
}

export default DiagnoseComponent