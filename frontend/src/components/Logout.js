import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Admin, Authorize } from '../actions/postActions'
import Axios from 'axios'

function Logout(props) {

    useEffect(() => {

        localStorage.setItem("Login", false);
        localStorage.setItem("Admin", false);
        props.Authorize(false)
        props.Admin(false)


    }, [])

    return (
        <div>
            Logout!
        </div>
    )
}
const mapDispatchToProps = (dispatch) => {
    return {
        Authorize: (auth) => { dispatch(Authorize(auth)); },
        Admin: (admin) => { dispatch(Admin(admin)); },
    }
}

export default connect(null, mapDispatchToProps)(Logout);
