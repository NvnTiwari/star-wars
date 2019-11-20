import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import LoginForm from './../../components/LoginForm';
import './Login.scss';

const Login = ({history}) => {
    const [isLoginAttemptSuccess, setState] = useState(true)
    
    const attemptLogin = (username, password) => {
        // if (username === 'Luke Skywalker' && password === '19BBY') {
        if (username === '1' && password === '1') {
            localStorage.setItem('isLoggedIn', true)
            history.push("/search")
        } else {
            setState(false)
        }
    }

    useEffect(() => {
        const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"))
        isLoggedIn && history.push("/search")
    }, [])

    return (
        <div className="login-container">
            <LoginForm isLoginAttemptSuccess={isLoginAttemptSuccess} title="Login Form" onLogin={attemptLogin} />
        </div>
    )
}

LoginForm.propTypes = {
    history: PropTypes.object.isRequired
}

export default withRouter(Login);