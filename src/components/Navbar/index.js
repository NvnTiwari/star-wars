import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

const Navbar = ({ history }) => {
    const attemptLogout = () => {
        localStorage.removeItem('isLoggedIn');
        history.push("/login");
    }

    return (
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <a className="navbar-item">
                    Star Wars
                </a>

                <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div id="navbarBasicExample" className="navbar-menu">
                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="buttons">
                            <a className="button is-light" onClick={attemptLogout}>
                                Logout
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

Navbar.propTypes = {
    history: PropTypes.object.isRequired
}

export default withRouter(Navbar);