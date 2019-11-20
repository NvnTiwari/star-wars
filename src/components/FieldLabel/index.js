import React from 'react';
import PropTypes from 'prop-types';

const FieldLabel = ({children}) => {
    return (<div className="field-label has-text-left">
        <label className="label">{children}</label>
    </div>)
}

FieldLabel.propTypes = {
    children: PropTypes.node.isRequired
}

export default FieldLabel;