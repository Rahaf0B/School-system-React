import React from "react";
import HomePage from "./pages/Homepage";
import SearchClass from "./components/Searchbar";
import EditPage from "./pages/Editpage";
import AddStudentPage from "./pages/Addpage";
import SiteHeader from "./components/SiteHeader";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
          <SiteHeader />
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/Edit/:id" element={<EditPage />}></Route>
            <Route path="/AddNewStudent/" element={<AddStudentPage />}></Route>
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
