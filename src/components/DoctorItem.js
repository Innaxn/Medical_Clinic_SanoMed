import React from "react"
import Image from "../components/images/man.jpg";
import { useNavigate } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


function DoctorItem(props) {
    const navigate = useNavigate();
    const navigateToAbout = (id) => {
        navigate(`/doctors/about/${id}`);
    };

    return (
        <Col>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={Image} alt="pic"  />
                <Card.Body>
                    <Card.Title>{props.docItem.person.firstName} {props.docItem.person.lastName}</Card.Title>
                    <Card.Text>
                    {props.docItem.description.substring(0, 10)}... <br/>
                    </Card.Text>
                    
                    <Button style={{borderRadius: "20px", backgroundColor: "#8DD4F5" }} onClick={() => navigateToAbout(props.docItem.id)}>About</Button>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default DoctorItem;