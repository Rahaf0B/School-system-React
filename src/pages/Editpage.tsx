import React from "react";

import { useTable } from "react-table";
import axios from "axios";
import { geInputPropsForTextField } from "../components/utils";
import { getSingleData } from "../components/utils";
class Editclass extends React.Component<any, any> {
  state = {
    data: null,
    error: null,
    validationError: [],
    stu_id: null,
    message: [],
    numberofindex: null,
    keyOfData: [],
    imageUpdate: null,
    file: null,
  };
  componentDidMount = async () => {
    const linkId = window?.location?.href.split("/");

    const [response, error] = await getSingleData(linkId.at(-1));
    console.log("88888888888888888888888888888");
    const newFill = Array(6).fill("");
    const newFill0 = Array(6).fill("");
    const newFill1 = Array(6).fill("");
    const key = ["st_name", "st_Email", "st_id"];
    this.setState({
      data: response?.data?.data,
      message: newFill,
      keyOfData: newFill0,
      validationError: newFill1,
      error: error,
      stu_id: linkId.at(-1),
    });
  };

  handleChange = (event, indexItem) => {
    const newMsd = this.state.message?.map((item, index) =>
      index === indexItem ? event.target.value : item
    );
    console.log("5555555555555555555555555555555555555", event.target.value);
    console.log({ newMsd });

    this.setState({ message: newMsd });
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

    let k = this.state.keyOfData[1];

    if (
      this.state.message.includes(undefined) ||
      this.state.message.includes("")
    ) {
      alert("You must fill all the fields");
    } else {
      this.state.message?.map((dataput: any, index) => {
        if (this.state.keyOfData[index] == null) {
        }
        const data = { data: { [this.state.keyOfData[index]]: dataput } };

        fetch(`http://localhost:1337/api/students/${this.state.stu_id}`, {
          method: "put", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((response) => response.json())
          .then((data) => {
            ("");
          })
          .catch((error) => {
            this.setState({ error: error });
          });
      });
    }
    // this.updateImage();
  };

  renderInputEdit() {
    /**  {
       key: "",
       display: "value",
       canIdet: false,
     }[]*/
    const row_data = [];
    let dataArrObj = [];

    dataArrObj = Object.values(this.state.data ? this.state.data : [{}]);
    dataArrObj = Object.entries(dataArrObj[1] ? dataArrObj[1] : [{}]);
    debugger;
    dataArrObj = dataArrObj?.filter(function ([key]) {
      return (
        key !== "createdAt" &&
        key !== "updatedAt" &&
        key !== "publishedAt" &&
        key !== "locale" &&
        key !== "localizations"
      );
    });

    return dataArrObj?.map(([key, val]: any, index) => {
      let CanIdetInput = false;
      let dataToDisplay = this.state.message[index];
      if (key === "st_id" || key === "st_name" || key === "st_avg") {
        dataToDisplay = val;
      }

      console.log("00000000000000000000", dataToDisplay);

      row_data.push({
        key: key,
        display: dataToDisplay,

        canIdet: CanIdetInput,
      });
      console.log("111111111111111111111", row_data);
      // this.state.keyOfData[index] = key;
   
      return (
        <div key={index} className="div-input-edit">
          <label htmlFor={row_data[index]?.key}>
            {geInputPropsForTextField(key)?.name}
          </label>
          <input
            className="input-edit"
            id={row_data[index]?.key}
            required={true}
            // readOnly={geInputPropsForTextField(key)?.disabled}
            type={geInputPropsForTextField(key)?.type}
            key={index}
            name={geInputPropsForTextField(key)?.name}
            onChange={(e) => this.handleChange(e, index)}
            value={row_data[index]?.display}
            placeholder={geInputPropsForTextField(key)?.placeholder}
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
          {/* <br></br>
        <br></br> */}
          {this.renderInputEdit()}
          <div>
            <form onSubmit={this.handlesubmit}>
              <input onChange={this.ImageHandleClick} type="file" />
              {/* <BuildForm schema={},defultvalue,changes /> */}
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
