import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import EmployeeList from '../components/EmployeeList';
import EmployeesAPI from '../apis/EmployeesAPI';
import { DeleteToken } from '../authentication/LocalStorageManager';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import NotAuthorizedPage from './NotAuthorizedPage';


function EmployeesPage() {
  const [employees, setEmployees] = useState([])
  const [role, setRole] = useState("");
  const navigate = useNavigate()
  const refreshEmloyees = () => {
    EmployeesAPI.getFiveEmployees()
      .then(employees => {
        setEmployees(employees)
        console.log(employees)
      })
      .catch((error) => {
        if (error.response.status === 401) {
          DeleteToken();
          navigate("/login");
        } else if (error.response.status === 403) {
          <NotAuthorizedPage></NotAuthorizedPage>
        }
        else {
          console.log(error)
        }

      })
  };

  useEffect(() => {
    refreshEmloyees();
  }, []);

  const onChange = (e) => {
    EmployeesAPI.getEmployeesByRole(e.target.value)
      .then(employees => {
        setEmployees(employees)
      })
      .catch((error) => {
        console.log(error)
        if (error.response.status === 401) {
          DeleteToken();
          navigate("/login");
        } else if (error.response.status === 403) {
          <NotAuthorizedPage></NotAuthorizedPage>
        }
      })
  };

  return (

      <div className="container text-center">
        <div className="row p-4">
            <label>Search by role</label>
            <br />
            <select name={'role'} onChange={(e) => onChange(e)}>
              <option value="DOCTOR">Doctor</option>
              <option value="SECRETARY">Secretary</option>
            </select>
        </div>
          <EmployeeList
            employees={employees} refr={refreshEmloyees} />
      </div>

  )
}

export default EmployeesPage

