import React from 'react';
import PropTypes from 'prop-types';

import './Button.scss'

const Button = ({
    className = '',
    onClick,
    children
}) => {
    return (<button
        className={`button is-uppercase ${className}`}
        onClick={onClick}
    >
        {children}
    </button>)
}

Button.propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    children: PropTypes.func.isRequired,
}

Button.defaultProps = {
    className: ''
}

export default Button;