import React, { useEffect, useState, useContext } from "react"
import { UserContext } from '../App'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import DiagnoseAPI from "../apis/DiagnoseAPI";
import UpdateConfirmationModal from "../components/UpdateConfirmationModal"
import NotAuthorizedPage from "../pages/NotAuthorizedPage";
import { DeleteToken } from '../authentication/LocalStorageManager';
import { useNavigate } from 'react-router-dom';

function UpdateDiagnose(props) {
    const { user } = useContext(UserContext)
    const [diagnoseFieldsShown, setdiagnoseFieldsShown] = useState(false)
    const [errMsg, setErrMsg] = useState("");
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate()


    const handleHideModal = () => {
        setShowModal(false);
    };

    const [oldValuesDiagnose, setOldValuesDiagnose] = useState({
        name: "",
        details: "",
        doctorId: ""
    });

    const [newValues, setNewValues] = useState({
        newName: "",
        newDetails: "",
        newDoctorId: ""
    });

    useEffect(() => {
        setOldValuesDiagnose({
            name: props.d.name, details: props.d.details, doctorId: props.d.doctorId
        })
        setNewValues({
            newName: props.d.name, newDetails: props.d.details,
            newDoctorId: props.d.doctorId
        })
    }, [])

    function updateDiagnoseFunc() {
        async function updateDiagnose() {
            try {
                await DiagnoseAPI.update({ id: props.d.id, name: newValues.newName, description: newValues.newDetails, doctorId: user.employeeId })
                    .then(props.refr());
                setdiagnoseFieldsShown(false);
                setShowModal(true);
            }  catch (error) {
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
        updateDiagnose();
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        updateDiagnoseFunc()
        props.refr()
    }


    return (
        <div>
            <Button className="m-3" style={{ borderRadius: "10px", backgroundColor: "#8DD4F5" }} onClick={() => {
                setdiagnoseFieldsShown(!diagnoseFieldsShown);
                setNewValues(prevState => ({
                    ...prevState, newName: oldValuesDiagnose.name, newDetails: oldValuesDiagnose.details,
                    newDoctorId: oldValuesDiagnose.doctorId
                }))
            }}>Update diagnose</Button>

            {diagnoseFieldsShown ?
                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>Update</Card.Title>
                        <Card.Text>Name:
                            <input type="text" value={newValues.newName} onChange={(e) => {
                                setNewValues(prevState => ({
                                    ...prevState, newName: e.target.value
                                }))
                            }} />
                        </Card.Text>
                        <Card.Text>Details:
                            <input type="text" value={newValues.newDetails} onChange={(e) => {
                                setNewValues(prevState => ({
                                    ...prevState, newDetails: e.target.value
                                }))
                            }} />
                        </Card.Text>
                    </Card.Body>
                </Card>
                : null}
            {diagnoseFieldsShown ? <Button style={{ borderRadius: "10px", backgroundColor: "#8DD4F5" }} onClick={(e) => handleUpdate(e)}> Save changes</Button> : null}
            <UpdateConfirmationModal show={showModal} onHide={handleHideModal} />
        </div>
    )
}

export default UpdateDiagnose