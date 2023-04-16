import React, { useEffect, useState, useContext } from "react"
import ProfileSettings from '../components/ProfileSettings'
import { UserContext } from '../App'
import PatientAPI from '../apis/PatientAPI';
import ProfilePatient from '../components/ProfilePatient'
import EmployeesAPI from "../apis/EmployeesAPI";

function ProfileSettingsPage() {
  const { user } = useContext(UserContext)
  const [userId, setUserId] = useState(undefined);
  const [userProfile, setUserProfile] = useState(undefined);


  const [isProfileLoaded, setIsProfileLoaded] = useState(false);
  const refreshProfile = () => {
    if (user) {
      if (!isProfileLoaded) {
        setIsProfileLoaded(true)
        if (user.roles.includes("PATIENT")) {
          setUserId(user.patientId);
          PatientAPI.getPatient(user.patientId)
            .then((userProfile1) => {
              setUserProfile(userProfile1)
            })
        } else {
          setUserId(user.employeeId);
          EmployeesAPI.getEmployeesById(user.employeeId)
            .then((userProfile) => {
              setUserProfile(userProfile)
            })
            .catch(error => console.error(error))
        }
      }
    }
  };
  useEffect(() => {
    refreshProfile();
  }, [user]);

  if (userProfile != undefined)
    return (
      <>{user?.roles && user.roles.includes("PATIENT") ? <div>
        <ProfilePatient userProfile={userProfile} refreshProfile={refreshProfile}></ProfilePatient>
      </div> :
        <div>
          {userProfile && (
            <ProfileSettings userProfile={userProfile} refreshProfile={refreshProfile}></ProfileSettings>
          )}
        </div>
      }
      </>
    )
  else return (<h1>Loading</h1>)
}

export default ProfileSettingsPage