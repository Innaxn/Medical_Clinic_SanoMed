import axiosWithoutInterceptors from './axiosWithoutInterceptors';

const DoctorsAPI = {
    getDocs: () =>
    axiosWithoutInterceptors().get("/employees/roleEmp/status?roleEmp=DOCTOR&status=ACTIVE")
            .then(response => response.data.employees),
    getDocsByName: (ln) =>
    axiosWithoutInterceptors().get(`/employees/lastName` , {
            params: {
                 ln
            }
       })
            .then(response => response.data.employees),
    getDocsById: (id) =>
    axiosWithoutInterceptors().get(`/employees/doctors/${id}`)
            .then(response => response.data)
}

export default DoctorsAPI;