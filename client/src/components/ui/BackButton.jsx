import { useLocation, useNavigate } from "react-router-dom";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton, Typography } from "@mui/material";

function BackButton() {
  const navigate = useNavigate();
  const location = useLocation();

  function handleClick() {
    navigate(-1);
  }

  return (
    location.pathname !== "/" && (
      <IconButton onClick={handleClick}>
        <ArrowBackIcon />{" "}
        <Typography variant="button" fontSize="small">
          Back
        </Typography>
      </IconButton>
    )
  );
}

export default BackButton;
