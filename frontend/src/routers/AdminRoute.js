import React from 'react'
import { connect } from 'react-redux'
import {Route, Redirect} from "react-router-dom"

export const AdminRoute = ({
    isAdmin,
    component: Component,
    ...rest
}) => (
    <Route {...rest} component={(props) => (
        isAdmin ? (
            <Component {...props} />
        ):(
            <Redirect to="/" />
        )
    )} />
      
) 


const mapStateToProps = (state) => ({
    isAuthenticated: state.auth,
    isAdmin: state.admin,
})

export default connect(mapStateToProps)(AdminRoute)