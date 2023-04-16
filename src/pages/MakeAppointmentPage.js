import React, { useEffect, useState } from "react"
import { useParams } from 'react-router-dom';
import TimeslotsList from "../components/TimeslotsList";
import { Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { DeleteToken } from '../authentication/LocalStorageManager';
import NotAuthorizedPage from './NotAuthorizedPage';
import TimeslotsAPI from "../apis/TimeslotsAPI";

function MakeAppointmentPage() {
    const [timeslots, setTimeslots] = useState([])
    const { id } = useParams();
    const navigate = useNavigate()

    const [date, setDate] = useState(new Date());
    

    const handleNextWeek = () => {
        const nextWeek = new Date(date);
        nextWeek.setDate(date.getDate() + 7);
        setDate(nextWeek);
        refreshTimeslots();
    };

    const handlePrevWeek = () => {
        const prevWeek = new Date(date);
        prevWeek.setDate(date.getDate() - 7);
        setDate(prevWeek);
        refreshTimeslots();
    };

    const dayOfWeek = date.getDay();

    if (dayOfWeek !== 1) {
        date.setDate(date.getDate() - (dayOfWeek - 1));
    }

    date.setHours(10);
    date.setMinutes(0);
    date.setSeconds(0);

    const refreshTimeslots = () => {
        TimeslotsAPI.getTimeslots(id, date)
            .then(timeslotsResponse => {
                let timeslotsres = timeslotsResponse.map((timeslot) => { return { ...timeslot, id } })
                setTimeslots(timeslotsres)
                console.log(timeslotsres)
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    DeleteToken();
                    navigate("/login");
                } else if (error.response.status === 403) {
                   <NotAuthorizedPage></NotAuthorizedPage>
                }
                else{
                }
            })
    };

    useEffect(() => {
        refreshTimeslots();
    }, []);



    if (timeslots != undefined)
    return (
        <>
            <div className="d-flex justify-content-around m-4">
                <Button style={{ backgroundColor: "#8DD4F5" }} onClick={() => handlePrevWeek(refreshTimeslots)}>Previous week</Button>
                <Button style={{ backgroundColor: "#8DD4F5" }} onClick={() => handleNextWeek(refreshTimeslots)}>Next week</Button>
            </div>
            <div ><TimeslotsList
                slots={timeslots} refr={refreshTimeslots} /></div>
        </>
    )
}

export default MakeAppointmentPage