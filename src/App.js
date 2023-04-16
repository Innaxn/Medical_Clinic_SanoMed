import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './pages/HomePage';
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import NavbarMain from './components/NavbarMain';
import Header from './components/Header';
import Footer from './components/Footer';
import DoctorsPage from './pages/DoctorsPage';
import AboutDoctorPage from './pages/AboutDoctorPage';
import EmployeesPage from './pages/EmployeesPage';
import CreateEmployeePage from './pages/CreateEmployeePage';
import RegistrationPage from './pages/RegistrationPage';
import LoginPage from './pages/LoginPage';
import ProfileSettingsPage from './pages/ProfileSettingsPage';
import PatientsPage from './pages/PatientsPage';
import React, { createContext, useContext, useEffect, useState } from "react"
import jwtDecode from 'jwt-decode';
import RecordPage from './pages/RecordPage';
import { RouteGuardEmployee } from './authentication/RouteGuard';
import MakeAppointmentPage from './pages/MakeAppointmentPage';
import AppointmentPage from './pages/AppointmentPage';
import AppointmnetManagement from './pages/AppointmnetManagement';
import StatisticsPage from './pages/StatisticsPage';
import NewChat from './pages/NewChat';
import PatientChat from './components/PatientChat';

export const UserContext = createContext(null);

const getUser = () => {
  if(localStorage.getItem('jwt')){
    let jwt = localStorage.getItem('jwt')
    let jwtDecoded=jwtDecode(jwt)
    return jwtDecoded
  }
  return undefined
}

function App() {
  const [user, setUser] = useState(getUser());

  return (
    <>
     <UserContext.Provider value={{user, setUser}}>
      <Router>
        <Header/>
        <NavbarMain/>
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/doctors" element={<DoctorsPage />}/>
          <Route path="/doctors/about/:id" element={<AboutDoctorPage />}/>
          <Route path="/employees" element={<RouteGuardEmployee><EmployeesPage/></RouteGuardEmployee>} />
          <Route path="/employees/create" element={<CreateEmployeePage />}/>
          <Route path="/registration" element={<RegistrationPage />}/>
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/profile" element={<ProfileSettingsPage />}/>
          <Route path="/patients" element={<PatientsPage />} />
          <Route path="/patients/record/:id" element={<RecordPage/>}/>
          <Route path="/inboxMsg" element={<NewChat/>}/>
          <Route path="/doctors/appointment/:id" element={<MakeAppointmentPage/>}/>
          <Route path="/appointments/:id" element={<AppointmentPage/>}/>
          <Route path="/appointmentupdate/:id" element={<AppointmnetManagement/>}/>
          <Route path="/statistics" element={<StatisticsPage/>}/>
          <Route path="/newchat" element={<PatientChat/>}/>
        </Routes>
      </Router>
      <Footer/>
      </UserContext.Provider>
      </>
  );
}

export default App;
