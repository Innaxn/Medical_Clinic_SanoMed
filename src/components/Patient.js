import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import React, { useContext } from 'react'

const Patient = ({ patient }) => {
  const navigate = useNavigate();

  const navigateToViewRecord = (id) => {
    navigate(`/patients/record/${id}`);
  };

  const navigateToAppointmentManagement = (id)=>{
    navigate(`/appointments/${id}`);
  };

  const { user } = useContext(UserContext)

  console.log(patient)
  return (
    <Card className="shadow p-3 mb-5 bg-body-tertiary rounded" style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{patient.person.firstName} {patient.person.lastName}</Card.Title>
        <Card.Text>
          Email: {patient.person.email}<br />
          Bsn: {patient.bsn}
        </Card.Text>
        {user.roles.includes("DOCTOR") && (
          <Button style={{ borderRadius: "20px", backgroundColor: "#8DD4F5" }} onClick={() => navigateToViewRecord(patient.id)}>View record</Button>
        )}
        {user.roles.includes("SECRETARY") && (
          <Button style={{ borderRadius: "20px", backgroundColor: "#8DD4F5" }} onClick={() => navigateToAppointmentManagement(patient.id)}>Manage appointments</Button>
        )}
      </Card.Body>
    </Card>
  )
}

export default Patient