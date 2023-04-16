import axiosConfig from "./axiosConfig";
import { GetToken } from "../authentication/LocalStorageManager";

const UserPasswordAPI = {
     updatePass: (person) =>
          axiosConfig().put(`/user/pwd/${person.id}`, person, {
               headers: {
                   'Authorization': `Bearer ${GetToken()}`
               }
           })
}

export default UserPasswordAPI;