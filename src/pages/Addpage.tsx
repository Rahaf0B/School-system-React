import React from "react";
import { getInputPropsForTextField } from "../components/utils";
import validator from "validator";
import { AddData } from "../components/utils";
import { getData } from "../components/utils";

class AddStudentPage extends React.Component {
  state = {
    inputValues: {},
    errorTextValue: {},
    studentID: null,
  };

  componentDidMount = async () => {
    const KeysAndValues = {
      st_name: null,
      st_Email: null,
      st_avg: 0,
      st_id: null,
      st_registerDate: null,
      st_register: false,
    };
    this.setState({
      inputValues: KeysAndValues,
    });

    const [studentData, studentId, error] = await getData();

    const ID = Number(
      studentData
        .slice(studentData.length - 1, studentData.length)
        .map((val) => {
          return val.attributes.st_id;
        })
    );

    this.setState({ studentID: ID });
  };

  handleChange = (event, indexItem, key) => {
    const newValue = this.state.inputValues;
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    newValue[key] = event.target.value;
    this.setState({ inputValues: newValue });
    const errorMassage = this.state.errorTextValue;
    if (event.target.value === "" && key !== "st_register") {
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
      } else {
        errorMassage[key] = "";
      }
    }

    if (key === "st_register") {
      newValue[key] = event.target.checked;
      this.setState({ inputValues: newValue });
    }

    this.setState({ errorTextValue: errorMassage });
  };

  handleClick = async (event) => {
    const studentValue = this.state.inputValues;
    studentValue["st_id"] = Number(this.state.studentID) + 1;
    this.setState({ inputValues: studentValue });
    AddData(event, this.state.inputValues);
  };

  InputField() {
    let keysAndValueOFStudentData = [
      "st_name",
      "st_Email",
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
              getInputPropsForTextField(keysAndValueOFStudentData[index])?.type
            }
            name={
              getInputPropsForTextField(keysAndValueOFStudentData[index])?.name
            }
            onChange={(e) => this.handleChange(e, index, key)}
            placeholder={
              getInputPropsForTextField(keysAndValueOFStudentData[index])
                ?.placeholder
            }
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
