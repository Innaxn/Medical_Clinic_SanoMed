import React, { useEffect, useState, useContext } from "react"
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import AppointmentAPI from "../apis/AppointmentAPI";
import UpdateConfirmationModal from "../components/UpdateConfirmationModal"
import { useNavigate, useParams } from 'react-router-dom';
import { DeleteToken } from '../authentication/LocalStorageManager';
import NotAuthorizedPage from "../pages/NotAuthorizedPage";
import TimeslotsAPI from "../apis/TimeslotsAPI";


function UpdateAppointment(props) {
    const [updateFieldsAreShown, setUpdateFieldsAreShown] = useState(false);
    const [errMsg, setErrMsg] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [selectedValue, setSelectedValue] = useState("");
    const [timeslots, setTimeslots] = useState([]);
    const navigate = useNavigate()
    const [date, setDate] = useState("");


    const handleHideModal = () => {
        setShowModal(false);
    };

    const [oldValuesAppointment, setOldValuesAppointment] = useState({
        start: "",
        purpose: "",
        doctorId: ""
    });

    const [newValues, setNewValues] = useState({
        newStart: "",
        newPurpose: "",
        newDoctorId: ""
    });

    useEffect(() => {
        setOldValuesAppointment({
            start: props.a.start, purpose: props.a.purpose, doctorId: props.a.doctor.id
        })
        setNewValues({
            newStart: props.a.start, newPurpose: props.a.purpose,
            newDoctorId: props.a.doctor.id
        })
        setSelectedValue(props.a.start);
    }, [])


    function updateAppointmentFunc() {
        async function updateAppointment() {
            try {
                await AppointmentAPI.updateAppointment({ id: props.a.id, docId: newValues.newDoctorId, patientid: props.a.patient.id, startDate: newValues.newStart, purpose: newValues.newPurpose })
                    .then(props.refreshAppointment());
                setUpdateFieldsAreShown(false);
                setShowModal(true);
            } catch (error) {
                setErrMsg(error.message);
            }
        }
        updateAppointment();
    }


    function getTimeslots() {
        TimeslotsAPI.getTimeslotsForADay(props.a.doctor.id, date)
            .then(appointments => {
                setTimeslots(appointments)
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    DeleteToken();
                    navigate("/login");
                } else if (error.response.status === 403) {
                    <NotAuthorizedPage></NotAuthorizedPage>
                }
                else if (!error?.response) {
                    setErrMsg('No Server Response');
                }
                else {
                }
            })
    }


    const handleUpdate = (e) => {
        e.preventDefault();
        updateAppointmentFunc()
        props.refreshAppointment()
    }

    useEffect(() => {
        getTimeslots();
    }, [date]);

    return (
        <div>
            <Button className="m-3" style={{ borderRadius: "10px", backgroundColor: "#8DD4F5" }} onClick={() => {
                setUpdateFieldsAreShown(!updateFieldsAreShown);
                setNewValues(prevState => ({
                    ...prevState, newPurpose: oldValuesAppointment.purpose, newStart: oldValuesAppointment.start

                }))
            }}>Update appointment</Button>

            {updateFieldsAreShown ?
                <Card className="m-3" style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>Update</Card.Title>
                        <label>{errMsg}</label>
                        <Card.Text>Purpose:
                            <input type="text" value={newValues.newPurpose} onChange={(e) => {
                                setNewValues(prevState => ({
                                    ...prevState, newPurpose: e.target.value
                                }))
                            }} />
                        </Card.Text>

                        <div>
                            <label>Select a day: </label>
                            <input type="date" value={date} onChange={(e) => {
                                setDate(e.target.value);
                                getTimeslots()
                            }} />
                        </div>

                        <Card.Text> Time:
                            <select value={selectedValue} onChange={e => setNewValues(prevState => ({
                                ...prevState, newStart: e.target.value
                            }))}>
                                {timeslots.map(timeslot => (
                                    <option key={timeslot.value} value={timeslot.value}>
                                        {timeslot.startTime}
                                    </option>
                                ))}
                            </select>
                        </Card.Text>
                    </Card.Body>
                </Card>
                : null}
            {updateFieldsAreShown ? <Button className="m-3" style={{ borderRadius: "10px", backgroundColor: "#8DD4F5" }} onClick={(e) => handleUpdate(e)}> Save changes</Button> : null}
            <UpdateConfirmationModal show={showModal} onHide={handleHideModal} />
        </div>
    )
}

export default UpdateAppointment