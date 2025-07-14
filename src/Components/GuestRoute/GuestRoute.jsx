import Style from './GuestRoute.module.css'
import { Navigate } from "react-router-dom";
export default function GuestRoute(props) {

  if (localStorage.getItem('userToken')!==null) {
    return <Navigate to="/" replace />;
  }

  return props.children;
}