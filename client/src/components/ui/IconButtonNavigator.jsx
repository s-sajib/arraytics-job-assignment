/* eslint-disable react/prop-types */
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router";
import EditIcon from "@mui/icons-material/Edit";

function IconButtonNavigator({ link }) {
  const navigate = useNavigate();
  return (
    <IconButton onClick={() => navigate(link)}>
      <EditIcon />
    </IconButton>
  );
}
export default IconButtonNavigator;
