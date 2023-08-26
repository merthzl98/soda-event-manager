import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledButton = styled(Button)({
  textTransform: "none", // Prevents capitalization
  borderRadius: "8px",
  padding: "8px 24px",
});

const ButtonUI = (props) => {
  const { onClick, label, isDisabled, color, width } = props;
  const buttonWidth = width ?? "auto";
  return (
    <StyledButton
      variant="contained"
      color={color}
      onClick={onClick}
      disabled={isDisabled}
      sx={{ width: buttonWidth }}
    >
      {label}
    </StyledButton>
  );
};

export default ButtonUI;
