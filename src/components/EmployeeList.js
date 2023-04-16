import React from 'react'
import EmployeeItem from './EmployeeItem'
import Row from 'react-bootstrap/Row';

function EmployeeList(props) {
  console.log(props.employees)
  return (
       <ul className="p-4 row d-flex justify-content-around">
        {props.employees.map(empItem => (
          <EmployeeItem key={empItem.id} empItem={empItem} refr={props.refr} />
        ))}
      </ul>
  )
}

export default EmployeeList