import React, { useContext } from "react"
import { UserContext } from '../App'
import Moment from 'moment';
import DeletePrescription from './DeletePrescription';
import UpdatePrescription from './UpdatePrescription';

function PrescriptionComponent(props) {
  const { user } = useContext(UserContext)
  const currentDate = new Date();
  const endDate = new Date(props.p.end);
  let endDateElement;

  if (currentDate > endDate) {
    endDateElement = <div style={{ color: 'red' }}>{Moment(props.p.end).format('DD MMM YYYY')}</div>;
  } else {
    endDateElement = <div>{Moment(props.p.end).format('DD MMM YYYY')}</div>;
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center"><hr /><div>
        Medication: {props.p.medication} <br />
        Start date of intake: {Moment(props.p.start).format('DD MMM YYYY')}<br />
        End date: {endDateElement}
        Made by: <strong>{props.p.doctor.person.lastName}</strong>
      </div>
        {user.roles.includes("DOCTOR") && (
          <>
            <DeletePrescription p={props}></DeletePrescription>
            <UpdatePrescription p={props}></UpdatePrescription>
          </>
        )}
      </div>
      <hr />
    </>

  )
}


export default PrescriptionComponent