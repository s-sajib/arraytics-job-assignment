import { useNavigate } from "react-router";
import { useLogoutQuery } from "../../features/auth/authAPI";
import { useEffect } from "react";

function LogOut() {
  const navigate = useNavigate();
  const { isSuccess, isError, error } = useLogoutQuery();

  useEffect(() => {
    if (isSuccess) navigate("/");
    if (isError) console.log(error);
  }, [isSuccess, isError, navigate, error]);

  return <div>Logging Out...</div>;
}

export default LogOut;
