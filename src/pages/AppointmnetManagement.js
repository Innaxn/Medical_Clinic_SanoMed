import React, { useEffect, useState } from 'react'
import AppointmentAPI from '../apis/AppointmentAPI';
import { useNavigate, useParams } from 'react-router-dom';
import { DeleteToken } from '../authentication/LocalStorageManager';
import Moment from 'moment';
import DeleteAppointment from '../components/DeleteAppointment';
import UpdateAppointment from '../components/UpdateAppointment';
import NotAuthorizedPage from './NotAuthorizedPage';

function AppointmnetManagement() {
    const { id } = useParams();
    const [appoint, setAppoint] = useState([])
    const [errorMsg, setErrorMsg] = useState("")
    const navigate = useNavigate()

    const refreshAppointment = () => {
        if (id !== undefined) {
            AppointmentAPI.getAppointmentById(id)
                .then(appointment => {
                    console.log(appointment)
                    setAppoint(appointment)
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
                        setErrorMsg("The appointment is deleted")
                    }
                })
        }
    };


    useEffect(() => {
        refreshAppointment();
    }, []);

    if (appoint.patient && appoint.patient.person && appoint.doctor && appoint.doctor.person)
        return (
            <div className='d-flex justify-content-center'>
                <div className=' card m-4' border="info" style={{ width: '70rem' }}>
                    <h1  className='m-4'>Appointmnet Management</h1>
                    <table className=" mb-3 table table-border">
                        <thead className="text-nowrap">
                            <tr>
                                <th>Patient</th>
                                <th>Doctor</th>
                                <th>Time of the appointment</th>
                                <th>Purpose</th>
                            </tr>
                        </thead>
                        <tbody>

                            <tr>
                                <td>{appoint.patient.person.firstName} {appoint.patient.person.lastName}</td>
                                <td>{appoint.doctor.person.firstName} {appoint.doctor.person.lastName}</td>

                                <td>{Moment(appoint.start).format("D MMMM YYYY")} At: {Moment(appoint.start).format('HH:mm')}</td>
                                <td>{appoint.purpose}</td>
                            </tr>
                        </tbody>
                    </table>

                    <div >
                        <DeleteAppointment a={appoint} > </DeleteAppointment>
                        <UpdateAppointment a={appoint} refreshAppointment={refreshAppointment}></UpdateAppointment>
                    </div>

                </div >
            </div >
        )
    else return (<h1>Loading</h1>)
}

export default AppointmnetManagement