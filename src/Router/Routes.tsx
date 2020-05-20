import React, { Fragment } from "react"
import { Route } from 'react-router-dom'
import Random from '../page/Random'

const Routes = () => {
  return (
    <Fragment>
        <Route component={Random} path="/random" />  
    </Fragment>
  )
}

export default Routes
