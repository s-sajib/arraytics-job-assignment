import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
// import { userLoggedIn } from "../features/auth/authSlice";
import { useUserInformationQuery } from "../features/auth/authAPI";

export default function useAuthCheck() {
  const dispatch = useDispatch();
  const [authChecked, setAuthChecked] = useState(false);

  const { data, isSuccess, isLoading } = useUserInformationQuery();

  useEffect(() => {
    if (!isLoading) {
      setAuthChecked(true);
    }
    // if (isSuccess) {
    //   dispatch(userLoggedIn({ ...data }));
    // }
  }, [dispatch, isLoading, isSuccess, data]);

  return authChecked;
}
