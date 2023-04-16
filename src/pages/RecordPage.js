import React, { useEffect, useState, useContext } from 'react'
import PatientAPI from '../apis/PatientAPI';
import { useParams } from 'react-router-dom';
import Moment from 'moment';
import Diagnosis from '../components/Diagnosis';
import DiagnoseAPI from '../apis/DiagnoseAPI';
import { UserContext } from '../App'
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import CreateDiagnose from '../components/CreateDiagnose';
import { useNavigate } from 'react-router-dom';
import { DeleteToken } from '../authentication/LocalStorageManager';
import NotAuthorizedPage from './NotAuthorizedPage';

function RecordPage() {
    const navigate = useNavigate()
    const { user } = useContext(UserContext)
    const [patient, setPatient] = useState({})
    const { id } = useParams();

    const refreshPatient = () => {
        if (id !== undefined) {
            PatientAPI.getPatient(id)
                .then(patient => {
                    setPatient(patient)
                })
                .catch((error) => {
                    if (error.response.status === 401) {
                        DeleteToken();
                        navigate("/login");
                    } else if (error.response.status === 403) {
                       <NotAuthorizedPage></NotAuthorizedPage>
                    }
                    else{
                    }
                })
        }
    };

    useEffect(() => {
        refreshPatient();
    }, []);


    if (patient.person !== undefined)
        return (

            <>

                <Card className='m-4 mx-auto' border="info" style={{ width: '70rem' }}>
                    <Card.Header>Patient</Card.Header>
                    <Card.Body>
                        <Card.Title>{patient.person.firstName} {patient.person.lastName}</Card.Title>
                        <Card.Text>
                            Email: {patient.person.email}<br />
                            Bsn: {patient.bsn}<br />
                            Health insurance number: {patient.healthInsuranceNumber}<br />
                            Birthdate: {Moment(patient.person.birthdate).format('DD MMM YYYY')}<br />
                        </Card.Text>
                        <hr />
                        {patient.diagnose.length > 0 ?
                             <Diagnosis diagnose={patient.diagnose} refr={refreshPatient} />
                            : <Card.Title>There are no diagnosis made for this patient</Card.Title>}
                    </Card.Body>
                </Card>
                {user.roles.includes("DOCTOR")&& (
                <CreateDiagnose p={patient} refreshPatient={refreshPatient}></CreateDiagnose>)}

            </>
        )
}

export default RecordPage