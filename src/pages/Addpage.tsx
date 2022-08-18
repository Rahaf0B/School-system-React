import React from "react";
import TextFiled from "../components/TextFiled";
import { geInputPropsForTextField } from "../components/utils";
import validator from "validator";
import { AddData } from "../components/utils";

class AddStudentPage extends React.Component {
  state = {
    inputValues: {},
    errorTextValue: {},
  };

  componentDidMount = async () => {
    const newFill = Array(6).fill("");
    const KeysAndValues = {
      st_name: null,
      st_Email: null,
      st_id: null,
      st_registerDate: null,
      st_register: null,
      st_avg: null,
    }; //,st_image:null
    this.setState({
      inputValues: KeysAndValues,
    });
  };

  handleChange = (event, indexItem, key) => {
    const newValue = this.state.inputValues;
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    newValue[key] = event.target.value;
    this.setState({ inputValues: newValue });
    const errorMassage = this.state.errorTextValue;
    if (event.target.value === "") {
      errorMassage[key] = "You should enter a value";
    } else {
      if (key === "st_name") {
        if (/\d/.test(event.target.value)) {
          errorMassage[key] = "the name should not contain any numbers";
        } else if (specialChars.test(event.target.value)) {
          errorMassage[key] =
            "the name should not contain any special characters";
        } else {
          errorMassage[key] = "";
        }
      } else if (key === "st_Email") {
        if (!/\S+@\S+\.\S+/.test(event.target.value)) {
          errorMassage[key] = "Wrong Email";
        } else {
          errorMassage[key] = "";
        }
      } else if (key === "st_registerDate") {
        if (!validator.isDate(event.target.value)) {
          errorMassage[key] = "wrong Date";
        } else {
          errorMassage[key] = "";
        }
      } else if (key === "st_register") {
        if (
          event.target.value.toLowerCase() !== "yes" &&
          event.target.value.toLowerCase() !== "no"
        ) {
          errorMassage[key] = "wrong input";
        } else {
          errorMassage[key] = "";
          event.target.value = event.target.value
            .toLowerCase()
            .replace("yes", "true");
          event.target.value = event.target.value
            .toLowerCase()
            .replace("no", "false");
          newValue[key] = event.target.value;
          this.setState({ inputValues: newValue });
        }
      } else {
        errorMassage[key] = "";
      }
    }
    this.setState({ errorTextValue: errorMassage });
  };

  handleClick = async (event) => {
    AddData(event, this.state.inputValues);
  };

  InputField() {
    let keysAndValueOFStudentData = [
      "st_name",
      "st_Email",
      "st_id",
      "st_avg",
      "st_registerDate",
      "st_register",
    ];
    return keysAndValueOFStudentData.map((key: any, index) => {
      return (
        <div key={index} className="div-input-add">
          <label htmlFor={keysAndValueOFStudentData[index]}>
            {keysAndValueOFStudentData[index].split("_")[1].toUpperCase()}
          </label>
          <input
            className="input-add"
            id={keysAndValueOFStudentData[index]}
            required
            type={
              geInputPropsForTextField(keysAndValueOFStudentData[index])?.type
            }
            name={
              geInputPropsForTextField(keysAndValueOFStudentData[index])?.name
            }
            onChange={(e) => this.handleChange(e, index, key)}
            placeholder={
              geInputPropsForTextField(keysAndValueOFStudentData[index])
                ?.placeholder
            }
            // value={row_data[index].display}
          />
          <div className="HelperText">{this.state?.errorTextValue[key]}</div>
        </div>
      );
    });
  }
  render() {
    return (
      <div className="add-div-page">
        <h3 className="div-heading">Add new student</h3>
        <div className="div-add">{this.InputField()}</div>
        <div className="div-buttons">
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
