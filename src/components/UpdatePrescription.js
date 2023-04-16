import React, { useEffect, useState, useContext } from "react"
import { UserContext } from '../App'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import PrescriptionAPI from "../apis/PrescriptionAPI";
import UpdateConfirmationModal from "../components/UpdateConfirmationModal"
import NotAuthorizedPage from "../pages/NotAuthorizedPage";
import { DeleteToken } from '../authentication/LocalStorageManager';
import { useNavigate } from 'react-router-dom';

function UpdatePrescription(props) {
    const { user } = useContext(UserContext)
    const navigate = useNavigate()
    const [prescriptionFieldsShown, setprescriptionFieldsShown] = useState(false)
    const [errMsg, setErrMsg] = useState("");
    const today = new Date().toISOString().slice(0, 10);
    const [showModal, setShowModal] = useState(false);

    const handleHideModal = () => {
        setShowModal(false);
    };

    const [oldValuesPrescription, setOldValuesPrescription] = useState({
        start: "",
        end: "",
        medication: ""
    });

    const [newValues, setNewValues] = useState({
        newStart: "",
        newEnd: "",
        newMedication: ""
    });

    useEffect(() => {
        setOldValuesPrescription({
            start: props.p.p.start, end: props.p.p.end, medication: props.p.p.medication
        })
        setNewValues({
            newStart: props.p.p.start, newEnd: props.p.p.end,
            newMedication: props.p.p.medication
        })
    }, [])

    function updatePrescriptionFunc(refreshPrescriptions) {
        async function updatePrescription() {
          try {
            await PrescriptionAPI.update({
              id: props.p.p.id,
              start: newValues.newStart,
              end: newValues.newEnd,
              medication: newValues.newMedication,
              doctorId: user.employeeId,
            });
            setprescriptionFieldsShown(false);
            setShowModal(true);
            refreshPrescriptions();
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
        updatePrescription();
      }
      
      const handleUpdate = (e) => {
        e.preventDefault();
        updatePrescriptionFunc(props.p.refreshPrescriptions);
      };

    return (
        <div><Button className="m-3" style={{ borderRadius: "10px", backgroundColor: "#8DD4F5" }} onClick={() => {
            setprescriptionFieldsShown(!prescriptionFieldsShown);
            setNewValues(prevState => ({
                ...prevState, newStart: oldValuesPrescription.start, newEnd: oldValuesPrescription.end,
                newMedication: oldValuesPrescription.medication
            }))
        }}>Update prescription</Button>

            {prescriptionFieldsShown ?
                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>Update</Card.Title>
                        <label>{errMsg}</label>
                        <Card.Text>Medication:
                            <input type="text" value={newValues.newMedication} onChange={(e) => {
                                setNewValues(prevState => ({
                                    ...prevState, newMedication: e.target.value
                                }))
                            }} />
                        </Card.Text>
                        <Card.Text>Start date of intake:
                            <input type="date" min={today} value={newValues.newStart} onChange={(e) => {
                                setNewValues(prevState => ({
                                    ...prevState, newStart: e.target.value
                                }))
                            }} />
                        </Card.Text>
                        <Card.Text>End date of intake:
                            <input type="date" min={today} value={newValues.newEnd} onChange={(e) => {
                                setNewValues(prevState => ({
                                    ...prevState, newEnd: e.target.value
                                }))
                            }} />
                        </Card.Text>
                    </Card.Body>
                </Card>

                : null}
            {prescriptionFieldsShown ? <Button style={{ borderRadius: "10px", backgroundColor: "#8DD4F5" }} onClick={(e) => handleUpdate(e)}> Save changes</Button> : null}
            <UpdateConfirmationModal show={showModal} onHide={handleHideModal} />
        </div>
    )
}

export default UpdatePrescription