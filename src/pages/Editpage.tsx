import React from "react";

import { useTable } from "react-table";
import axios from "axios";
import { geInputPropsForTextField } from "../components/utils";
import { getSingleData } from "../components/utils";
import TextFiled from "../components/TextFiled";
import { UpdatedData } from "../components/utils";
class Editclass extends React.Component<any, any> {
  state = {
    data: null,
    error: null,
    validationError: [],
    stu_id: null,
    inputValues: {},
    numberofindex: null,
    keyOfData: [],
    KeyOfValues: {},
    imageUpdate: null,
    file: null,
  };
  componentDidMount = async () => {
    const linkId = window?.location?.href.split("/");

    const [response, error] = await getSingleData(linkId.at(-1));

    const newFill = Array(6).fill("");
    const newFill0 = Array(6).fill("");
    const newFill1 = Array(6).fill("");
    const key = ["st_name", "st_Email", "st_id"];
    const valuesAndkeys = {
      st_name: response.data.data.attributes.st_name,
      st_Email: null,
      st_id: response.data.data.attributes.st_id,
      st_registerDate: null,
      st_register: null,
      st_avg: response.data.data.attributes.st_avg,
    }; //,st_image:null

    this.setState({
      inputValues: valuesAndkeys,
      data: response?.data?.data,
      keyOfData: newFill0,
      validationError: newFill1,
      error: error,
      stu_id: linkId.at(-1),
    });
  };

  handleChange = (event, indexItem, key) => {
    const newValue = this.state.inputValues;
    
    newValue[key] = event.target.value;
    this.setState({ inputValues: newValue });




 
  };
  ImageHandleClick = async (event) => {
    this.setState({ file: event.target.files[0] });
  };

  handlesubmit = async (event) => {
    event.preventDefault();

    const data = new FormData();
    data.append("files", this.state.file);

    const upload_res = await axios({
      method: "POST",
      url: "http://localhost:1337/api/upload/",
      data,
    });

    const k = upload_res.data;
    const idStudent = k[0].id;
    delete k[0].id;

    const imageAttributes = Object.assign({}, k);
    imageAttributes["attributes"] = imageAttributes[0];
    delete imageAttributes[0];
    imageAttributes["id"] = idStudent;

    this.setState({ imageUpdate: imageAttributes });

    //  const transformed = y.map(({ 0 }) => ({ label: 0, value: name }));
  };

  updateImage() {
    const l = this.state.imageUpdate;
    let t = { data: l };

    fetch(
      `http://localhost:1337/api/students/${this.state.stu_id}?populate=*`,
      {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(t),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        ("");
      })
      .catch((error) => {
        this.setState({ error: error });
      });
  }

  handleClick = async (event) => {
    event.preventDefault();

    UpdatedData(
      this.state.keyOfData[1],
      this.state.inputValues,
      this.state.stu_id
    );
    // this.updateImage();
  };

  renderInputEdit() {
    const row_data = [];
    let dataArrObj = [];
    dataArrObj = this.state.data ? this.state.data.attributes : [{}];
    const InputValue = Object.entries(dataArrObj)
      .filter(function ([key]) {
        return (
          key !== "createdAt" &&
          key !== "updatedAt" &&
          key !== "publishedAt" &&
          key !== "locale" &&
          key !== "localizations"
        );
      })
      .map(([key, val], index) => {
        return [key, val];
      });

    return InputValue.map(([key, val], index) => {
      return (
        <div key={index} className="div-input-edit">
          <TextFiled
            keyData={index}
            valueKey={key}
            indexValue={index}
            dataValue={this.state?.inputValues[key]}
            handlerEvent={this.handleChange}
          />
          <div className="div-input-error">{this.state.validationError}</div>
        </div>
      );
    });
  }
  render() {
    if (this.state.error) {
      return <div>{this.state.error}</div>;
    }
    return (
      <div className="edit-div-page">
        <h3 className="div-heading">Edit the student information</h3>
        <div className="div-edit">
          <>{this.renderInputEdit()}</>
          <div className="div-ImageForm">
            <form onSubmit={this.handlesubmit}>
              <input onChange={this.ImageHandleClick} type="file" />

           
              <button>Submit</button>
            </form>
          </div>

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

export default Editclass;
