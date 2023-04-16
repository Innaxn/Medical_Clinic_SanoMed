import React, { useEffect, useState, useContext } from "react"
import Button from 'react-bootstrap/Button';
import DiagnoseAPI from "../apis/DiagnoseAPI";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { useNavigate} from 'react-router-dom';
import { DeleteToken } from "../authentication/LocalStorageManager";
import NotAuthorizedPage from "../pages/NotAuthorizedPage";

function DeleteDiagnose(props) {
    const [errMsg, setErrMsg] = useState("");
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleHideModal = () => {
        setShowModal(false);
    };

    function deleteDiagnose() {
        async function deleteDiagnose() {
            try {
                await DiagnoseAPI.deleteDiagnose(props.d.id)
                    .then(props.refr());
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
        deleteDiagnose();
    }

    const handleDelete = () => {
        deleteDiagnose()
        props.refr()
    }

  return (
    <>
    <Button className="m-3" style={{ borderRadius: "10px", backgroundColor: "#8DD4F5" }} 
     onClick={handleShowModal}>Delete diagnose</Button>
     <DeleteConfirmationModal
         show={showModal}
         onHide={handleHideModal}
         onConfirm={handleDelete}
     />
    </>
  )
}

export default DeleteDiagnose