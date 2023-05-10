import * as React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";

import "./TableTitle.scss";

const TableTitle = (props) => {
  return (
    <Typography className="table-title" component="h2" variant="h6" gutterBottom>
      {props.children}
    </Typography>
  );
};

TableTitle.propTypes = {
  children: PropTypes.node,
};

export default TableTitle;
