import { Navigate } from "react-router-dom"
import { ComponentProps, UserProps} from "../utils/type"

const PrivateRoute = ({Children , User}:ComponentProps & UserProps) => {
  return User ? Children : <Navigate to="/signin"/>

}

export default PrivateRoute