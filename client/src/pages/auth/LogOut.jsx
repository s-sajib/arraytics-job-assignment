import { useNavigate } from "react-router";
import { useLogoutQuery } from "../../features/auth/authAPI";
import { useEffect } from "react";

function LogOut() {
  const navigate = useNavigate();
  const { data, isSuccess, isError, error } = useLogoutQuery();

  useEffect(() => {
    console.log(data);
    if (isSuccess) navigate("/login");
    if (isError) console.log(error);
  }, [isSuccess, isError, navigate, error, data]);

  return <div>Logging Out...</div>;
}

export default LogOut;
