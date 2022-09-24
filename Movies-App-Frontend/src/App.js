import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Routing from "./components/Routes";
import AuthProvider from "./context/AuthProvider";
import "bootstrap/dist/css/bootstrap.min.css";


function App() {
  return (
    <div className="cont">
      <AuthProvider>
        <div className="cont2">
        <Routing />
        </div>
      </AuthProvider>
    </div>
  );
}

export default App;
