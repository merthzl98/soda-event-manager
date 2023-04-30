import React from "react";

import "./TableHeader.scss";
import TableTitle from "./TableTitle";
import AddNewButton from "./AddNewButton";

const TableHeader = (props) => {
  return (
    <div className="table-header">
      <TableTitle>{props.title}</TableTitle>
      <AddNewButton toolTip={props.toolTip} showAddModal={props.showAddModal} />
    </div>
  );
};

export default TableHeader;
