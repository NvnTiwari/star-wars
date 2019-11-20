import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Field from './../Field';
import FieldLabel from './../FieldLabel';
import TextField from './../TextField';
import Button from './../Button';
import Notification from './../Notification';

const LoginForm = ({title = '', isLoginAttemptSuccess = true, onLogin}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const changeHandler = (event) => {
        const {name, value} = event.target
        if (name === 'username') {
            setUsername(value)
        } else {
            setPassword(value)
        }
    }

    const clickHandler = () => {
        onLogin(username, password)
    }

    return (
        <div className="card login-form">
            <div className="section">
                {!isLoginAttemptSuccess && <Notification>Either username or password is incorrect.</Notification>}
                <div className="title is-size-4 has-text-centered is-uppercase">{title}</div>
                <Field>
                    <FieldLabel>Username</FieldLabel>
                    <TextField
                        type='text'
                        placeholder='Username'
                        name='username'
                        onChange={changeHandler}
                        value={username}
                    />
                </Field>
                <Field>
                    <FieldLabel>Password</FieldLabel>
                    <TextField
                        type='password'
                        placeholder='Password'
                        name='password'
                        onChange={changeHandler}
                        value={password}
                    />
                </Field>
                <Field>
                    <Button className="is-primary has-fullwidth" onClick={clickHandler}>Log In</Button>
                </Field>
            </div>
        </div>
    )
}

LoginForm.propTypes = {
    title: PropTypes.string.isRequired,
    isLoginAttemptSuccess: PropTypes.bool,
    onLogin: PropTypes.func.isRequired
}

LoginForm.defaultProps = {
    isLoginAttemptSuccess: true
}

export default LoginForm