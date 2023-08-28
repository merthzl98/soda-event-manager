import { Typography } from "@mui/material";

import ButtonUI from "./ButtonUI";
import "./TableHeader.scss";

const TableHeader = (props) => {
  const { title, label, showAddModal, rightContent } = props;
  return (
    <div className="table-header">
      <Typography component="h5" variant="h5" color="text.primary" gutterBottom>
        {title}
      </Typography>
      {rightContent}
      <ButtonUI label={label} onClick={showAddModal} />
    </div>
  );
};

export default TableHeader;
