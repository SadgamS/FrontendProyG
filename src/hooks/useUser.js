import { useCallback, useState, useContext } from 'react'
import Context from '../context/UserContext'
import apiClient from '../services/api'

export default function useUser() {
  const [estado, setEstado] = useState({ AuthError: false, UnknownError: false })
  const { usuario, setUsuario } = useContext(Context)

  const login = useCallback(
    ({ email, password }) => {
      apiClient.get('/sanctum/csrf-cookie').then((response) => {
        apiClient
          .post('/login', {
            nombre: email,
            password: password,
          })
          .then((response) => {
            if (response.status === 200) {
              // props.login()
              window.sessionStorage.setItem('usuario', JSON.stringify(response.data))
              setEstado({ AuthError: false, UnknownError: false })
              setUsuario(response.data)
            }
          })
          .catch((error) => {
            if (error.response && error.response.status === 422) {
              setEstado({ AuthError: true, UnknownError: false })
            } else {
              setEstado({ AuthError: false, UnknownError: true })
              console.error(error)
            }
          })
      })
    },
    [setUsuario],
  )
  const logout = useCallback(() => {
    apiClient.post('/logout').then((response) => {
      if (response.status === 204) {
        window.sessionStorage.removeItem('usuario')
        setUsuario(null)
        document.cookie = 'laravel_session=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
        document.cookie = 'XSRF-TOKEN=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
      }
    })
  }, [setUsuario])
  return {
    isLogged: Boolean(usuario),
    login,
    logout,
    usuario: usuario,
    errorA: estado.AuthError,
    errorU: estado.UnknownError,
  }
}
