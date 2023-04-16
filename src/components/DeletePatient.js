import React, { useEffect, useState, useContext } from "react"
import Button from 'react-bootstrap/Button';
import PatientAPI from "../apis/PatientAPI";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { useNavigate} from 'react-router-dom';
import { DeleteToken } from "../authentication/LocalStorageManager";
import NotAuthorizedPage from "../pages/NotAuthorizedPage";

function DeletePatient(props) {
    const [errMsg, setErrMsg] = useState("");
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleHideModal = () => {
        setShowModal(false);
    };

    function deletePatient() {
        async function deletePatient() {
            try {
                await PatientAPI.deletePatient(props.p.id)
                    
            }catch (error) {
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
        deletePatient();
    }

    const handleDelete = () => {
        deletePatient()
        navigate(`/login`)
    }

  return (
    <>
    <Button className="m-3" style={{ borderRadius: "10px", backgroundColor: "#E94444" }} 
     onClick={handleShowModal}>Delete profile</Button>
     <DeleteConfirmationModal
         show={showModal}
         onHide={handleHideModal}
         onConfirm={handleDelete}
     />
    </>
  )
}

export default DeletePatient