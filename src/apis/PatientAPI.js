import axiosConfig from "./axiosConfig";
import { GetToken } from "../authentication/LocalStorageManager";
import axiosWithoutInterceptors from './axiosWithoutInterceptors';

const PatientAPI = {
     createPatient: (newPatient) =>
     axiosWithoutInterceptors().post("/patients", newPatient),
     deletePatient: (id) =>
         axiosConfig().delete(`/patients/delete/${id}`, {
             headers: {
                 'Authorization': `Bearer ${GetToken()}`
             }
         }),
     getPatients: () =>
          axiosConfig().get(`/patients`, {
               headers: {
                    'Authorization': `Bearer ${GetToken()}`
               }
          })
               .then(response => response.data),

     getPatient: (id) =>
          axiosConfig().get(`/patients/get/${id}`, {
               headers: {
                    'Authorization': `Bearer ${GetToken()}`
               }
          })
               .then(response => response.data),

     getPatientsByBsn: (bsn) =>
          axiosConfig().get(`/patients/getByBsn`, {
               params: {
                    bsn
               },
               headers: {
                    'Authorization': `Bearer ${GetToken()}`
               }
          })
               .then(response => response.data),

     updatePatient: (patient) =>
          axiosConfig().put(`/patients/${patient.id}`, patient, {
               headers: {
                    'Authorization': `Bearer ${GetToken()}`
               }
          }),

     updatePass: (patient) =>
          axiosConfig().put(`/patient/pwd/${patient.id}`, patient, {
               headers: {
                    'Authorization': `Bearer ${GetToken()}`
               }
          } )

}

export default PatientAPI;