import "./App.css";
import AppRoutes from "./Routes/AppRoutes";
import useAuthCheck from "./hooks/useAuthCheck";

function App() {
  const authChecked = useAuthCheck();

  return (
    <>{authChecked ? <AppRoutes /> : <div>Checking your identity...</div>}</>
  );
}

export default App;
