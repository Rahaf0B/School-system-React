import React from "react";
import { getSingleData } from "../components/utils";
import TextFiled from "../components/TextFiled";
import { UpdatedData } from "../components/utils";
import validator from "validator";
import { updateImage } from "../components/utils";
import { UploadImage } from "../components/utils";
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
    };
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
    if (event.target.value === "") {
      errorMassage[key] = "You should enter a value";
    } else {
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

  ImageHandleClick = async (event) => {
    this.setState({ file: event.target.files[0] });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const imageAttributes = UploadImage(this.state?.file);
    imageAttributes.then((res) => {
      this.setState({ imageUpdate: res });
    });
  };

  handleClick = async (event) => {
    event.preventDefault();
    UpdatedData(this.state.inputValues, this.state.stu_id);
    if (this.state.imageUpdate !== null) {
      updateImage(this.state?.imageUpdate, this.state?.stu_id);
    }
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
          key !== "localizations" &&
          key !== "st_avg"
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
        <div>
          <div className="div-edit">
            <>{this.renderInputEdit()}</>
            <div className="div-ImageForm">
              <form className="form-image" onSubmit={this.handleSubmit}>
                <input onChange={this.ImageHandleClick} type="file" />
                <button>Submit</button>
              </form>
            </div>
          </div>
          <div className="div-buttons-edit">
            <a href={`/EditMark/${this.state.data?.id}`}>
              <button className="ta-button change-button" type="button">
                Change Marks
              </button>
            </a>

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
