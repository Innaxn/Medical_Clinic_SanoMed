import React, { useEffect, useState, useContext } from "react"
import { useNavigate, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import AppointmentAPI from "../apis/AppointmentAPI";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { DeleteToken } from "../authentication/LocalStorageManager";
import NotAuthorizedPage from "../pages/NotAuthorizedPage";

function DeleteAppointment(props) {
    const [errMsg, setErrMsg] = useState("");
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const idp = 0;
    if(props.appoint !== undefined){
        idp = props.a.patient.id
    }

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleHideModal = () => {
        setShowModal(false);
    };

    function deleteAppointment() {
        async function deleteAppointment() {
            try {
                await AppointmentAPI.deleteAppointment(props.a.id)
                
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
        deleteAppointment();
    }

    const handleDelete = (id) => {
        deleteAppointment();
        navigate(`/appointments/${id}`)
    }

  return (
    <>
    <Button className="m-3" style={{ borderRadius: "10px", backgroundColor: "#8DD4F5" }} 
     onClick={handleShowModal}>Delete appointment</Button>
     <DeleteConfirmationModal
         show={showModal}
         onHide={handleHideModal}
         onConfirm={() => handleDelete(props.a.patient.id)}
     />
    </>
  )
}

export default DeleteAppointment