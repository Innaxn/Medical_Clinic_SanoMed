import jwt_decode from 'jwt-decode'
export function SaveToken(token) {
    localStorage.setItem('jwt', token);
}

export function GetToken() {
    return localStorage.getItem('jwt');
}

export function DeleteToken() {
    localStorage.removeItem('jwt')
    localStorage.removeItem("employeeId")
    localStorage.removeItem("patientId")
    localStorage.removeItem('roles')
}