import React, { useContext } from 'react'
import { UserContext } from '../App'
import { useNavigate } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Moment from 'moment';

function AppointmentComponent(props) {
  const { user } = useContext(UserContext)

  const navigate = useNavigate();

  const navigateToViewRecord = (id) => {
    navigate(`/patients/record/${id}`);
  };

  const navigateToUpdateAppointment = (id) => {
    navigate(`/appointmentupdate/${id}`);
  };
console.log(props.a)
  return (
    <Col>
      <Card className="shadow p-3 mb-5 bg-body-tertiary rounded" style={{ width: '12rem' }}>
        <Card.Body>
          <Card.Text>
            Time: {Moment(props.a.start).format('HH:mm')}<br />
            Date: {Moment(props.a.start).format("D MMMM YYYY")}<br />
            Doctor: {props.a.doctor.person.firstName} {props.a.doctor.person.lastName}<br />
            Patient: {props.a.patient.person.firstName} {props.a.patient.person.lastName}<br />
            Complaint: {props.a.purpose}<br />
          </Card.Text>
          {user.roles.includes("DOCTOR") || user.roles.includes("PATIENT") ? (
            <Button style={{ borderRadius: "20px", backgroundColor: "#8DD4F5" }} onClick={() => navigateToViewRecord(props.a.patient.id)}>View record</Button>
          ) : (
            <div></div>
          )}
          {user.roles.includes("SECRETARY") && (
            <Button style={{ borderRadius: "20px", backgroundColor: "#8DD4F5" }}  onClick={() => navigateToUpdateAppointment(props.a.id)}>Update Appointment</Button>
          )}
        </Card.Body>
      </Card>
    </Col>
  )
}

export default AppointmentComponent