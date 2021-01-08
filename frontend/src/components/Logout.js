import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Authorize } from '../actions/postActions'
import Axios from 'axios'

function Logout(props) {

    useEffect(() => {

        localStorage.setItem("Login", false);
        props.Authorize(false)


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
    }
}

export default connect(null, mapDispatchToProps)(Logout);
