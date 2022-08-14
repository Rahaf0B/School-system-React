import { keyboard } from "@testing-library/user-event/dist/keyboard";
import React from "react";

import { geInputPropsForTextField } from "../components/utils";

class AddStudentPage extends React.Component {
  state = {
    message: [],
    keyOfData: [],
  };

  componentDidMount = async () => {
    const newFill = Array(6).fill("");
    const newFill0 = Array(6).fill("");
    let keysVlaueOFStudentData = [
      "st_name",
      "st_Email",
      "st_id",
      "st_avg",
      "st_register_date",
      "st_register",
    ];
    this.setState({
      message: newFill,
      keyOfData: keysVlaueOFStudentData,
    });
  };

  handleChange = (event, indexItem) => {
    const newMsd = this.state.message?.map((item, index) =>
      index === indexItem ? event.target.value : item
    );
    console.log({ newMsd });
    this.setState({ message: newMsd });
    console.log("value........", event.target.value);
  };

  handleClick = async (event) => {
    let datat;
    let k = {};

   
if (this.state.message.includes(undefined) || this.state.message.includes("") ){
  alert("You must fill all the fields")
}
else{
    this.state.message?.map((dataput: any, index) => {
      datat = { data: { [this.state.keyOfData[index]]: dataput } };

      console.log(this.state.keyOfData[index]);

      k = { ...k, [this.state.keyOfData[index]]: dataput };
    });

    console.log("adADdDdad");
    console.log(k);

    event.preventDefault();
    fetch("http://localhost:1337/api/students", {
      method: "POST", 
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ data: k }),
    })
      .then((res) => {
        
        return res;
      })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  
 } };

  InputField() {
    let keysVlaueOFStudentData = [
      "st_name",
      "st_Email",
      "st_id",
      "st_avg",
      "st_registerDate",
      "st_register",
    ];

    return keysVlaueOFStudentData.map((data: any, index) => {
      return (
        <div key={index} className="div-input-add">
          <label htmlFor={keysVlaueOFStudentData[index]}>
            {keysVlaueOFStudentData[index].split("_")[1].toUpperCase()}
          </label>

          <input
            className="input-add"
            id={keysVlaueOFStudentData[index]}
            required
            type={geInputPropsForTextField(keysVlaueOFStudentData[index])?.type}
            name={geInputPropsForTextField(keysVlaueOFStudentData[index])?.name}
            onChange={(e) => this.handleChange(e, index)}
            placeholder={geInputPropsForTextField(keysVlaueOFStudentData[index])?.placeholder}
            
            // value={row_data[index].display}
          />
        </div>
      );
    });
  }

  render() {
    return (
      <div className="add-div-page">
        <h3 className="div-heading">Edit the student information</h3>
        <div className="div-add">
          {this.InputField()}
          <div>
            <button className="ta-button" onClick={this.handleClick}>
              Save
            </button>
            <a href={"/"}>
              <button className="ta-button" type="button">
                Back
              </button>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default AddStudentPage;
