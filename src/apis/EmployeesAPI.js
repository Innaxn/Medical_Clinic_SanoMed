import axiosConfig from "./axiosConfig";
import { GetToken } from "../authentication/LocalStorageManager";

// const axiosInstance = axiosConfig();

// axiosInstance.interceptors.request.use(config => {
//   console.log('Request config:', config);
//   return config;
// });

// axiosInstance.interceptors.response.use(
//     (response) => {
//       return response;
//     },
//     (error) => {
//       if (error.response.status === 401) {
//         window.location('/login');
//       }
//       return Promise.reject(error);
//     }
//   );


const EmployeesAPI = {
    createEmployee: (newEmployee) =>
    axiosConfig().post("/employees", newEmployee, {
            headers: {
                'Authorization': `Bearer ${GetToken()}`
            }
        }),
    getFiveEmployees: () =>
    axiosConfig().get(`/employees/getfive`)
        .then(response => response.data.employees),
    getEmployeesByRole: (role) =>
    axiosConfig().get("/employees/role", {
            params: {
                role
            },
            headers: {
                'Authorization': `Bearer ${GetToken()}`
            }
        })
            .then(response => response.data.employees),

    getEmployeesById: (id) =>
    axiosConfig().get(`/employees/${id}`, {
            headers: {
                'Authorization': `Bearer ${GetToken()}`
            }
        })
            .then(response => response.data),
    deleteEmployee: (id) =>
    axiosConfig().delete(`/employees/delete/${id}`, {
            headers: {
                'Authorization': `Bearer ${GetToken()}`
            }
        }),
    updateEmployee: (newEmployee) =>
    axiosConfig().put(`/employees/${newEmployee.id}`, newEmployee, {
            headers: {
                'Authorization': `Bearer ${GetToken()}`
            }
        }),
    updateEmployeeStatus:(emp)=>
    axiosConfig().put(`/employees/status/${emp.id}`, emp, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${GetToken()}`
        }
    })
}

export default EmployeesAPI;