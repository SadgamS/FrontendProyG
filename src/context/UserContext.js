import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Context = React.createContext({})

export function UserContextProvider({ children }) {
  const [usuario, setUsuario] = useState(() => window.sessionStorage.getItem('usuario'))

  return <Context.Provider value={{ usuario, setUsuario }}>{children}</Context.Provider>
}

export default Context

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
