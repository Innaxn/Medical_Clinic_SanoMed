import React, { useEffect, useState, useContext } from "react"
import { UserContext } from '../App'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import DiagnoseAPI from "../apis/DiagnoseAPI";
import CreateConfirmationModal from "./CreateConfirmationModal ";
import { useNavigate} from 'react-router-dom';
import { DeleteToken } from "../authentication/LocalStorageManager";
import NotAuthorizedPage from "../pages/NotAuthorizedPage";

function CreateDiagnose(props) {
    const { user } = useContext(UserContext)
    const [diagnoseFieldsAreShown, setDiagnoseFieldsAreShown] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const navigate= useNavigate();
    const [errMsg, setErrMsg] = useState("");

    const [values, setValues] = useState({
        name: "",
        details: ""
    });

    const handleHideModal = () => {
        setShowModal(false);
    };

    const handleCreationDiagnose = (e) => {
        e.preventDefault();
        async function createDiagnose() {
            try {
                await DiagnoseAPI.createDiagnose({ name: values.name, details: values.details, patientId: props.p.id, doctorId: user.employeeId })
                props.refreshPatient();
                setDiagnoseFieldsAreShown(false);
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
        createDiagnose();
    }
    return (
        <div className="float-right mr-5"><Button class="btn btn-primary m-5 float-right mr-5" style={{ borderRadius: "5px", backgroundColor: "#8DD4F5" }} onClick={() => {
            setDiagnoseFieldsAreShown(!diagnoseFieldsAreShown);
        }}>Create diagnose</Button>


            {diagnoseFieldsAreShown ? <Card className="mx-auto" style={{ width: '38rem' }}>
                <Card.Body>
                    <Card.Title>New diagnose</Card.Title>
                    <Card.Text>
                        Name of the diagnose: <input type="text" placeholder="diagnose" onChange={(e) => {
                            setValues(prevState => ({
                                ...prevState, name: e.target.value
                            }))
                        }} />
                    </Card.Text>
                    <Card.Text>Details: <input type="text" placeholder="details" onChange={(e) => {
                        setValues(prevState => ({
                            ...prevState, details: e.target.value
                        }))
                    }} /></Card.Text>
                    <Button className="m-4" style={{ borderRadius: "10px", backgroundColor: "#8DD4F5" }} onClick={(e) => handleCreationDiagnose(e)}>Save diagnose </Button>
                </Card.Body>
            </Card> : null}
            <CreateConfirmationModal show={showModal} onHide={handleHideModal} />
            <br></br>
            </div>

    )
}

export default CreateDiagnose