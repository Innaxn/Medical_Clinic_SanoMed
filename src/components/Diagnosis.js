import React from 'react'
import DiagnoseComponent from './DiagnoseComponent'

function Diagnosis(props) {
  return (
    <ul>
    {props.diagnose.map(d => (
      <DiagnoseComponent key={d.id} d={d} refr={props.refr}/>
    ))}
  </ul>
  )
}

export default Diagnosis