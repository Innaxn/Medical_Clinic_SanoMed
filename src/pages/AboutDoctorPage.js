import React, { useEffect, useState, useContext } from 'react'
import Image from "../components/images/man.jpg";
import styles from "./AboutDoctorPage.module.css"
import { useNavigate, useParams } from 'react-router-dom';
import DoctorsAPI from '../apis/DoctorsAPI';
import { UserContext } from '../App'
import { DeleteToken } from '../authentication/LocalStorageManager';
import NotAuthorizedPage from './NotAuthorizedPage';

function AboutDoctorPage() {
    const { user } = useContext(UserContext)
    const [doctor, setDoc] = useState({})
    const { id } = useParams();
    const navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState("")

    const navigateToMakeAppointment = (id) => {
        navigate(`/doctors/appointment/${id}`);
    };

    function handleClick() {
      if (user===undefined) {
        navigate('/login');
      } else {
        navigateToMakeAppointment(id)
      }
    }
    const refreshDocs = () => {
        if (id !== undefined) {
            DoctorsAPI.getDocsById(id)
                .then(doctor => {
                    setDoc(doctor)
                })
                .catch((error) => {
                    if (error.response.status === 401) {
                        DeleteToken();
                        navigate("/login");
                    } else if (error.response.status === 403) {
                        <NotAuthorizedPage></NotAuthorizedPage>
                    }
                    else{
                        console.log(error)
                    }
                })
        }
    };

    useEffect(() => {
        refreshDocs();
    }, [id]);

    if (doctor.person != undefined)
        return (

            <div className={styles.container}>
                <div className={styles.Names}>
                    <h2>Names: {doctor.person.firstName} {doctor.person.lastName}</h2>
                    <h3>Contact: {doctor.person.email}</h3>
                    <p>Description: {doctor.description}
                    </p>

                    <div>
                        <button className={styles.buttonAboutPage}
                            onClick={handleClick}>
                            Make appointment
                        </button>
                    </div>

                </div>
                <div className={styles.img}>
                    <img src={Image} alt="pic" height={190} ></img>
                </div>

            </div>
        )
        else return(
            <h1>LOADING</h1>
        )
}

export default AboutDoctorPage