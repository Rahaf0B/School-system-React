import React from "react";
import HomeClass from "./pages/Homepage";
import SearchClass from "./components/Searchbar";
import Editclass from "./pages/Editpage";
import AddStudentPage from "./pages/Addpage";
import SiteHeader from "./components/SiteHeader";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

class App extends React.Component {
 
  render() {
    return (
      <Router>
        <div className="App">
        <SiteHeader />
          {/* <SearchClass sendData={this.getData} /> */}
          {/* dataFromParent ={this.k}/> */}
          <Routes>
            <Route
              path="/"
              element={<HomeClass  />}
            ></Route>
            <Route path="/Edit/:id" element={<Editclass />}></Route>
            <Route path="/AddNewStudent/" element={<AddStudentPage />}></Route>
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
