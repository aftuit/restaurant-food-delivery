import React from 'react';
import PersonIcon from '@mui/icons-material/Person';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyIcon from '@mui/icons-material/Key';
import { useToken } from '../../../Context/loginContext';
import axios from "axios";
import * as Swal from "sweetalert2";
import { API_URL } from "../../../util/const";
import LoadingButton from '@mui/lab/LoadingButton';
import { Link, useNavigate } from "react-router-dom";

import "./style.scss";
const Login = () => {

  const [loading, setLoading] = React.useState(false)
  const [visible, setVisible] = React.useState(false)
  const [passValue, setPassValue] = React.useState("")

  const [, setToken] = useToken();

  const navigate = useNavigate();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setLoading(true)
    const { username, password } = evt.target.elements;

    axios.post(API_URL + "/auth/login/", {
      username: username.value.trim(),
      password: password.value.trim()
    })
      .then((res) => {
        setLoading(false)
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: "Successfully registered !!!",
          showConfirmButton: false,
          timer: "1000"
        })
        setToken(res.data.token)
     
        window.localStorage.setItem("Token", JSON.stringify(res.data.token));
        navigate("/admin-panel/dashboard")
      
      })
      .catch(err => {
        setLoading(false)
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: "Check username or password !!!",
          showConfirmButton: true
        })
      })
  }

  return (
    <div className="login-wrap">
      <div className="login-card">
        <form onSubmit={handleSubmit}>
          <h2>Admin Panel</h2>

          <div className="form-body">
            <label className='mt-2' htmlFor="login">username</label>
            <div className="d-flex input-wrap">
              <PersonIcon />
              <input className='w-100' required type="text" name="username" placeholder='username' />
            </div>
            <label className='mt-2' htmlFor="password">password</label>
            <div className="d-flex input-wrap w-100 j-between">
              <div className="d-flex w-100">
                <KeyIcon />
                <input
                  value={passValue}
                  onChange={(evt) => setPassValue(evt.target.value)}
                  className='w-100'
                  required
                  type={visible ? "text" : "password"}
                  name="password"
                  placeholder='password' />
              </div>
              {
                passValue.length > 0 &&
                <>
                  {
                    !visible ?
                    <VisibilityOffIcon onClick={() => setVisible(!visible)} />:
                      <VisibilityIcon onClick={() => setVisible(!visible)} /> 
                  }
                </>
              }
            </div>
          </div>
          <LoadingButton
            className="w-100 mt-3"
            type="submit"
            loading={loading}
            loadingPosition="end"
            endIcon={<ChevronRightIcon />}
            variant="contained"

          >
            Submit
          </LoadingButton>
        <Link to="/" className='d-flex a-center'><KeyboardArrowLeftIcon/> Back to home</Link>
        </form>

      </div>
    </div>
  )
}

export default Login;