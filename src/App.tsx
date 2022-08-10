import React from "react";
import HomeClass from "./pages/Homepage";
import SearchClass from "./components/Searchbar";
import Editclass from "./pages/Editpage";
import AddStudentPage from "./pages/Addpage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

class App extends React.Component {
  obj = {};

  value_input = null;
  getData = (val: any) => {
    // debugger;
    console.log("Sffzsfsf");
    // do not forget to bind getData in constructor
    console.log(val);
    this.value_input = val;
  };
  render() {
    return (
      <Router>
        <div className="App">
          {/* <SearchClass sendData={this.getData} /> */}
          {/* dataFromParent ={this.k}/> */}
          <Routes>
            <Route
              path="/"
              element={<HomeClass dataFromParent={this.value_input} />}
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
