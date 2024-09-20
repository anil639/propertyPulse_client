import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import NavigationBar from "./components/Navbar";
import PropertyListPage from "./pages/PropertyListPage";
import AddPropertyPage from "./pages/AddPropertyPage";
import EditPropertyPage from "./pages/EditPropertyPage";
function App() {
  return (
    <div className="App">
      <NavigationBar />
      <Routes>
        <Route path="/" element={<PropertyListPage />} />
        <Route path="/add" element={<AddPropertyPage />} />
        <Route path="/update/:id" element={<EditPropertyPage />} />
      </Routes>
    </div>
  );
}

export default App;
