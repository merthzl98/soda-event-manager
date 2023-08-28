import { Box, Tooltip } from "@mui/material";

import "./IconButtonUI.scss";

const IconButtonUI = (props) => {
  const { onClick, title, bgColor, children } = props;
  return (
    <Box
      className="out-box"
      sx={{
        backgroundColor: bgColor,
      }}
      onClick={onClick}
    >
      <Tooltip title={title}>{children}</Tooltip>
    </Box>
  );
};

export default IconButtonUI;
