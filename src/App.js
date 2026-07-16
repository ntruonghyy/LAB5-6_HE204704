import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EmployeeList from "./components/EmployeeList";
import CreateEmployee from "./components/CreateEmployee";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<EmployeeList />} />
                <Route path="/employees" element={<EmployeeList />} />
                <Route path="/employees/create" element={<CreateEmployee />} />
            </Routes>
        </BrowserRouter>
    );
}
export default App;