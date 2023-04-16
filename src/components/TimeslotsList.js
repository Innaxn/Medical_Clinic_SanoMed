import Timeslot from './Timeslot'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App'
import React, { useEffect, useState, useContext } from 'react'
import Moment from 'moment';
import { Navigate, useParams } from 'react-router-dom';
import AppointmentAPI from '../apis/AppointmentAPI';
import Button from 'react-bootstrap/Button';
import NotAuthorizedPage from "../pages/NotAuthorizedPage";
import { DeleteToken } from '../authentication/LocalStorageManager';

function TimeslotsList({ slots, refr }) {
    const navigate = useNavigate()
    const [purpose, setPurpose] = useState("");
    const [startTime, setStartTime] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const { user } = useContext(UserContext)
    //docId
    const { id } = useParams();

    const handleCreation = (e) => {
        e.preventDefault();
        async function createAppointment() {
            console.log(startTime)
          if (startTime === "") {
            console.log("startTime")
            alert("You need to select a timeslot!");
            return;
          }
          try {
            await AppointmentAPI.createAppintment({
              doctorId: id,
              patientId: user.patientId,
              startTime: startTime,
              purpose: purpose
            });
            navigate(`/appointments/${user.patientId}`);
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
        createAppointment();
    }
    const handleStartTime = (event) => {
        if (event && event.target) {
            setStartTime(event.target.value)
        }
    }

    const handleChangePupose = (event) => {
        setPurpose(event.target.value);
    };

    const slotsByDay = {
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: []
    };

    slots.forEach((timeslot) => {
        const day = Moment(timeslot.startTime).format('dddd');
        slotsByDay[day].push(timeslot);
    });



    return (
        <div className='container'>
        <span>{errMsg}</span>
            <form className="row w-100" onSubmit={handleCreation}>
                {Object.keys(slotsByDay).map((day) => (
                    <div className='col-2'>
                        <h3>{day}</h3>
                        <ul>
                            {slotsByDay[day].map((timeslot, index) => (
                                <Timeslot itemKey={index} slotsItem={timeslot} handleStartTime={handleStartTime} day={day} />
                            ))}
                        </ul>
                    </div>
                ))}

                <div className="input-group">
                    <span style={{ backgroundColor: "#8DD4F5" }} className="input-group-text">Write down your concern</span>
                    <textarea required className="form-control" aria-label="With textarea" onChange={handleChangePupose}></textarea>
                </div>
                <hr></hr>
                <div className="d-grid gap-2">
                    <Button type="submit" style={{ backgroundColor: "#8DD4F5" }} className="">
                        Make an appointment
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default TimeslotsList