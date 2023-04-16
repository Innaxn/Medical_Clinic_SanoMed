import React, { useEffect, useState, useContext } from "react"
import { UserContext } from '../App'
import styles from './ProfileSettings.module.css'
import UserPasswordAPI from '../apis/UserPasswordAPI'
import UpdateConfirmationModal from "../components/UpdateConfirmationModal"
import NotAuthorizedPage from "../pages/NotAuthorizedPage";
import { DeleteToken } from '../authentication/LocalStorageManager';
import { useNavigate } from 'react-router-dom';

function Password({ userProfile, refr }) {
    const { user } = useContext(UserContext)
    const navigate = useNavigate()
    const [PwdFieldIsShown, setPwdFieldIsShown] = useState(false)
    const [errMsg, setErrMsg] = useState("");
    const [showModal, setShowModal] = useState(false);

    const handleHideModal = () => {
        setShowModal(false);
    };

    const [PassValues, setPassValues] = useState({
        oldPwd: "",
        newPwd: "",
        ConfirmNewPwd: "",
    });

    console.log(user)
    const handleUpdate = (e) => {
        e.preventDefault();
        async function updatePass() {

            try {
                await UserPasswordAPI.updatePass({
                    id: userProfile.id, currentPassword: PassValues.oldPwd,
                    newPassword: PassValues.newPwd, role: user.roles.join()
                });
                setShowModal(true);
                refr();
            }
            catch (error) {
                console.log(error)
                if (!error?.response) {
                    setErrMsg('No Server Response');
                }
                else if (error.response?.status === 401 || error.response.data === "ID_NOT_FROM_LOGGED_IN_USER") {
                    DeleteToken();
                    navigate("/login");
                }
                else if (error.response.data === "The input of our old password does not match!") {
                    setErrMsg('The input of our old password is not correct!');
                }
                else if (error.response.status === 403) {
                    <NotAuthorizedPage></NotAuthorizedPage>
                }
                else {
                    console.log(error)
                }
            }
        }


        if (PassValues.newPwd !== "" && PassValues.ConfirmNewPwd !== "" && PassValues.oldPwd !== "") {
            if (PassValues.newPwd === PassValues.ConfirmNewPwd) {
                updatePass();
            }
            else {
                setErrMsg("Passwords don't match!");
            }
        }
    }

    return (
        <div className={styles.minicontainerpwd}>
            <li>Password: ••••••••••</li>
            <button onClick={() => {
                setPwdFieldIsShown(!PwdFieldIsShown);
            }}>Change password</button>
            <br />
            {PwdFieldIsShown ? <> <input type="password" placeholder='Old password' onChange={(e) => {
                setPassValues(prevState => ({
                    ...prevState, oldPwd: e.target.value
                }))
            }}
            />
                <input type="password" placeholder='New password' onChange={(e) => {
                    setPassValues(prevState => ({
                        ...prevState, newPwd: e.target.value
                    }))
                }}
                />
                <input type="password" placeholder='Confirm password' onChange={(e) => {
                    setPassValues(prevState => ({
                        ...prevState, ConfirmNewPwd: e.target.value
                    }))
                }}
                />
                <label>{errMsg}</label>

            </> : null}
            {PwdFieldIsShown ? <button className={styles.btnUpdate} onClick={(e) => handleUpdate(e)}> Update password</button> : null}
            <UpdateConfirmationModal show={showModal} onHide={handleHideModal} />
        </div>
    )
}

export default Password