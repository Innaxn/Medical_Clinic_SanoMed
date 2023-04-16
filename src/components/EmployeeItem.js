import React, { useEffect, useState } from 'react'
import EmployeesAPI from '../apis/EmployeesAPI';
import Image from "../components/images/man.jpg";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import UpdateConfirmationModal from "../components/UpdateConfirmationModal"
import NotAuthorizedPage from "../pages/NotAuthorizedPage";
import { DeleteToken } from '../authentication/LocalStorageManager';
import { useNavigate } from 'react-router-dom';
import { Card } from 'react-bootstrap';

function EmployeeItem(props) {

    const [newStatus, setNewStatus] = useState()
    const [errMsg, setErrMsg] = useState("");
    const navigate = useNavigate()

    const [showModal, setShowModal] = useState(false);

    const handleHideModal = () => {
        setShowModal(false);
    };

    function updateStatusEmp() {
        async function updateEmployeeStatus() {
            try {
                await EmployeesAPI.updateEmployeeStatus({ id: props.empItem.id, status: newStatus })
                setShowModal(true);
                props.refr();

            } catch (error) {
                if (!error?.response) {
                    setErrMsg('No Server Response');
                }
                else if (error.response?.status === 401 || error.message === "ID_NOT_FROM_LOGGED_IN_USER") {
                    DeleteToken();
                    navigate("/login");
                }
                else if (error.response.status === 403) {
                    <NotAuthorizedPage></NotAuthorizedPage>
                }
                else {
                    console.log(error)
                }
            }
        }
        updateEmployeeStatus();
    }


    const handleUpdate = () => {
        updateStatusEmp()
        props.refr();
    }


    const statusStyle = {
        color: props.empItem.status === 'FIRED' ? 'red' : 'black',
    };

    return (
        <>
            <span>{errMsg}</span>
            <Card className="shadow p-3 mb-5 bg-body-tertiary rounded" style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Img height={190} src={Image} alt="pic" />
                    <h5 className="card-title">{props.empItem.person.firstName} {props.empItem.person.lastName}</h5>
                    <label>Current status: <strong style={statusStyle}>{props.empItem.status}</strong></label>
                    <select className="mb-2" name={props.empItem.status} onChange={e => setNewStatus(e.target.value)}>
                        <option value="ACTIVE">Active</option>
                        <option value="FIRED">Fired</option>
                    </select>
                    <Button className='d-flex ' style={{ borderRadius: "10px", backgroundColor: "#8DD4F5" }} onClick={() => { handleUpdate(props.empItem.id, newStatus) }}> Update status</Button>
                </Card.Body>

            </Card>
            <UpdateConfirmationModal show={showModal} onHide={handleHideModal} />
        </>
    )
}

export default EmployeeItem