import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
        <a href="#" target="_blank" rel="noopener noreferrer">ETV S.A.</a>
        <span className="ml-1">&copy; 2021 .</span>
      </div>
      <div className="mfs-auto">
        <span className="mr-1">S.A.G.M</span>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
