import React from "react";
import PropTypes from "prop-types";

const Icon = ({ name, className, onClick }) => (
  <i className={`material-icons ${className || ""}`} onClick={onClick}>
    {name}
  </i>
);

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func
};

export default Icon;
