import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import PatientAPI from '../apis/PatientAPI';
import CreationRegistrationInput from '../components/CreationRegistrationInput'
import styles from "./RegistrationPage.module.css"
import { DeleteToken } from '../authentication/LocalStorageManager';


function RegistrationPage() {
  const navigate = useNavigate()
  const [errMsg, setErrMsg] = useState("");
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    birthdate: "",
    bsn: "",
    healthInsuranceNumber: ""
  });


  function registration() {
    async function createPatient() {
      try {
        const response = await PatientAPI.createPatient(values);
        navigate("/login");

      } catch (err) {
        if (!err?.response) {
          setErrMsg('No Server Response');
        } 
        else if (err.response.status === 400 && err.response.data === "This email is already taken") {
          setErrMsg('This email is already taken');
        }
        else if (err.response.status === 400 && err.response.data === "The bsn is already used by another user") {
          setErrMsg('The bsn is already used by another user');
        } 
        else if (err.response.status === 400 && err.response.data === "The health insurance number is already used by another user") {
          setErrMsg('The health insurance number is already used by another user');
        } 
        else if (err.response?.status === 401) {
          DeleteToken();
          navigate("/login");
        } 
        else {
          setErrMsg('Try again later');
        }
        console.log(errMsg)
      }
    }
    createPatient();
  }

  const inputs = [
    {
      id: 1,
      name: "firstName",
      type: "text",
      placeholder: "First name",
      label: "First name",
      // required: true,
    },
    {
      id: 2,
      name: "lastName",
      type: "text",
      placeholder: "Last name",
      label: "Last name",
      // required: true,
    },
    {
      id: 3,
      name: "email",
      type: "email",
      placeholder: "Email",
      maxLength: 20,
      errorMessage: "It should be a valid email address!",
      label: "Email",
      // required: true,
    },
    {
      id: 4,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage: "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      // required: true,
    },
    {
      id: 5,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm password",
      errorMessage: "Passwords don't match!",
      label: "Confirm password",
      pattern: values.password,
      // required: true,
    },
    {
      id: 6,
      name: "phoneNumber",
      type: "text",
      placeholder: "Phone number",
      label: "Phone number"
    },
    {
      id: 7,
      name: "birthdate",
      type: "date",
      placeholder: "Birth date",
      label: "Birth date"
    },
    {
      id: 8,
      name: "bsn",
      type: "text",
      placeholder: "BSN",
      minLength: 8, 
      maxLength: 9, 
      errorMessage: "The BSN must be only numbers and be from 8 to 9 chars!",
      label: "BSN",
      pattern: "[0-9]+",
      // required: true,
    },
    {
      id: 9,
      name: "healthInsuranceNumber",
      type: "text",
      placeholder: "HealthInsurance Number",
      minLength: 8, 
      maxLength: 9, 
      errorMessage: "The health insurance number must be only numbers and be from 8 to 9 chars!",
      label: "Health Insurance Number",
      pattern: "[0-9]+",
      // required: true,
    }
  ]

  const handleRegistration = (e) => {
    e.preventDefault();
    registration()
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  };


  return (
    <div className={styles.container}>
      <h1 className={styles.hOne}>Registration</h1>
      <form className={styles.formR} method={'POST'} action={"/"}>
      <label className="text-danger">{errMsg}</label>
        <div className={styles.formInput}>
          {inputs.map((input) => (
            <CreationRegistrationInput key={input.id} {...input} value={values[input.name]} onChange={onChange} />
          ))}
        </div>
        <button className={styles.buttonregistration}
          onClick={(e) => handleRegistration(e)} >registration</button>
      </form>
    </div>
  )
}

export default RegistrationPage