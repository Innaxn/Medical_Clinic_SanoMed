import React, { useEffect, useState } from "react"
import EmployeesAPI from "../apis/EmployeesAPI";
import CreationRegistrationInput from "../components/CreationRegistrationInput";
import styles from "./CreateEmployeePage.module.css"
import CreateConfirmationModal from "../components/CreateConfirmationModal ";
import { useNavigate, useParams } from 'react-router-dom';
import { DeleteToken } from '../authentication/LocalStorageManager';

function CreateEmployeePage() {
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    birthdate: "",
    description: "",
    role: ""
  });

  const handleHideModal = () => {
    setShowModal(false);
};

  function addEmployee() {
    async function createEmployee() {
      try {
        const response = await EmployeesAPI.createEmployee(values);
        setShowModal(true);
        setValues({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
          phoneNumber: "",
          birthdate: "",
          description: "",
          role: ""
        });
      }catch (err) {
        console.log(err.response.data)
        if (!err?.response) {
            setErrMsg('No Server Response');
        } else if (err.response.status === 400 && err.response.data==="This email is already taken") {
            setErrMsg('This email is already taken');
        } else if (err.response?.status === 401) {
          DeleteToken();
          navigate("/login");
        } else {
            setErrMsg('Try again later');
        }
        console.log(errMsg)
      }
    }
    createEmployee();
  }
  
  const inputs = [
    {
      id: 1,
      name: "firstName",
      type: "text",
      placeholder: "First name",
      label: "First name",
      required: true,
    },
    {
      id: 2,
      name: "lastName",
      type: "text",
      placeholder: "Last name",
      label: "Last name",
      required: true,
    },
    {
      id: 3,
      name: "email",
      type: "email",
      placeholder: "Email",
      maxLength: 20,
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },
    {
      id: 4,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage: "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      id: 5,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm password",
      errorMessage: "Passwords don't match!",
      label: "Confirm password",
      pattern: values.password,
      required: true,
    },
    {
      id:6,
      name: "phoneNumber",
      type: "text",
      placeholder: "Phone number",
      label: "Phone number"
    },
    {
      id:7,
      name: "birthdate",
      type: "date",
      placeholder: "Birth date",
      label: "Birth date"
    },
    {
      id: 8,
      name: "description",
      type: "text",
      placeholder: "Description",
      label: "Description",
      required: true,
    },
  ]

  const handleCreation = (e) => {
    e.preventDefault();
    addEmployee()
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  };


  return (
    <>
    <div className={styles.container}>
      <h1 className={styles.hOne} >Add new employee</h1>
      <form className={styles.formR} method={'POST'} action={"/"}>
      <label className="text-danger">{errMsg}</label>
        <div className={styles.formInput}>
        {inputs.map((input) => (
          <CreationRegistrationInput key={input.id} {...input} value={values[input.name]} onChange={onChange} />
        ))}
        </div>
        <div className={styles.selectInput}>
        <label>Role</label>
        <select className={styles.selectStatus} name={'role'} onChange={(e) => onChange(e)}>
          <option value="DOCTOR">Doctor</option>
          <option value="SECRETARY">Secretary</option>
        </select>
        </div>
        <button className={styles.buttonEmployee}
         onClick={(e) => handleCreation(e)} >Add new employee</button>
      </form>
    </div>
      <CreateConfirmationModal show={showModal} onHide={handleHideModal} />
      </>
  )
}

export default CreateEmployeePage