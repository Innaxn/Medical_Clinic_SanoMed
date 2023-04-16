import React, { useEffect, useState, useContext } from "react"
import PrescriptionAPI from "../apis/PrescriptionAPI";
import { UserContext } from '../App'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import CreateConfirmationModal from "./CreateConfirmationModal ";
import { useNavigate} from 'react-router-dom';
import { DeleteToken } from "../authentication/LocalStorageManager";
import NotAuthorizedPage from "../pages/NotAuthorizedPage";

function CreatePrescription(props) {
    const { user } = useContext(UserContext)
    const navigate = useNavigate();
    const [errMsg, setErrMsg] = useState("")
    const [prescriptionFieldsAreShown, setPrescriptionFieldsAreShown] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const today = new Date().toISOString().slice(0, 10);

    const [values, setValues] = useState({
        start: "",
        end: "",
        medication: "",
        doctorId: "",
        diagnosId: "",
    });

    const handleHideModal = () => {
        setShowModal(false);
    };


    const handleCreationPrescription = (e) => {
        e.preventDefault();
        async function createPrescription() {
            try {
                await PrescriptionAPI.createPrescription({ medication: values.medication, start: values.start, end: values.end, doctorId: user.employeeId, diagnoseId: props.d.d.id })
                props.refreshPrescriptions();
                setPrescriptionFieldsAreShown(false);
                setShowModal(true);

            }
            catch (error) {
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

        createPrescription();
    }
    return (
        <div><Button style={{ borderRadius: "20px", backgroundColor: "#8DD4F5" }} onClick={() => {
            setPrescriptionFieldsAreShown(!prescriptionFieldsAreShown);
        }}>Add prescription</Button>
            <br /><br />

            {prescriptionFieldsAreShown ? <Card style={{ width: '28rem' }}>
                <Card.Body>
                    <Card.Title>Add new prescription</Card.Title>
                    <Card.Text>Mediacation:</Card.Text>
                    <input type="text" placeholder="Medication" onChange={(e) => {
                        setValues(prevState => ({
                            ...prevState, medication: e.target.value
                        }))
                    }} />
                    <Card.Text>Start date:</Card.Text>
                    <input type="date" min={today} onChange={(e) => {
                        setValues(prevState => ({
                            ...prevState, start: e.target.value
                        }))
                    }} />
                    <Card.Text>End date:</Card.Text>
                    <input type="date" min={today} onChange={(e) => {
                        setValues(prevState => ({
                            ...prevState, end: e.target.value
                        }))
                    }} />
                    <br />
                    {/* <Button className="m-4" style={{ borderRadius: "20px", backgroundColor: "#8DD4F5" }} onClick={(e) => handleCreationPrescription(e)}>Save prescription </Button> */}
                    <Button className="m-4" style={{ borderRadius: "20px", backgroundColor: "#8DD4F5" }}
                        onClick={(e) => handleCreationPrescription(e)}>Save prescription</Button>
                </Card.Body>
            </Card> : null}
            <CreateConfirmationModal show={showModal} onHide={handleHideModal} />
        </div>

    )
}

export default CreatePrescription