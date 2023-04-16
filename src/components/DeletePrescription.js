import React, { useEffect, useState } from "react"
import Button from 'react-bootstrap/Button';
import PrescriptionAPI from '../apis/PrescriptionAPI';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import NotAuthorizedPage from "../pages/NotAuthorizedPage";
import { DeleteToken } from '../authentication/LocalStorageManager';
import { useNavigate } from 'react-router-dom';

function DeletePrescription(props) {
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate()
    const [errMsg, setErrMsg] = useState("")
    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleHideModal = () => {
        setShowModal(false);
    };
    function deletePrescription() {
        async function deletePrescription() {
            try {
                await PrescriptionAPI.deletePrescription(props.p.p.id)
                    .then(props.p.refreshPrescriptions());
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
        deletePrescription();
    }
    const handleDelete = (id) => {
        deletePrescription()
        props.p.refreshPrescriptions();
        console.log(id);
    }
    return (
        <>
            <label>{errMsg}</label>
            <Button style={{ borderRadius: "10px", backgroundColor: "#8DD4F5" }}
                onClick={handleShowModal}>Delete prescription</Button>
            <DeleteConfirmationModal
                show={showModal}
                onHide={handleHideModal}
                onConfirm={handleDelete}
            />
        </>
    )
}

export default DeletePrescription