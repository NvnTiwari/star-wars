import React from 'react';
import PropTypes from 'prop-types';

const Notification = ({ children }) => {
    return (<div className="notification is-warning">
        {children}
    </div>)
}

Notification.propTypes = {
    children: PropTypes.node.isRequired
}

export default Notification;