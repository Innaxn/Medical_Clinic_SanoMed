import React, { useEffect, useState } from "react"
import DoctorList from "../components/DoctorList";
import DoctorsAPI from "../apis/DoctorsAPI";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { DeleteToken } from '../authentication/LocalStorageManager';
import { useNavigate } from 'react-router-dom';
import NotAuthorizedPage from "./NotAuthorizedPage";

function DoctorsPage() {

  const [docs, setDocs] = useState([])
  const [messeage, setMessage] = useState("")
  const navigate = useNavigate()

  const refreshDocs = () => {
    DoctorsAPI.getDocs()
      .then(employees => {
        setDocs(employees)
      })
      .catch((error) => {
        if (error.response.status === 401) {
          DeleteToken();
          navigate("/login");
        }
        else if (error.response.status === 403) {
          <NotAuthorizedPage></NotAuthorizedPage>
       } 
       else{
        console.log(error)
       }
      })
  };

  useEffect(() => {
    refreshDocs();
  }, []);

  const handleSearch = (lastname) => {
    setTimeout(() => {
      DoctorsAPI.getDocsByName(lastname)
        .then(res => {
          setDocs(res)
        })
        .catch((error) => {
          if (error.response.status === 401) {
            DeleteToken();
            navigate("/login");
          }
          else if (error.response.status === 403) {
            <NotAuthorizedPage></NotAuthorizedPage>
         } 
         else{
          console.log(error)
         }
        })
    }, 1000);
  }

  return (
    <Container>
      <Row className="m-2 p-3">
        <form className="form-inline">
          <input className="form-control" type="text" placeholder="Search by last name..." onChange={(e) => handleSearch(e.target.value)} aria-label="Search" />
        </form>
      </Row>
      <DoctorList
        docs={docs} />
    </Container>
  )
}

export default DoctorsPage