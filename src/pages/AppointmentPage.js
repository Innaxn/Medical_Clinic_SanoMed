import React, { useEffect, useState, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import AppointmentAPI from '../apis/AppointmentAPI';
import { UserContext } from '../App'
import AppointmentsList from '../components/AppointmentsList';
import { DeleteToken } from '../authentication/LocalStorageManager';
import NotAuthorizedPage from './NotAuthorizedPage';


function AppointmentPage() {
    const { id } = useParams();
    const [appoint, setAppoint] = useState([])
    const [errorMsg, setErrorMsg] = useState("")
    const todaydate = new Date();
    const { user } = useContext(UserContext)
    const navigate = useNavigate()

    const refreshAppointments = (date) => {
        if (user.employeeId && user.roles.includes("DOCTOR") )
            AppointmentAPI.getAppointmentByDocIdAndDate(id, date)
                .then(appointments => {
                    setAppoint(appointments)
                    setErrorMsg("")
                })
                .catch((error) => {
                    if (error.response.status === 401) {
                        DeleteToken();
                        navigate("/login");
                    } else if (error.response.status === 403) {
                        alert('Not Authorized')
                    }
                    else if (error.response.status === 404) {
                        setErrorMsg("You do not have upcoming appointments with patients.")
                    }
                })
        else if (user.patientId || user.roles.includes("SECRETARY")) {
            if (id !== undefined) {
                AppointmentAPI.getAppointmentByPatientIdAndDate(id, date)
                    .then(appointments => {
                        setAppoint(appointments)
                        console.log(appoint)
                        setErrorMsg("")
                    })
                    .catch((error) => {
                        if (error.response.status === 401) {
                            DeleteToken();
                            navigate("/login");
                        } else if (error.response.status === 403) {
                            <NotAuthorizedPage></NotAuthorizedPage>
                        }
                        else if (error.response.status === 404) {
                            setErrorMsg("You do not have upcoming appointments with doctors.")
                        }
                        else if (!error?.response) {
                            setErrorMsg('No Server Response');
                        }
                        else{
                            console.log(error)
                        }
                    })
            }
        }
    };

    useEffect(() => {
        refreshAppointments(todaydate);
    }, []);

    return (
        <div>
            <h2 className="p-4">My appointments</h2>
            <hr></hr>
            <div className='d-flex justify-content-center p-3'>
                <label>Filter by date: </label>
                <input type="datetime-local" onChange={(e) => refreshAppointments(e.target.value)} />
            </div>
            <hr></hr>
            {errorMsg.length === 0 ? <AppointmentsList appointments={appoint} /> : <h3>{errorMsg}</h3>}

        </div>
    )
}

export default AppointmentPage