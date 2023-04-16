import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styles from './ProfileSettings.module.css'
import PatientAPI from '../apis/PatientAPI';
import Button from 'react-bootstrap/Button';
import Password from './Password';
import DeletePatient from './DeletePatient';
import UpdateConfirmationModal from "../components/UpdateConfirmationModal"
import { DeleteToken } from '../authentication/LocalStorageManager';


const ProfileSettings = (props) => {
    const [firstNameFieldIsShown, setfirstNameFieldIsShown] = useState(false)
    const [LastNameieldIsShown, setLastNameFieldIsShown] = useState(false)
    const [emailFieldIsShown, setEmailFieldIsShown] = useState(false)
    const [phoneFieldIsShown, setPhoneFieldIsShown] = useState(false)
    const [bsnFieldIsShown, setBsnFieldIsShown] = useState(false)
    const [healthInsFieldIsShown, sethealthInsFieldIsShown] = useState(false)
    let userProfile = props.userProfile;
    const [showModal, setShowModal] = useState(false);
    const [errMsg, setErrMsg] = useState("")

    const handleHideModal = () => {
        setShowModal(false);
    };

    const navigate = useNavigate();
    const navigateToMyRecord = (id) => {
        navigate(`/patients/record/${id}`);
    };
    const navigateToMyAppointments = (id) => {
        navigate(`/appointments/${id}`);
    };

    const [oldValues, setOldValues] = useState({
        oldFirstName: "",
        oldLastName: "",
        oldEmail: "",
        oldPhone: "",
        oldBsn: "",
        oldhealthIns: ""
    });


    const [newValues, setNewValues] = useState({
        newFirstName: "",
        newLastName: "",
        newEmail: "",
        newPhone: "",
        newBsn: "",
        newHealthIns: ""
    });

    useEffect(() => {
        setOldValues({
            oldFirstName: userProfile.person.firstName, oldLastName: userProfile.person.lastName, oldEmail: userProfile.person.email,
            oldPhone: userProfile.person.phoneNumber, oldBsn: userProfile.bsn, oldhealthIns: userProfile.healthInsuranceNumber
        })
        setNewValues({
            newFirstName: userProfile.person.firstName, newLastName: userProfile.person.lastName, newEmail: userProfile.person.email, newPhone: userProfile.person.phoneNumber,
            newBsn: userProfile.bsn, newHealthIns: userProfile.healthInsuranceNumber
        })
    }, [])


    function updateProfileFunc() {
        async function updatePatient() {
            try{
                await PatientAPI.updatePatient({ id: userProfile.id, firstName: newValues.newFirstName, lastName: newValues.newLastName, email: newValues.newEmail, phone: newValues.newPhone, healthInsNum: newValues.newHealthIns })
                .then(props.refreshProfile())
                .then(window.location.reload())
                setShowModal(true); 
                setfirstNameFieldIsShown(false)
                setLastNameFieldIsShown(false)
                setEmailFieldIsShown(false)
                setPhoneFieldIsShown(false)
                setBsnFieldIsShown(false)
                sethealthInsFieldIsShown(false)
            }
            catch (error) {
                if (error.message === "This email is already taken") {
                    setErrMsg("This email is already taken");
                }
                else if (!error?.response) {
                    setErrMsg('No Server Response');
                }
                else if (error.response?.status === 401 || error.message === "ID_NOT_FROM_LOGGED_IN_USER") {
                    DeleteToken();
                    navigate("/login");
                }
                else {
                    console.log(error)
                }
              }
        }
        updatePatient();
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        updateProfileFunc()
    }

    return (
        <div className={styles.bodyC}>
            <h1 className="mb-4">Overview</h1>
            <div className="d-flex justify-content-around">
                <Button className="m-3" style={{ borderRadius: "10px", backgroundColor: "#8DD4F5" }} onClick={() => navigateToMyRecord(userProfile.id)}>My record</Button>
                <Button className="m-3" style={{ borderRadius: "10px", backgroundColor: "#8DD4F5" }} onClick={() => navigateToMyAppointments(userProfile.id)}>My appointments</Button>
                <DeletePatient p={userProfile}></DeletePatient>
            </div>
            <br />

            <div className={styles.table}>
                <div>
                    <h1 className='mb-4'>Account Settings</h1>
                    <label>{errMsg}</label>
                </div>
                <div>
                    <ul className={styles.mainList}>
                        <div className={styles.minicontainerdata}>
                            <li className={styles.propertyName}>First name: {oldValues.oldFirstName}</li>
                            <button onClick={() => {
                                setfirstNameFieldIsShown(!firstNameFieldIsShown);
                                setNewValues(prevState => ({
                                    ...prevState, newFirstName: oldValues.oldFirstName
                                }))
                            }}>Edit</button>
                        </div>
                        <br />
                        {firstNameFieldIsShown ? <input type="text" value={newValues.newFirstName} onChange={(e) => {
                            setNewValues(prevState => ({
                                ...prevState, newFirstName: e.target.value
                            }))
                        }} /> : null}

                        <div className={styles.minicontainerdata}>
                            <li className={styles.propertyName}>Last name: {oldValues.oldLastName}</li>
                            <button onClick={() => {
                                setLastNameFieldIsShown(!LastNameieldIsShown);
                                setNewValues(prevState => ({
                                    ...prevState, newLastName: oldValues.oldLastName
                                }))
                            }}>Edit</button>
                        </div>
                        <br />
                        {LastNameieldIsShown ? <input type="text" value={newValues.newLastName} onChange={(e) => {
                            setNewValues(prevState => ({
                                ...prevState, newLastName: e.target.value
                            }))
                        }} /> : null}
                        <div className={styles.minicontainerdata}>
                            <li className={styles.propertyName}>Email: {oldValues.oldEmail}</li>
                            <button onClick={() => {
                                setEmailFieldIsShown(!emailFieldIsShown);
                                setNewValues(prevState => ({
                                    ...prevState, newEmail: oldValues.oldEmail
                                }))
                            }}>Edit</button>
                        </div>
                        <br />
                        {emailFieldIsShown ? <input type="text" value={newValues.newEmail} onChange={(e) => {
                            setNewValues(prevState => ({
                                ...prevState, newEmail: e.target.value
                            }))
                        }} /> : null}
                        <br />
                        <div className={styles.minicontainerdata}>
                            <li className={styles.propertyName}>Phone: {oldValues.oldPhone}</li>
                            <button onClick={() => {
                                setPhoneFieldIsShown(!phoneFieldIsShown);
                                setNewValues(prevState => ({
                                    ...prevState, newPhone: oldValues.oldPhone
                                }))
                            }}>Edit</button>
                        </div>
                        <br />
                        {phoneFieldIsShown ? <input type="text" value={newValues.newPhone} onChange={(e) => {
                            setNewValues(prevState => ({
                                ...prevState, newPhone: e.target.value
                            }))
                        }} /> : null}

                        <br />
                        <div className={styles.minicontainerdata}>
                            <li className={styles.propertyName}>Bsn: {oldValues.oldBsn}</li>
                        </div>
                        <br />
                        {bsnFieldIsShown ? <input type="text" value={newValues.newBsn} onChange={(e) => {
                            setNewValues(prevState => ({
                                ...prevState, newBsn: e.target.value
                            }))
                        }} /> : null}

                        <br />
                        <div className={styles.minicontainerdata}>
                            <li className={styles.propertyName}>Health insurance number: {oldValues.oldhealthIns}</li>
                            <button onClick={() => {
                                sethealthInsFieldIsShown(!healthInsFieldIsShown);
                                setNewValues(prevState => ({
                                    ...prevState, newHealthIns: oldValues.oldhealthIns
                                }))
                            }}>Edit</button>
                        </div>
                        <br />
                        {healthInsFieldIsShown ? <input type="text" value={newValues.newHealthIns} onChange={(e) => {
                            setNewValues(prevState => ({
                                ...prevState, newHealthIns: e.target.value
                            }))
                        }} /> : null}

                    </ul>
                </div>
                <div>
                    <ul className={styles.pwdList}>
                        <Password userProfile={userProfile}></Password>
                        <hr />
                    </ul>
                </div>
                <br />
                {LastNameieldIsShown || (firstNameFieldIsShown || (emailFieldIsShown || (phoneFieldIsShown || (bsnFieldIsShown || healthInsFieldIsShown)))) ? 
                <Button style={{ borderRadius: "20px", backgroundColor: "#8DD4F5" }} onClick={(e) => handleUpdate(e)}> Update</Button> : null}
            </div>
            <UpdateConfirmationModal show={showModal} onHide={handleHideModal} />
        </div >
    )
}

export default ProfileSettings