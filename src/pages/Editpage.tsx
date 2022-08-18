import React from "react";
import axios from "axios";
import { getSingleData } from "../components/utils";
import TextFiled from "../components/TextFiled";
import { UpdatedData } from "../components/utils";
import validator from "validator";

class EditPage extends React.Component<any, any> {
  state = {
    data: null,
    error: null,
    validationError: [],
    stu_id: null,
    inputValues: {},
    keyOfData: [],
    imageUpdate: null,
    file: null,
    errorTextValue: {},
  };
  componentDidMount = async () => {
    const linkId = window?.location?.href.split("/");
    const [response, error] = await getSingleData(linkId.at(-1));
    const newFill0 = Array(6).fill("");
    const newFill1 = Array(6).fill("");
    const KeysAndValues = {
      st_name: response.data.data.attributes.st_name,
      st_Email: null,
      st_id: response.data.data.attributes.st_id,
      st_registerDate: null,
      st_register: null,
      st_avg: response.data.data.attributes.st_avg,
    }; //,st_image:null
    this.setState({
      inputValues: KeysAndValues,
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
    const errorMassage = this.state.errorTextValue;
    if (event.target.value===""){
      errorMassage[key]="You should enter a value"
    }
    else{
    if (key === "st_Email") {
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
    } 
    else if(key==="st_register"){
      if (event.target.value.toLowerCase()!=="yes" && event.target.value.toLowerCase()!=="no"){
        errorMassage[key] = "wrong input";
      } else {
        errorMassage[key] = "";
        event.target.value=event.target.value.toLowerCase().replace("yes","true");
        event.target.value=event.target.value.toLowerCase().replace("no","false");
        newValue[key] = event.target.value;
        this.setState({ inputValues: newValue });
      }
    }
    else {
      errorMassage[key] = "";
    }
  }
    this.setState({ errorTextValue: errorMassage});
  };
  
  ImageHandleClick = async (event) => {
    this.setState({ file: event.target.files[0] });
  };


  handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append("files", this.state.file);
    const upload_res = await axios({
      method: "POST",
      url: "http://localhost:1337/api/upload/",
      data,
    });
    const importedImageData = upload_res.data;
    const idStudent = importedImageData[0].id;
    delete importedImageData[0].id;
    const imageAttributes = Object.assign({}, importedImageData);
    imageAttributes["attributes"] = imageAttributes[0];
    delete imageAttributes[0];
    imageAttributes["id"] = idStudent;
    this.setState({ imageUpdate: imageAttributes });
  };

  updateImage() {
    const imageData= this.state.imageUpdate;
    let imageUpdate = { data: imageData };
    fetch(
      `http://localhost:1337/api/students/${this.state?.stu_id}?populate=*`,
      {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(imageUpdate),
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
            valueOfError={this.state?.errorTextValue[key]}
          />
          <div className="HelperText">{this.state.validationError}</div>
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
            <form onSubmit={this.handleSubmit}>
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

export default EditPage;
