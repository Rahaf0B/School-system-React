import { keyboard } from "@testing-library/user-event/dist/keyboard";
import React from "react";
import TextFiled from "../components/TextFiled";
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

    this.setState({ message: newMsd });
  };

  handleClick = async (event) => {
    let dataToAdd;
    let DataToAdd = {};

    if (
      this.state.message.includes(undefined) ||
      this.state.message.includes("")
    ) {
      alert("You must fill all the fields");
    } else {
      this.state.message?.map((dataput: any, index) => {
        dataToAdd = { data: { [this.state.keyOfData[index]]: dataput } };

        DataToAdd = { ...DataToAdd, [this.state.keyOfData[index]]: dataput };
      });

      event.preventDefault();
      fetch("http://localhost:1337/api/students", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ data: DataToAdd }),
      })
        .then((res) => {
          return res;
        })
        .then((res) => res.json())
        .then((data) => "")
        .catch((error) => "");
    }
  };

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
            placeholder={
              geInputPropsForTextField(keysVlaueOFStudentData[index])
                ?.placeholder
            }

            // value={row_data[index].display}
          />
        </div>
      );
    });
  }

  render() {
    return (
      <div className="add-div-page">
        <h3 className="div-heading">Add new student</h3>
        <div className="div-add">{this.InputField()}</div>
        <div className="div-butons">
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
    );
  }
}

export default AddStudentPage;
