import axiosConfig from "./axiosConfig";
import { GetToken } from "../authentication/LocalStorageManager";

const DiagnoseAPI = {
    createDiagnose: (newDiagnose) =>
        axiosConfig().post("/diagnosis", newDiagnose, {
            headers: {
                'Authorization': `Bearer ${GetToken()}`
            }
        }),
    deleteDiagnose: (id) =>
        axiosConfig().delete(`/diagnosis/delete/${id}`, {
            headers: {
                'Authorization': `Bearer ${GetToken()}`
            }
        }),
    update: (diagnose) =>
        axiosConfig().put(`/diagnosis/${diagnose.id}`, diagnose, {
            headers: {
                'Authorization': `Bearer ${GetToken()}`
            }
        }),
}

export default DiagnoseAPI;