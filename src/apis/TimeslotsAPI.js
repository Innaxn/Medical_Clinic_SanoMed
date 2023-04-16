import axiosConfig from "./axiosConfig";
import { GetToken } from "../authentication/LocalStorageManager";


const TimeslotsAPI = {
    getTimeslots: (docId, date) =>
        axiosConfig().get(`timeslots/${docId}`, {
            params: {
                date
            },
            headers: {
                'Authorization': `Bearer ${GetToken()}`
            }
        })
            .then(response => response.data),
    getTimeslotsForADay: (docId, date) =>
        axiosConfig().get(`/timeslots/day/${docId}`, {
            params: {
                date
            },
            headers: {
                'Authorization': `Bearer ${GetToken()}`
            }
        })
            .then(response => response.data)

}

export default TimeslotsAPI;