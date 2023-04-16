import Patient from "./Patient"

const PatientList = (props) => {

    const patientsArray = Array.from(props.patients);
    const list = [...patientsArray];
   
    return (
        <ul className="p-4 row d-flex justify-content-around">
            {list.map((patient) => (
                <Patient key={patient.id} patient={patient} />
            ))}
        </ul>
        
    )
}
export default PatientList