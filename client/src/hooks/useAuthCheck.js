import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "../features/auth/authSlice";
import { useUserInformationQuery } from "../features/auth/authAPI";

export default function useAuthCheck() {
  const dispatch = useDispatch();
  const [authChecked, setAuthChecked] = useState(false);

  const { data: user, isSuccess, isLoading } = useUserInformationQuery();

  useEffect(() => {
    if (!isLoading) {
      setAuthChecked(true);
    }
    if (isSuccess) {
      dispatch(userLoggedIn({ user }));
    }
    console.log("user", user);
  }, [dispatch, isLoading, isSuccess, user]);

  return authChecked;
}
