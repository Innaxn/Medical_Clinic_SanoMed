import React from 'react'
import AppointmentComponent from './AppointmentComponent'

function AppointmentsList(props) {
  return (
    <ul className="p-4 row d-flex justify-content-around">
    {props.appointments.map(a => (
      <AppointmentComponent key={a.id} a={a} refr={props.refr}/>
    ))}
  </ul>
  )
}

export default AppointmentsList