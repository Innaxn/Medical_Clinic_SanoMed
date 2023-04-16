import React from 'react'
import { useEffect, useState, useRef, useContext } from 'react'
import { useNavigate } from 'react-router';
import LoginAPI from '../apis/LoginAPI';
import styles from './Login.module.css';
import { UserContext } from '../App'
import jwt_decode from 'jwt-decode'

const Login = () => {
    const { setUser } = useContext(UserContext)

    const navigate = useNavigate();
    const navigateToRegister = () => {
        navigate('/registration');
    };
    const navigateToHome = () => {
        navigate('/');
    };
    const emailRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        emailRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [email, password])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await LoginAPI.login({ email, password });
            console.log(response.accessToken)
            setEmail('');
            setPassword('');
            setErrMsg('');
            localStorage.setItem('jwt', response.accessToken)
            const decoded = jwt_decode(response.accessToken);
            console.log(decoded)
            console.log(decoded.patientId + "id");
            const cUser = {
                email: decoded.sub,
                employeeId: decoded.employeeId,
                patientId: decoded.patientId,
                roles: decoded.roles
            };
            setUser(cUser);
            console.log(cUser)

            navigateToHome('/')
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else if (err.response?.status === 404) {
                setErrMsg('Register first!');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    return (
        <div className="d-flex justify-content-center">
            <div className={styles.container}>
                <h1 className={styles.hOne}>Login</h1>
                <form onSubmit={handleSubmit} className={styles.formL}>
                    <div className={styles.contInfo}>
                        <label className={styles.labelLogin} htmlFor="email">Email:</label>
                        <input className={styles.inputLogin}
                            type="text"
                            id="email"
                            ref={emailRef}
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                        />
                    </div>
                    <div className={styles.contInfo}>
                        <label className={styles.labelLogin} htmlFor="password">Password:</label>
                        <input className={styles.inputLogin}
                            type="password"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                        />
                    </div>
                    <br />
                    <label>{errMsg}</label>
                    <b>
                        <br />
                        <a className={styles.button}
                            onClick={navigateToRegister}>
                            Need an Account?
                        </a>
                    </b>
                    <button className={styles.buttonL}>Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login