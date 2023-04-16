import React, { useEffect, useState } from 'react'
import styles from './ProfileSettings.module.css'
import EmployeesAPI from "../apis/EmployeesAPI";
import Password from './Password';
import UpdateConfirmationModal from "../components/UpdateConfirmationModal"
import { DeleteToken } from '../authentication/LocalStorageManager';
import { useNavigate } from 'react-router-dom';


const ProfileSettings = (props) => {
    const navigate = useNavigate()
    const [firstNameFieldIsShown, setfirstNameFieldIsShown] = useState(false)
    const [LastNameieldIsShown, setLastNameFieldIsShown] = useState(false)
    const [emailFieldIsShown, setEmailFieldIsShown] = useState(false)
    const [phoneFieldIsShown, setPhoneFieldIsShown] = useState(false)
    const [descriptionFieldIsShown, setDescriptionFieldIsShown] = useState(false)
    const [showModal, setShowModal] = useState(false);
    const [errMsg, setErrMsg] = useState("")

    const handleHideModal = () => {
        setShowModal(false);
    };

    const [oldValues, setOldValues] = useState({
        oldFirstName: "",
        oldLastName: "",
        oldEmail: "",
        oldPhone: "",
        oldDescription: ""
    });


    const [newValues, setNewValues] = useState({
        newFirstName: "",
        newLastName: "",
        newEmail: "",
        newPhone: "",
        newDescription: ""
    });

    useEffect(() => {
        setOldValues({
            oldFirstName: props.userProfile.person.firstName, oldLastName: props.userProfile.person.lastName, oldEmail: props.userProfile.person.email,
            oldPhone: props.userProfile.person.phoneNumber, oldDescription: props.userProfile.description
        })
        setNewValues({
            newFirstName: props.userProfile.person.firstName, newLastName: props.userProfile.person.lastName, newEmail: props.userProfile.person.email, newPhone: props.userProfile.person.phoneNumber,
            newDescription: props.userProfile.description
        })
    }, [])


    function updateProfileFunc() {
        async function updateEmp() {
            try{
                await EmployeesAPI.updateEmployee({ id: props.userProfile.id, firstName: newValues.newFirstName, lastName: newValues.newLastName, email: newValues.newEmail, phone: newValues.newPhone, description: newValues.newDescription })
                .then(props.refreshProfile())
                .then(window.location.reload())
                setShowModal(true);
                setfirstNameFieldIsShown(false)
                setLastNameFieldIsShown(false)
                setEmailFieldIsShown(false)
                setPhoneFieldIsShown(false)
                setDescriptionFieldIsShown(false)
            }
            catch (error) {
                if (error.message === "This email is already taken") {
                    setErrMsg("This email is already taken");
                } else if (error.message === "ID_NOT_FROM_LOGGED_IN_USER") {
                    DeleteToken();
                    navigate("/login");
                }
                else if (error.response?.status === 401) {
                    DeleteToken();
                    navigate("/login");
                }
                else {
                    console.log(error)
                }
              }
        }
        updateEmp();
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        updateProfileFunc()
        props.refreshProfile();
    }

    

    return (
        <div className={styles.bodyC}>

            <div className={styles.table}>
                <div>
                    <h1>Account Settings</h1>
                    <label>{errMsg}</label>
                </div>
                <br />

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

                        {firstNameFieldIsShown ? <input type="text" value={newValues.newFirstName} onChange={(e) => {
                            setNewValues(prevState => ({
                                ...prevState, newFirstName: e.target.value
                            }))
                        }} /> : null}
                        <hr />
                        <div className={styles.minicontainerdata}>
                            <li className={styles.propertyName}>Last name: {oldValues.oldLastName}</li>
                            <button onClick={() => {
                                setLastNameFieldIsShown(!LastNameieldIsShown);
                                setNewValues(prevState => ({
                                    ...prevState, newLastName: oldValues.oldLastName
                                }))
                            }}>Edit</button>
                        </div>
                        {LastNameieldIsShown ? <input type="text" value={newValues.newLastName} onChange={(e) => {
                            setNewValues(prevState => ({
                                ...prevState, newLastName: e.target.value
                            }))
                        }} /> : null}
                        <hr />

                        <div className={styles.minicontainerdata}>
                            <li className={styles.propertyName}>Email: {oldValues.oldEmail}</li>
                            <button onClick={() => {
                                setEmailFieldIsShown(!emailFieldIsShown);
                                setNewValues(prevState => ({
                                    ...prevState, newEmail: oldValues.oldEmail
                                }))
                            }}>Edit</button>
                        </div>
                        {emailFieldIsShown ? <input type="text" value={newValues.newEmail} onChange={(e) => {
                            setNewValues(prevState => ({
                                ...prevState, newEmail: e.target.value
                            }))
                        }} /> : null}
                        <hr />

                        <div className={styles.minicontainerdata}>
                            <li className={styles.propertyName}>Phone: {oldValues.oldPhone}</li>
                            <button onClick={() => {
                                setPhoneFieldIsShown(!phoneFieldIsShown);
                                setNewValues(prevState => ({
                                    ...prevState, newPhone: oldValues.oldPhone
                                }))
                            }}>Edit</button>
                        </div>
                        {phoneFieldIsShown ? <input type="text" value={newValues.newPhone} onChange={(e) => {
                            setNewValues(prevState => ({
                                ...prevState, newPhone: e.target.value
                            }))
                        }} /> : null}
                        <hr />

                        <div className={styles.minicontainerdata}>
                            <li className={styles.propertyName}>Description: {oldValues.oldDescription}</li>
                            <button onClick={() => {
                                setDescriptionFieldIsShown(!descriptionFieldIsShown);
                                setNewValues(prevState => ({
                                    ...prevState, newDescription: oldValues.oldDescription
                                }))
                            }}>Edit</button>
                        </div>
                        {descriptionFieldIsShown ? <input type="text" value={newValues.newDescription} onChange={(e) => {
                            setNewValues(prevState => ({
                                ...prevState, newDescription: e.target.value
                            }))
                        }} /> : null}
                        <hr />
                    </ul>
                </div>
                <ul className={styles.pwdList}>
                    <Password userProfile={props.userProfile} refr={props.refreshProfile}></Password>
                    <hr />
                </ul>
                <br />
                {LastNameieldIsShown || (firstNameFieldIsShown || (emailFieldIsShown || (phoneFieldIsShown || descriptionFieldIsShown))) ? <button className={styles.btnUpdate} onClick={(e) => handleUpdate(e)}> Update</button> : null}
            </div>
            <UpdateConfirmationModal show={showModal} onHide={handleHideModal} />
        </div >
    )
}

export default ProfileSettings