import React from 'react';
import PropTypes from 'prop-types';

const TextField = ({placeholder = '', type = 'text', className = '', onChange, name = '', value='' }) => {
    return (
        <div className="control">
            <input
                className={`input ${className}`}
                type={type}
                onChange={onChange}
                placeholder={placeholder}
                name={name}
                value={value}
            />
        </div>
    )
}

TextField.propTypes = {
    placeholder: PropTypes.string,
    type: PropTypes.string.isRequired,
    className: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func.isRequired,
}

TextField.defaultProps = {
    label: '',
    placeholder: '',
    className: '',
    onChange: () => {},
    name: ''
}

export default TextField