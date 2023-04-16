import axiosConfig from "./axiosConfig";
import { GetToken } from "../authentication/LocalStorageManager";

const PrescriptionAPI = {
    createPrescription: (newPrescription) =>
        axiosConfig().post("/prescriptions", newPrescription, {
            headers: {
                'Authorization': `Bearer ${GetToken()}`
            }
        }),

    getPrescriptions: (id) =>
        axiosConfig().get(`/prescriptions/getByDId/${id}`, {
            headers: {
                'Authorization': `Bearer ${GetToken()}`
            }
        })
            .then(response => response.data.prescriptions),
    deletePrescription: (id) =>
        axiosConfig().delete(`/prescriptions/delete/${id}`, {
            headers: {
                'Authorization': `Bearer ${GetToken()}`
            }
        }),
    update: (prescription) =>
        axiosConfig().put(`/prescriptions/${prescription.id}`, prescription, {
            headers: {
                'Authorization': `Bearer ${GetToken()}`
            }
        }),
}

export default PrescriptionAPI;