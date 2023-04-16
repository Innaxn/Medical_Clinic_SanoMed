import React from "react"
import DoctorItem from './DoctorItem';
import Row from 'react-bootstrap/Row';

function DoctorList(props) {

  return (
    <Row>
      {props.docs.map(docItem => (
        <DoctorItem key={docItem.id} docItem={docItem} />
      ))}
    </Row>
  )
}

export default DoctorList;