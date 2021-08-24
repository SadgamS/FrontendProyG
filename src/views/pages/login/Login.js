import React, { useEffect } from 'react'
import './login.css'
import logo from './img/logo-etv.png'
import apiClient from 'src/services/api'
import useUser from 'src/hooks/useUser'
import { Redirect, useHistory } from 'react-router'

function Login(props) {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [toHome, setToHome] = React.useState(false)
  const [authError, setAuthError] = React.useState(false)
  const [unknownError, setUnknownError] = React.useState(false)
  const { login, isLogged, errorA, errorU, usuario, logout } = useUser()
  const history = useHistory()

  useEffect(() => {
    if (isLogged) {
      history.push('/')
    }
  }, [isLogged, history])

  const handleSubmit = (e) => {
    e.preventDefault()
    setAuthError(false)
    setUnknownError(false)
    login({ email, password })

    // apiClient.get('/sanctum/csrf-cookie').then((response) => {
    //   apiClient
    //     .post('/login', {
    //       nombre: email,
    //       password: password,
    //     })
    //     .then((response) => {
    //       console.log(response.data.user)
    //       if (response.status === 200) {
    //         // props.login()
    //         setToHome(true)
    //       }
    //     })
    //     .catch((error) => {
    //       if (error.response && error.response.status === 422) {
    //         setAuthError(true)
    //       } else {
    //         setUnknownError(true)
    //         console.error(error)
    //       }
    //     })
    // })
  }
  console.log(isLogged, usuario)

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <div className="container-login100">
        <div className="wrap-login100">
          <div className="login100-pic">
            <img src={logo} alt="IMG" />
            <div className="txt2">Empresa de Trasporte de Valores S.A.</div>
          </div>
          <form className="login100-form validate-form" onSubmit={handleSubmit}>
            <span className="login100-form-title">Iniciar Sesión</span>
            <div
              className="wrap-input100 validate-input"
              data-validate="Valid email is required: ex@abc.xyz"
            >
              <input
                className="input100"
                type="text"
                placeholder="Usuario"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <span className="focus-input100" />
              <span className="symbol-input100">
                <i className="fa fa-user" aria-hidden="true" />
              </span>
            </div>
            <div className="wrap-input100 validate-input" data-validate="Password is required">
              <input
                className="input100"
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span className="focus-input100" />
              <span className="symbol-input100">
                <i className="fa fa-lock" aria-hidden="true" />
              </span>
            </div>
            {errorA ? (
              <div className="alert alert-danger txtem">
                Usuario o Contraseña incorrecto, verifique sus datos y vuelva a intentar.
              </div>
            ) : null}
            {errorU ? (
              <div className="alert alert-danger txtem">
                Error al verificar sus datos, vuelva a intentarlo.
              </div>
            ) : null}
            <div className="container-login100-form-btn">
              <button type="submit" className="login100-form-btn">
                Ingresar
              </button>
            </div>
            <div className="txth">Empresa de Trasporte de Valores S.A.</div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
