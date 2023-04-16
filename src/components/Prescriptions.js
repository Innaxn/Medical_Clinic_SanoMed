import React from 'react'
import PrescriptionComponent from './PrescriptionComponent'

function Prescriptions(props) {
  return (
    <div>
    {props.prescription.map(p => (
      <PrescriptionComponent key={p.id} p={p} refreshPrescriptions={props.refreshPrescriptions} />
    ))}
    </div>
  )
}

export default Prescriptions