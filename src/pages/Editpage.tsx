import React from "react";

import { useTable } from "react-table";
import axios from "axios";

class Editclass extends React.Component<any, any> {
  state = {
    data: null,
    error: null,
    stu_id: null,
    message: [],
    numberofindex: null,
    keyOfData: [],
  };
  componentDidMount = async () => {
    const linkId = window?.location?.href.split("/");




    try {
      const response = await fetch(
        `http://localhost:1337/api/students/${linkId.at(-1)}`
      ); //
      const data = await response.json();
        const newFill = Array(6).fill("");
      const newFill0 = Array(6).fill("");

      this.setState({
        data: data?.data,
        message: newFill,
        keyOfData: newFill0,
      });
    } catch (error) {
      this.setState({ error });
    }

    this.setState({
      stu_id: linkId.at(-1),
    });



    // try {
    //   const response = await axios.get(
    //     `http://localhost:1337/api/students/${linkId.at(-1)}`
    //   ); //
    //   // const data = await response.json();
    //   const newFill = Array(6).fill("");
    //   const newFill0 = Array(6).fill("");
    //   console.log({ data: response?.data?.data });

    //   this.setState({
    //     data: response?.data?.data,
    //     message: newFill,
    //     keyOfData: newFill0,
    //   });
    // } catch (error) {
    //   this.setState({ error });
    // }
    // this.setState({
    //   stu_id: linkId.at(-1),
    // });
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
    event.preventDefault();

    // 👇️ value of input field
    console.log("Click.............", this.state.message);
    console.log(this.state.keyOfData[0]);
    let k = this.state.keyOfData[1];
    console.log(this.state.message[1]);

    this.state.message?.map((dataput: any, index) => {
      console.log(dataput);
      const data = { data: { [this.state.keyOfData[index]]: dataput } };
      console.log(data);
      fetch(`http://localhost:1337/api/students/${this.state.stu_id}`, {
        method: "put", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    });
  };

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
    Object.entries(this.state.data ||{})
    .filter(function ([key]) {
      return (
        key !== "createdAt" &&
        key !== "updatedAt" &&
        key !== "publishedAt" &&
        key !== "locale" &&
        key !== "localizations"
      );
    }).map(([k,v])=>v);
    dataArrObj  = Object.values(dataArrObj)?.filter(function (f) {
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
        <input
          required={true}
          disabled={row_data[index].canIdet}
          type="text"
          key={index}
          name="name"
          onChange={(e) => this.handleChange(e, index)}
          value={row_data[index].display}
        />
      );
    });
  }
  render() {
    return (
      <div>
        <br></br>
        <br></br>
        {this.renderInputEdit()}
        <button className="ta-button" onClick={this.handleClick}>
          Save
        </button>
        <a href={"/"}>
                <button className="ta-button" type="button">
                  Back
                </button>
              </a>
      </div>
    );
  }
}

export default Editclass;
