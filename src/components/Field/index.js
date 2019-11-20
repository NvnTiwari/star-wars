import React from 'react';
import PropTypes from 'prop-types';

const Field = ({ children }) => {
    return (<div className="field">{children}</div>)
}

Field.propTypes = {
    children: PropTypes.node.isRequired
}

export default Field;