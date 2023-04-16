import axiosConfig from "./axiosConfig";
import { GetToken } from "../authentication/LocalStorageManager";


const AppointmentAPI = {
    createAppintment: (newAppointment) =>
        axiosConfig().post("/appointments", newAppointment, {
            headers: {
                'Authorization': `Bearer ${GetToken()}`
            }
        }),
    getAppointmentById: (id) =>
        axiosConfig().get(`/appointments/${id}`, {
            headers: {
                'Authorization': `Bearer ${GetToken()}`
            }
        }).then(response => response.data),
    getAppointmentByDocIdAndDate: (id, date) =>
        axiosConfig().get(`/appointments/doc/${id}/date`, {
            params: {
                date
            },
            headers: {
                'Authorization': `Bearer ${GetToken()}`
            }
        }).then(response => response.data.appointments),
    getAppointmentByPatientIdAndDate: (id, date) =>
        axiosConfig().get(`/appointments/patient/${id}/date`, {
            params: {
                date
            },
            headers: {
                'Authorization': `Bearer ${GetToken()}`
            }
        }).then(response => response.data.appointments),
    deleteAppointment: (id) =>
        axiosConfig().delete(`/appointments/delete/${id}`, {
            headers: {
                'Authorization': `Bearer ${GetToken()}`
            }
        }),
    updateAppointment: (appointment) =>
        axiosConfig().put(`/appointments/update/${appointment.id}`, appointment, {
            headers: {
                'Authorization': `Bearer ${GetToken()}`
            }
        })
    
}

export default AppointmentAPI;