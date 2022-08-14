import React from "react";

import { useTable } from "react-table";
import axios from "axios";
import { geInputPropsForTextField } from "../components/utils";
class Editclass extends React.Component<any, any> {
  state = {
    data: null,
    error: null,
    validationError:[],
    stu_id: null,
    message: [],
    numberofindex: null,
    keyOfData: [],
  };
  componentDidMount = async () => {
    const linkId = window?.location?.href.split("/");
    try {
      const response = await axios.get(
        `http://localhost:1337/api/students/${linkId.at(-1)}`
      ); //
      // const data = await response.json();
      const newFill = Array(6).fill("");
      const newFill0 = Array(6).fill("");
      const newFill1 = Array(6).fill("");
      console.log({ data: response?.data?.data });

      this.setState({
        data: response?.data?.data,
        message: newFill,
        keyOfData: newFill0,
        validationError:newFill1,
      });
    } catch (error) {
      this.setState({ error });
    }
    this.setState({
      stu_id: linkId.at(-1),
    });
  };

  handleChange = (event, indexItem) => {
    console.log("index",indexItem)
    let errorv;
    const er="error"
    const newMsd = this.state.message?.map((item, index) =>
  
      index === indexItem ? event.target.value : item
      
    );
   
    
    console.log({ newMsd });
    this.setState({ message: newMsd });
    console.log("value........", event.target.value);
  };

  handleClick = async (event) => {
    event.preventDefault();

 
    let k = this.state.keyOfData[1];
    console.log(this.state.message)
    if (this.state.message.includes(undefined) || this.state.message.includes("") ){
      alert("You must fill all the fields")
    }
    else{

    this.state.message?.map((dataput: any, index) => {
   
      const data = { data: { [this.state.keyOfData[index]]: dataput } };
//  console.log(JSON.stringify(data))
      console.log("htfygyghuhhujuhh")
 console.log(this.state.stu_id)
      fetch(`http://localhost:1337/api/students/${this.state.stu_id}`, {
        method: "put", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
         ""
        })
        .catch((error) => {
          console.log(error)
          this.setState({error:error})
        
        });
    });
  }};

  renderInputEdit() {
    const row_data = [
      {
        key: "",
        display: "value",
        canIdet: false,
      },
    ];
    let dataArrObj = [];

    dataArrObj = Object.values(this.state.data ? this.state.data : [{}]);

    dataArrObj = Object.entries(dataArrObj[1] ? dataArrObj[1] : [{}]);
    Object.entries(this.state.data || {})
      .filter(function ([key]) {
        return (
          key !== "createdAt" &&
          key !== "updatedAt" &&
          key !== "publishedAt" &&
          key !== "locale" &&
          key !== "localizations"
        );
      })
      .map(([k, v]) => v);
    dataArrObj = Object.values(dataArrObj)?.filter(function (f) {
      return (
        f[0] !== "createdAt" &&
        f[0] !== "updatedAt" &&
        f[0] !== "publishedAt" &&
        f[0] !== "locale" &&
        f[0] !== "localizations"
      );
    });

    console.log({ dataArrObj, msg: this.state.message });
    return dataArrObj?.map((data: any, index) => {
      let keysofData = data[0];
      let CanIdetInput = false;
console.log("asaaaaaaaaaaaaaaaaaaaaaa")
console.log(keysofData)
      if (
        keysofData === "st_id" ||
        keysofData === "st_name" ||
        keysofData === "st_avg"
      ) {
        this.state.message[index] = data[1];
      }

      row_data.push({
        key: keysofData,
        display: this.state.message[index],

        canIdet: CanIdetInput,
      });
      this.state.keyOfData[index] = keysofData;
      if (row_data[0].key === "") {
        row_data.shift();
      }
      console.log("asaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
      console.log(row_data[index]);

      return (
        <div  key={index} className="div-input-edit">
<label htmlFor={row_data[index]?.key}>{geInputPropsForTextField(keysofData)?.name}</label>
        <input
        className="input-edit"
        id={row_data[index]?.key}
          required={true}
          disabled={geInputPropsForTextField(keysofData)?.disabled}
          type={geInputPropsForTextField(keysofData)?.type}
          key={index}
          name={geInputPropsForTextField(keysofData)?.name}
          onChange={(e) => this.handleChange(e, index)}
          value={row_data[index]?.display}
          placeholder={geInputPropsForTextField(keysofData)?.placeholder}
        />
        <div className="div-input-error">{this.state.validationError}</div>
        </div>
      );
    });
  }
  render() {

    if (this.state.error){
    return  <div>{this.state.error}</div>
     }
    return (
      
      <div className="edit-div-page">
      <h3 className="div-heading">
          Edit the student information
        </h3>
      <div className="div-edit">
      
        {/* <br></br>
        <br></br> */}
        {this.renderInputEdit()}
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
