import axiosConfig from "./axiosConfig";
import { GetToken } from "../authentication/LocalStorageManager";

const StatisticsAPI = {
    getTopEmployees: () =>
        axiosConfig().get(`/employees/topfive`, {
            headers: {
                 'Authorization': `Bearer ${GetToken()}`
            }
       })
            .then(response => response.data),
    getTopPatients: () =>
        axiosConfig().get(`/patients/topfive` , {
            headers: {
                 'Authorization': `Bearer ${GetToken()}`
            }
       })
            .then(response => response.data),
}

export default StatisticsAPI;